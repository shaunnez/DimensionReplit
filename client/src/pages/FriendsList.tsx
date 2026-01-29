import { useState, useRef, useEffect } from 'react';
import { EVENTS, Event, EventStatus } from '@/data';
import { Header } from '@/components/Header';
import { useSchedule } from '@/hooks/use-schedule';
import { useFriendsLists } from '@/hooks/use-friends-lists';
import { Users, Download, Upload, Trash2, CalendarDays, ChevronDown, ChevronUp, Star, ThumbsUp, CheckCircle, QrCode, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';

const STATUS_CONFIG: Record<EventStatus, { icon: any, color: string, label: string }> = {
  'none': { icon: null, color: '', label: '' },
  'must-see': { icon: Star, color: 'text-neon-yellow', label: 'Must See' },
  'nice': { icon: ThumbsUp, color: 'text-neon-cyan', label: 'Nice to See' },
  'have': { icon: CheckCircle, color: 'text-neon-green', label: 'Going' },
};

const DAY_ORDER = ['Friday', 'Saturday', 'Sunday', 'Monday'];

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes;
  if (hours >= 0 && hours < 6) {
    totalMinutes += 24 * 60;
  }
  return totalMinutes;
};

const formatTime = (time: string) => {
  if (time.includes(':') && !time.includes(' ')) {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
  }
  return time;
};

interface FriendSchedule {
  name: string;
  schedule: Record<string, EventStatus>;
  exportedAt: string;
}

