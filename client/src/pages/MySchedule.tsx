import { EVENTS, Event, EventStatus } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useSchedule } from '@/hooks/use-schedule';
import { CircleOff, CalendarDays } from 'lucide-react';

// Define the grouping types - now grouped by day first, then status
type GroupedByStatus = Record<EventStatus, typeof EVENTS>;
type DayGroups = Record<string, GroupedByStatus>;

const STATUS_LABELS = {
  'must-see': { label: 'Must See', color: 'bg-neon-yellow shadow-[0_0_8px_#ffff00]', text: 'text-neon-yellow' },
  'nice': { label: 'Nice to See', color: 'bg-neon-cyan shadow-[0_0_8px_#00f0ff]', text: 'text-neon-cyan' },
  'have': { label: 'Going / Have', color: 'bg-neon-green shadow-[0_0_8px_#00ff00]', text: 'text-neon-green' },
};

const DAY_ORDER = ['Friday', 'Saturday', 'Sunday'];

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

  // Group by day first, then by status
  const groupedData = EVENTS.reduce((acc, event) => {
    const status = schedule[event.id];
    if (!status || status === 'none') return acc;

    const day = event.day;

    if (!acc[day]) acc[day] = {} as GroupedByStatus;
    if (!acc[day][status]) acc[day][status] = [];

    acc[day][status].push(event);

    // Sort by time within each status group
    acc[day][status].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    return acc;
  }, {} as DayGroups);

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
            const statusesInDay = groupedData[day];
            return (
              <section key={day} className="space-y-6">
                {/* Day Header */}
                <div className="flex items-center gap-2 sticky top-[72px] bg-background/80 backdrop-blur-md py-2 z-10">
                  <CalendarDays className="w-5 h-5 text-neon-cyan" />
                  <h2 className="text-xl font-display tracking-widest uppercase text-white">
                    {day}
                  </h2>
                </div>

                {/* Status Groups within each day */}
                {(Object.entries(STATUS_LABELS) as [EventStatus, typeof STATUS_LABELS['must-see']][]).map(([status, config]) => {
                  const events = statusesInDay[status];
                  if (!events || events.length === 0) return null;

                  return (
                    <div key={status} className="space-y-3 pl-2 border-l border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${config.color}`} />
                        <h3 className={`text-sm font-mono uppercase tracking-tighter ${config.text}`}>
                          {config.label}
                        </h3>
                      </div>

                      {events.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}