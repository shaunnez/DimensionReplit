import { Link, useLocation } from 'wouter';
import { Home, Music, Tent, Flame, Eye, Clock, Map, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/music', icon: Music, label: 'Music' },
    { href: '/performers', icon: Flame, label: 'Performers' },
    { href: '/workshops', icon: Tent, label: 'Workshops' },
    { href: '/vjs', icon: Eye, label: 'VJs' },
    { href: '/info', icon: Clock, label: 'Info' },
    { href: '/schedule', icon: Calendar, label: 'My Plan' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-white/10 pb-safe safe-bottom">
      <div
        className="flex justify-around items-center h-16 overflow-x-auto no-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          overscrollBehavior: 'contain'
        }}
      >
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex flex-col items-center justify-center min-w-[60px] h-full space-y-1 cursor-pointer transition-colors active:scale-90 px-2",
                isActive ? "text-neon-cyan" : "text-muted-foreground hover:text-white"
              )}>
                <Icon className={cn("w-4 h-4", isActive && "drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]")} />
                <span className="text-[9px] font-display uppercase tracking-wider whitespace-nowrap">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
