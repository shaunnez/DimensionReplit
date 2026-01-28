import { EVENTS } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { useSchedule } from '@/hooks/use-schedule';
import { CircleOff } from 'lucide-react';

export default function MySchedule() {
  const { schedule } = useSchedule();
  
  const myEvents = EVENTS.filter(event => {
    const status = schedule[event.id];
    return status && status !== 'none';
  });

  // Group by Status
  const mustSee = myEvents.filter(e => schedule[e.id] === 'must-see');
  const niceToSee = myEvents.filter(e => schedule[e.id] === 'nice');
  const have = myEvents.filter(e => schedule[e.id] === 'have');

  return (
    <div className="min-h-screen pb-24">
      <Header title="My Plan" subtitle="Your Selection" />

      {myEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 space-y-4 text-muted-foreground">
          <CircleOff className="w-16 h-16 opacity-20" />
          <p className="font-ui text-lg">No events selected yet.</p>
          <p className="text-sm">Go to Workshops or Music pages to build your schedule.</p>
        </div>
      ) : (
        <div className="p-4 space-y-8">
          
          {mustSee.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-neon-yellow shadow-[0_0_8px_#ffff00]" />
                 <h2 className="text-lg font-display text-neon-yellow tracking-widest uppercase">Must See</h2>
              </div>
              {mustSee.map(event => <EventCard key={event.id} event={event} />)}
            </section>
          )}

          {niceToSee.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
                 <h2 className="text-lg font-display text-neon-cyan tracking-widest uppercase">Nice to See</h2>
              </div>
              {niceToSee.map(event => <EventCard key={event.id} event={event} />)}
            </section>
          )}

          {have.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_#00ff00]" />
                 <h2 className="text-lg font-display text-neon-green tracking-widest uppercase">Going / Have</h2>
              </div>
              {have.map(event => <EventCard key={event.id} event={event} />)}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
