import { EVENTS, Event, EventStatus } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useSchedule } from '@/hooks/use-schedule';
import { CircleOff, CalendarDays } from 'lucide-react';

// Define the grouping types - now grouped by day only, sorted by time
type EventWithStatus = Event & { status: EventStatus };
type DayGroups = Record<string, EventWithStatus[]>;

const DAY_ORDER = ['Friday', 'Saturday', 'Sunday', 'Monday'];

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes;

  // FESTIVAL LOGIC: If the time is between 00:00 and 05:00,
  // treat it as "late night" (add 24 hours) so it appears after 23:00.
  if (hours >= 0 && hours < 6) {
    totalMinutes += 24 * 60;
  }

  return totalMinutes;
};

export default function MySchedule() {
  const { schedule } = useSchedule();

  // Group by day only and sort by time (no category grouping)
  const groupedData = EVENTS.reduce((acc, event) => {
    const status = schedule[event.id];
    if (!status || status === 'none') return acc;

    const day = event.day;

    if (!acc[day]) acc[day] = [];

    acc[day].push({ ...event, status });

    return acc;
  }, {} as DayGroups);

  // Sort each day's events by time
  Object.keys(groupedData).forEach(day => {
    groupedData[day].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  });

  const hasEvents = Object.keys(groupedData).length > 0;

  

  return (
    <div className="min-h-screen pb-24">
      <Header title="My Plan" subtitle="Your Selection" />

      {!hasEvents ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 space-y-4 text-muted-foreground">
          <CircleOff className="w-16 h-16 opacity-20" />
          <p className="font-ui text-lg">No events selected yet.</p>
        </div>
      ) : (
        <div className="p-4 space-y-12">
          {DAY_ORDER.filter(day => groupedData[day]).map(day => {
            const eventsInDay = groupedData[day];
            return (
              <section key={day} className="space-y-6">
                {/* Day Header */}
                <div className="flex items-center gap-2 sticky top-[72px] bg-background/80 backdrop-blur-md py-2 z-10">
                  <CalendarDays className="w-5 h-5 text-neon-cyan" />
                  <h2 className="text-xl font-display tracking-widest uppercase text-white">
                    {day}
                  </h2>
                </div>

                {/* Events sorted by time */}
                <div className="space-y-3">
                  {eventsInDay.map(event => (
                    <EventCard key={event.id} event={event} showStatusBadge showFriendPills />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}