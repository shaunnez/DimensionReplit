import { useState } from 'react';
import { EVENTS, Event, KEY_TIMES } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { MapPin, Calendar as CalendarIcon } from 'lucide-react';

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
              {KEY_TIMES.festival.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/10 bg-card/40 backdrop-blur-md">
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
              {KEY_TIMES.transport.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/10 bg-card/40 backdrop-blur-md">
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
            <div className="p-6 rounded-xl border border-white/10 bg-card/40 backdrop-blur-md text-center">
              <p className="text-muted-foreground font-mono text-sm">Map coming soon...</p>
            </div>
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

      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-white/5 px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
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
