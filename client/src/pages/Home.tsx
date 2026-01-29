import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Tent, Music, Calendar, Flame, Eye, Clock, Map } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { title: 'Music', subtitle: 'DJs & Artists', icon: Music, href: '/music', color: 'text-neon-cyan', border: 'group-hover:border-neon-cyan' },
    { title: 'Performers', subtitle: 'Fire & Flow', icon: Flame, href: '/performers', color: 'text-neon-magenta', border: 'group-hover:border-neon-magenta' },
    { title: 'Workshops', subtitle: 'Heal & Learn', icon: Tent, href: '/workshops', color: 'text-neon-green', border: 'group-hover:border-neon-green' },
    { title: 'VJs', subtitle: 'Visual Artists', icon: Eye, href: '/vjs', color: 'text-neon-magenta', border: 'group-hover:border-neon-magenta' },
    { title: 'Info', subtitle: 'Key Times & Map', icon: Clock, href: '/info', color: 'text-neon-yellow', border: 'group-hover:border-neon-yellow' },
    { title: 'My Plan', subtitle: 'Your Schedule', icon: Calendar, href: '/schedule', color: 'text-white', border: 'group-hover:border-white' },
  ];

  return (
    <div className="p-6 pt-12 min-h-screen flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          DIMENSION
        </h1>
        <p className="text-neon-magenta font-mono tracking-[0.2em] text-sm uppercase">
          10th Anniversary Edition
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setLocation(item.href)}
            className="group relative overflow-hidden p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 transition-all active:scale-95 text-left hover:bg-white/5"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]`} />
            
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </h2>
                <p className={`text-xs font-mono uppercase tracking-widest ${item.color}`}>
                  {item.subtitle}
                </p>
              </div>
              <item.icon className={`w-8 h-8 ${item.color} opacity-80 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_currentColor]`} />
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
        NUKUTAWHITI • NORTHLAND • AOTEAROA NZ
      </div>
    </div>
  );
}
