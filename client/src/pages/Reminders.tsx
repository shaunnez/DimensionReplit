import { EVENTS } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useReminders } from '@/hooks/use-reminders';
import { BellOff, Bell, BellRing } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Reminders() {
  const { getAllReminders, notificationPermission, requestNotificationPermission } = useReminders();
  const allReminders = getAllReminders();

  // Check if a reminder is in the past (using user's local timezone)
  const isReminderPast = (reminderDate: string, reminderTime: string): boolean => {
    // Create date in local timezone
    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}:00`);
    const now = new Date();
    return reminderDateTime.getTime() < now.getTime();
  };

  // Get event details for each reminder
  const remindersWithEvents = allReminders
    .map(reminder => {
      const event = EVENTS.find(e => e.id === reminder.eventId);
      if (!event) return null;
      const isPast = isReminderPast(reminder.reminderDate, reminder.reminderTime);
      return {
        reminder,
        event,
        isPast
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Sort past reminders to the bottom, then by date/time
      if (a!.isPast !== b!.isPast) {
        return a!.isPast ? 1 : -1;
      }
      const dateA = new Date(`${a!.reminder.reminderDate}T${a!.reminder.reminderTime}`);
      const dateB = new Date(`${b!.reminder.reminderDate}T${b!.reminder.reminderTime}`);
      return dateA.getTime() - dateB.getTime();
    });

  // Count active (non-past) reminders
  const activeCount = remindersWithEvents.filter(r => !r!.isPast).length;
  const pastCount = remindersWithEvents.filter(r => r!.isPast).length;

  // Helper to format date
  const formatReminderDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Helper to format time
  const formatReminderTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
  };

  // Handle enable notifications click
  const handleEnableNotifications = async () => {
    await requestNotificationPermission();
  };

  const showNotificationCTA = notificationPermission !== 'granted' && 'Notification' in window;

  return (
    <div className="min-h-screen pb-24">
      <Header
        title="Reminders"
        subtitle={activeCount > 0 ? `${activeCount} Active${pastCount > 0 ? `, ${pastCount} Past` : ''}` : 'None Active'}
      />

      {/* Notification Permission CTA */}
      {showNotificationCTA && remindersWithEvents.length > 0 && (
        <div className="mx-4 mt-4 p-4 rounded-xl border border-neon-yellow/30 bg-neon-yellow/5 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <BellRing className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-display text-white mb-2">
                {notificationPermission === 'denied'
                  ? 'Notifications are blocked'
                  : 'Enable notifications to get reminded'}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {notificationPermission === 'denied'
                  ? 'Please enable notifications in your browser settings to receive reminders.'
                  : 'Allow notifications so you don\'t miss your scheduled events.'}
              </p>
              {notificationPermission !== 'denied' && (
                <button
                  onClick={handleEnableNotifications}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-neon-yellow/20 border border-neon-yellow/50 text-neon-yellow rounded-lg hover:bg-neon-yellow/30 transition-colors"
                >
                  Enable Notifications
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {remindersWithEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 space-y-4 text-muted-foreground">
          <BellOff className="w-16 h-16 opacity-20" />
          <p className="font-ui text-lg">No reminders set yet.</p>
          <p className="text-sm">Tap any event and set a reminder to get notified.</p>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {remindersWithEvents.map((item) => {
            if (!item) return null;
            const { reminder, event, isPast } = item;

            return (
              <div
                key={event.id}
                className={cn(
                  "space-y-2 transition-opacity",
                  isPast && "opacity-50"
                )}
              >
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  isPast && "line-through decoration-white/30"
                )}>
                  <span className={cn(
                    "font-mono",
                    isPast ? "text-muted-foreground" : "text-neon-yellow"
                  )}>
                    {isPast ? "✓" : "📅"} {formatReminderDate(reminder.reminderDate)}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className={cn(
                    "font-mono",
                    isPast ? "text-muted-foreground" : "text-neon-yellow"
                  )}>
                    {isPast ? "" : "🔔 "}{formatReminderTime(reminder.reminderTime)}
                  </span>
                  {isPast && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      Completed
                    </span>
                  )}
                </div>
                <div className={cn(isPast && "grayscale")}>
                  <EventCard event={event} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