export default function FriendsList() {
  const { schedule } = useSchedule();
  const { friendsLists, addFriendsList, removeFriendsList } = useFriendsLists();
  const [exportName, setExportName] = useState('');
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [expandedFriend, setExpandedFriend] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // QR Code states
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrName, setQrName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Generate QR code data - only include events that are not 'none'
  const generateQrData = (name: string) => {
    const filteredSchedule: Record<string, EventStatus> = {};
    Object.entries(schedule).forEach(([eventId, status]) => {
      if (status && status !== 'none') {
        filteredSchedule[eventId] = status;
      }
    });

    const data: FriendSchedule = {
      name: name.trim(),
      schedule: filteredSchedule,
      exportedAt: new Date().toISOString(),
    };

    return JSON.stringify(data);
  };

  // Start QR scanner
  const startScanner = async () => {
    setScanError(null);
    setScanSuccess(null);
    setIsScanning(true);

    try {
      const html5Qrcode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5Qrcode;

      await html5Qrcode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Successfully scanned
          try {
            const data = JSON.parse(decodedText) as FriendSchedule;
            if (data.name && data.schedule) {
              addFriendsList(data);
              setScanSuccess(`Imported ${data.name}'s plan!`);
              stopScanner();
            } else {
              setScanError('Invalid QR code format');
            }
          } catch {
            setScanError('Could not read QR code data');
          }
        },
        () => {
          // Ignore scan failures (no QR code in frame)
        }
      );
    } catch (err) {
      console.error('Scanner error:', err);
      setScanError('Could not access camera. Please grant camera permissions.');
      setIsScanning(false);
    }
  };

  // Stop QR scanner
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleExport = () => {
    if (!exportName.trim()) return;

    const exportData: FriendSchedule = {
      name: exportName.trim(),
      schedule: schedule,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportName.trim().toLowerCase().replace(/\s+/g, '-')}-dimension-plan.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
    setExportName('');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as FriendSchedule;
        if (data.name && data.schedule) {
          addFriendsList(data);
        }
      } catch (error) {
        console.error('Failed to import friend list:', error);
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getEventsForFriend = (friendSchedule: Record<string, EventStatus>) => {
    const grouped: Record<string, Array<Event & { status: EventStatus }>> = {};

    EVENTS.forEach(event => {
      const status = friendSchedule[event.id];
      if (!status || status === 'none') return;

      const day = event.day;
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({ ...event, status });
    });

    // Sort each day's events by time
    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    });

    return grouped;
  };

  const hasEvents = Object.values(schedule).some(s => s && s !== 'none');

  return (
    <div className="min-h-screen pb-24">
      <Header title="Friends List" subtitle="Share & Compare" />

      <div className="p-4 space-y-6">
        {/* Export Section */}
        <section className="bg-card/40 rounded-xl border border-white/10 p-4 space-y-4">
          <h2 className="text-lg font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-neon-cyan" />
            Export Your Plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Share your schedule with friends by exporting it as a file.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Your name"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="flex-1 bg-background/50 border-white/10"
            />
            <Button
              onClick={handleExport}
              disabled={!exportName.trim() || !hasEvents}
              className="bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          {!hasEvents && (
            <p className="text-xs text-muted-foreground">
              Add events to your plan first to export.
            </p>
          )}
          <AnimatePresence>
            {showExportSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-neon-green"
              >
                Plan exported successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Import Section */}
        <section className="bg-card/40 rounded-xl border border-white/10 p-4 space-y-4">
          <h2 className="text-lg font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-neon-magenta" />
            Import Friend's Plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Import a friend's schedule to see what they're planning.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-neon-magenta/20 hover:bg-neon-magenta/30 text-neon-magenta border border-neon-magenta/30"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File to Import
          </Button>
        </section>

        {/* QR Code Share Section */}
        <section className="bg-card/40 rounded-xl border border-white/10 p-4 space-y-4">
          <h2 className="text-lg font-display uppercase tracking-wider text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-neon-yellow" />
            QR Code Share
          </h2>
          <p className="text-sm text-muted-foreground">
            Share your plan instantly by showing your QR code to friends.
          </p>

          {!showQrCode ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Your name"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  className="flex-1 bg-background/50 border-white/10"
                />
                <Button
                  onClick={() => setShowQrCode(true)}
                  disabled={!qrName.trim() || !hasEvents}
                  className="bg-neon-yellow/20 hover:bg-neon-yellow/30 text-neon-yellow border border-neon-yellow/30"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
              {!hasEvents && (
                <p className="text-xs text-muted-foreground">
                  Add events to your plan first to share.
                </p>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  value={generateQrData(qrName)}
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                <span className="text-neon-yellow font-display">{qrName}</span>'s Plan
              </p>
              <Button
                onClick={() => {
                  setShowQrCode(false);
                  setQrName('');
                }}
                variant="outline"
                className="border-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </motion.div>
          )}
        </section>

        {/* QR Code Scanner Section */}
        <section className="bg-card/40 rounded-xl border border-white/10 p-4 space-y-4">
          <h2 className="text-lg font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-neon-green" />
            Scan Friend's QR Code
          </h2>
          <p className="text-sm text-muted-foreground">
            Scan a friend's QR code to import their plan instantly.
          </p>

          {!isScanning ? (
            <Button
              onClick={startScanner}
              className="w-full bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Scanner
            </Button>
          ) : (
            <div className="space-y-4">
              <div
                id="qr-reader"
                className="w-full overflow-hidden rounded-lg"
                style={{ minHeight: '300px' }}
              />
              <Button
                onClick={stopScanner}
                variant="outline"
                className="w-full border-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Stop Scanner
              </Button>
            </div>
          )}

          <AnimatePresence>
            {scanError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg"
              >
                {scanError}
              </motion.div>
            )}
            {scanSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-neon-green bg-neon-green/10 p-3 rounded-lg"
              >
                {scanSuccess}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Friends Lists */}
        {friendsLists.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-display uppercase tracking-wider text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-yellow" />
              Friends' Plans ({friendsLists.length})
            </h2>

            <div className="space-y-3">
              {friendsLists.map((friend, index) => {
                const friendEvents = getEventsForFriend(friend.schedule);
                const eventCount = Object.values(friendEvents).flat().length;
                const isExpanded = expandedFriend === `${friend.name}-${index}`;

                return (
                  <div
                    key={`${friend.name}-${index}`}
                    className="bg-card/40 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedFriend(isExpanded ? null : `${friend.name}-${index}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neon-yellow/20 flex items-center justify-center">
                          <span className="text-neon-yellow font-display text-lg uppercase">
                            {friend.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-white">{friend.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {eventCount} events selected
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFriendsList(index);
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                            {DAY_ORDER.filter(day => friendEvents[day]).map(day => (
                              <div key={day} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="w-4 h-4 text-neon-cyan" />
                                  <h4 className="text-sm font-display uppercase tracking-wider text-white">
                                    {day}
                                  </h4>
                                </div>
                                <div className="space-y-1 pl-6">
                                  {friendEvents[day].map(event => {
                                    const StatusIcon = STATUS_CONFIG[event.status].icon;
                                    return (
                                      <div
                                        key={event.id}
                                        className="flex items-center gap-2 text-sm py-1"
                                      >
                                        <span className="text-xs font-mono text-neon-magenta">
                                          {formatTime(event.startTime)}
                                        </span>
                                        {StatusIcon && (
                                          <StatusIcon className={cn("w-3 h-3", STATUS_CONFIG[event.status].color)} />
                                        )}
                                        <span className="text-white">{event.name}</span>
                                        <span className="text-muted-foreground text-xs">
                                          @ {event.location}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {friendsLists.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Users className="w-16 h-16 opacity-20 mb-4" />
            <p className="font-ui text-lg">No friends' plans imported yet.</p>
            <p className="text-sm mt-2">Import a friend's plan to see what they're up to!</p>
          </div>
        )}
      </div>
    </div>
  );
}
