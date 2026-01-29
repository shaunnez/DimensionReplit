import { useState } from 'react';
import { EVENTS, Event, KEY_TIMES } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { MapPin, Calendar as CalendarIcon, Maximize2, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface TimetableProps {
  category: 'music' | 'workshop' | 'performer' | 'vj' | 'info';
  title: string;
}

// Helper to convert 24h time to 12h format with AM/PM
function formatTime24to12(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

// Helper to sort events by time (24h format)
function sortByTime(a: Event, b: Event): number {
  const [aH, aM] = a.startTime.split(':').map(Number);
  const [bH, bM] = b.startTime.split(':').map(Number);
  return (aH * 60 + aM) - (bH * 60 + bM);
}

export default function Timetable({ category, title }: TimetableProps) {
  // Special handling for info page
  if (category === 'info') {
    return (
      <div className="min-h-screen pb-24">
        <Header title={title} subtitle="Festival Information" />

        <div className="p-4 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white pl-2 border-l-4 border-neon-cyan">
              Festival Times
            </h2>
            <div className="space-y-2">
              {KEY_TIMES.festival.map((item) => (
                <div key={`festival-${item.day}-${item.time}`} className="p-4 rounded-xl border border-white/10 bg-card/40 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-neon-cyan" />
                    <div className="flex-1">
                      <p className="text-sm font-mono text-neon-cyan uppercase tracking-wider">
                        {item.day.toUpperCase()} • {item.time}
                      </p>
                      <p className="text-lg font-display text-white mt-1">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-white pl-2 border-l-4 border-neon-magenta">
              Transport
            </h2>
            <div className="space-y-2">
              {KEY_TIMES.transport.map((item) => (
                <div key={`transport-${item.day}-${item.time}`} className="p-4 rounded-xl border border-white/10 bg-card/40 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-neon-magenta" />
                    <div className="flex-1">
                      <p className="text-sm font-mono text-neon-magenta uppercase tracking-wider">
                        {item.day.toUpperCase()} • {item.time}
                      </p>
                      <p className="text-lg font-display text-white mt-1">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white pl-2 border-l-4 border-neon-green">
              Site Map
            </h2>
            <Drawer>
              <DrawerTrigger asChild>
                <div className="relative rounded-xl border border-white/10 bg-card/40 backdrop-blur-md overflow-hidden cursor-pointer group hover:border-neon-green/50 transition-colors">
                  <img
                    src={`${import.meta.env.BASE_URL}map.PNG`}
                    alt="Dimension Festival Site Map"
                    className="w-full h-auto transition-transform group-hover:scale-105"
                    style={{
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'p-6 text-center';
                      fallback.innerHTML = '<p class="text-muted-foreground font-mono text-sm">Map image not found. Please upload map.PNG to the public directory.</p>';
                      e.currentTarget.parentElement?.appendChild(fallback);
                    }}
                  />
                  <div className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-white/10">
                    <Maximize2 className="w-4 h-4 text-neon-green" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-xs text-muted-foreground text-center font-mono">
                      Tap to view fullscreen
                    </p>
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent className="h-[95vh] bg-background border-t border-white/10">
                <DrawerHeader className="border-b border-white/10">
                  <DrawerTitle className="text-2xl font-display text-neon-green">Site Map</DrawerTitle>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4 text-muted-foreground hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="flex-1 overflow-auto p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={`${import.meta.env.BASE_URL}map.PNG`}
                      alt="Dimension Festival Site Map - Fullscreen"
                      className="max-w-full max-h-full object-contain"
                      style={{
                        touchAction: 'pinch-zoom pan-x pan-y',
                        userSelect: 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="border-t border-white/10 p-4">
                  <p className="text-xs text-muted-foreground text-center font-mono">
                    Pinch to zoom • Drag to pan • Two-finger scroll
                  </p>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }

  const filteredEvents = EVENTS.filter(e => e.category === category);

  // Extract unique locations and days for filtering/tabs
  const locations = Array.from(new Set(filteredEvents.map(e => e.location)));
  const days = Array.from(new Set(filteredEvents.map(e => e.day)));

  const [activeDay, setActiveDay] = useState<string>(days[0] || 'Friday');

  return (
    <div className="min-h-screen pb-24">
      <Header title={title} subtitle={activeDay} />

      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-white/5 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-all whitespace-nowrap",
              activeDay === day
                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                : "border-white/10 text-muted-foreground hover:border-white/30"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-8">
        {locations.map(location => {
          const locationEvents = filteredEvents
            .filter(e => e.location === location && e.day === activeDay)
            .sort(sortByTime);

          if (locationEvents.length === 0) return null;

          return (
            <div key={location} className="space-y-4">
              <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 pl-2 border-l-4 border-neon-magenta">
                {location}
              </h2>
              <div className="space-y-2">
                {locationEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
