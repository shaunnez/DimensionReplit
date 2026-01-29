import { EVENTS } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useSchedule } from '@/hooks/use-schedule';
import { CircleOff, CalendarDays } from 'lucide-react';

// Define the grouping types
type GroupedByDay = Record<string, typeof EVENTS>;
type ScheduleGroups = {
  'must-see': GroupedByDay;
  'nice': GroupedByDay;
  'have': GroupedByDay;
};

const STATUS_LABELS = {
  'must-see': { label: 'Must See', color: 'bg-neon-yellow shadow-[0_0_8px_#ffff00]', text: 'text-neon-yellow' },
  'nice': { label: 'Nice to See', color: 'bg-neon-cyan shadow-[0_0_8px_#00f0ff]', text: 'text-neon-cyan' },
  'have': { label: 'Going / Have', color: 'bg-neon-green shadow-[0_0_8px_#00ff00]', text: 'text-neon-green' },
};

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

  // 1. Filter and Group in one pass
  const groupedData = EVENTS.reduce((acc, event) => {
    const status = schedule[event.id];
    if (!status || status === 'none') return acc;
      
    const day = event.day; // Assuming event.day is "Friday", "Saturday", etc.
    
    if (!acc[status]) acc[status] = {};
    if (!acc[status][day]) acc[status][day] = [];
    
    acc[status][day].push(event);

    // SORTING HAPPENS HERE
    acc[status][day].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    return acc;
  }, {} as ScheduleGroups);

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
          {(Object.entries(STATUS_LABELS) as [keyof ScheduleGroups, typeof STATUS_LABELS['must-see']][]).map(([status, config]) => {
            const daysInStatus = groupedData[status];
            if (!daysInStatus) return null;
            return (
              <section key={status} className="space-y-6">
                {/* Status Header */}
                <div className="flex items-center gap-2 sticky top-0 bg-background/80 backdrop-blur-md py-2 z-10">
                  <div className={`w-2 h-2 rounded-full ${config.color}`} />
                  <h2 className={`text-xl font-display tracking-widest uppercase ${config.text}`}>
                    {config.label}
                  </h2>
                </div>

                {/* Day Groups */}
                {Object.entries(daysInStatus).sort(([dayA], [dayB]) => {
                  const order = ['Friday', 'Saturday', 'Sunday'];
                  return order.indexOf(dayA) - order.indexOf(dayB);
                }).map(([day, events]) => (
                  <div key={day} className="space-y-3 pl-2 border-l border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                       <CalendarDays className="w-4 h-4 text-muted-foreground" />
                       <h3 className="text-sm font-mono text-white/60 uppercase tracking-tighter italic">
                         — {day}
                       </h3>
                    </div>
                    
                    {events.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}