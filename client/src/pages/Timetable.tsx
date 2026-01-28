import { useState } from 'react';
import { EVENTS, Event } from '@/data';
import { EventCard } from '@/components/EventCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';

interface TimetableProps {
  category: 'music' | 'workshop';
  title: string;
}

export default function Timetable({ category, title }: TimetableProps) {
  const filteredEvents = EVENTS.filter(e => e.category === category || (category === 'music' && e.category === 'performance'));
  
  // Extract unique locations and days for filtering/tabs
  const locations = Array.from(new Set(filteredEvents.map(e => e.location)));
  const days = Array.from(new Set(filteredEvents.map(e => e.day)));
  
  const [activeDay, setActiveDay] = useState<string>(days[0] || 'Saturday');
  
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
            .sort((a, b) => {
               // Simple time sort helper (very basic for prototype)
               const getMinutes = (t: string) => {
                 const [time, period] = t.split(' ');
                 let [h, m] = time.split(':').map(Number);
                 if (period === 'PM' && h !== 12) h += 12;
                 if (period === 'AM' && h === 12) h = 0;
                 return h * 60 + m;
               };
               return getMinutes(a.startTime) - getMinutes(b.startTime);
            });

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
