import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from './ui/button';
import { requestNotificationPermission } from '@/hooks/use-reminders';

export function NotificationBanner() {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the banner in this session
    const wasDismissed = sessionStorage.getItem('notification-banner-dismissed');
    if (wasDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleEnableNotifications = async () => {
    const newPermission = await requestNotificationPermission();
    setPermission(newPermission);
    if (newPermission === 'granted') {
      setDismissed(true);
      sessionStorage.setItem('notification-banner-dismissed', 'true');
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('notification-banner-dismissed', 'true');
  };

  // Don't show if notifications are granted, denied, or user dismissed it
  if (permission === 'granted' || permission === 'denied' || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-neon-yellow/10 border-b border-neon-yellow/30 backdrop-blur-lg">
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Bell className="w-5 h-5 text-neon-yellow flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-display text-white">
              Enable notifications to get reminders for your favorite events!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleEnableNotifications}
            className="bg-neon-yellow text-black hover:bg-neon-yellow/90 font-display uppercase text-xs"
          >
            Enable
          </Button>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
