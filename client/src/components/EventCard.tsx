import { motion, AnimatePresence } from 'framer-motion';
import { Event, EventStatus } from '../data';
import { useSchedule } from '@/hooks/use-schedule';
import { Star, ThumbsUp, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

const statusConfig: Record<EventStatus, { icon: any, color: string, label: string, bg: string }> = {
  'none': { icon: Circle, color: 'text-muted-foreground', label: 'Not Selected', bg: 'bg-transparent' },
  'must-see': { icon: Star, color: 'text-neon-yellow', label: 'Must See', bg: 'bg-neon-yellow/10 border-neon-yellow/50' },
  'nice': { icon: ThumbsUp, color: 'text-neon-cyan', label: 'Nice to see', bg: 'bg-neon-cyan/10 border-neon-cyan/50' },
  'have': { icon: CheckCircle, color: 'text-neon-green', label: 'Going / Have', bg: 'bg-neon-green/10 border-neon-green/50' },
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const { getStatus, toggleStatus } = useSchedule();
  const status = getStatus(event.id);
  const config = statusConfig[status];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.div
          layoutId={`card-${event.id}`}
          className={cn(
            "relative p-4 mb-3 rounded-xl border border-white/10 backdrop-blur-md transition-all active:scale-[0.98]",
            status === 'none' ? "bg-card/40 hover:bg-card/60" : config.bg
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-neon-magenta tracking-wider uppercase bg-neon-magenta/10 px-2 py-0.5 rounded">
                  {event.startTime}
                </span>
                {status !== 'none' && (
                  <config.icon className={cn("w-3 h-3", config.color)} />
                )}
              </div>
              <h3 className="text-lg font-bold font-display text-white leading-tight mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground font-ui uppercase tracking-widest">
                {event.location}
              </p>
            </div>
            
            <div className={cn(
              "w-1 h-12 rounded-full ml-3 self-center",
              event.category === 'music' ? "bg-neon-cyan" : 
              event.category === 'workshop' ? "bg-neon-green" : "bg-neon-yellow"
            )} />
          </div>
        </motion.div>
      </DrawerTrigger>
      
      <DrawerContent className="bg-card border-t border-white/10">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-display text-white">{event.title}</DrawerTitle>
            <DrawerDescription className="font-ui text-lg text-neon-magenta">{event.startTime} • {event.location}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 grid grid-cols-2 gap-3">
            {(Object.keys(statusConfig) as EventStatus[]).map((s) => {
              if (s === 'none') return null;
              const conf = statusConfig[s];
              const Icon = conf.icon;
              const isActive = status === s;
              
              return (
                <Button
                  key={s}
                  variant="outline"
                  className={cn(
                    "h-24 flex flex-col items-center justify-center gap-2 border-white/10 hover:bg-white/5",
                    isActive && conf.bg,
                    isActive && "border-current"
                  )}
                  onClick={() => toggleStatus(event.id, isActive ? 'none' : s)}
                >
                  <Icon className={cn("w-8 h-8", conf.color)} />
                  <span className={cn("font-display text-xs uppercase", conf.color)}>{conf.label}</span>
                </Button>
              );
            })}
             <Button
                variant="outline"
                className={cn(
                  "h-24 flex flex-col items-center justify-center gap-2 border-white/10 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive",
                  status === 'none' && "opacity-50"
                )}
                onClick={() => toggleStatus(event.id, 'none')}
              >
                <Circle className="w-8 h-8" />
                <span className="font-display text-xs uppercase">Clear</span>
              </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" className="text-muted-foreground">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
