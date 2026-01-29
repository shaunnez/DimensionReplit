import { EVENTS } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useReminders } from '@/hooks/use-reminders';
import { BellOff } from 'lucide-react';

export default function Reminders() {
  const { getAllReminders } = useReminders();
  const allReminders = getAllReminders();

  // Get event details for each reminder
  const remindersWithEvents = allReminders
    .map(reminder => {
      const event = EVENTS.find(e => e.id === reminder.eventId);
      if (!event) return null;
      return {
        reminder,
        event
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by reminder date/time
      const dateA = new Date(`${a!.reminder.reminderDate}T${a!.reminder.reminderTime}`);
      const dateB = new Date(`${b!.reminder.reminderDate}T${b!.reminder.reminderTime}`);
      return dateA.getTime() - dateB.getTime();
    });

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

  return (
    <div className="min-h-screen pb-24">
      <Header title="Reminders" subtitle={`${remindersWithEvents.length} Active`} />

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
            const { reminder, event } = item;

            return (
              <div key={event.id} className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-neon-yellow font-mono">
                    📅 {formatReminderDate(reminder.reminderDate)}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-neon-yellow font-mono">
                    🔔 {formatReminderTime(reminder.reminderTime)}
                  </span>
                </div>
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
