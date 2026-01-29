import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Tent, Music, Calendar, Flame, Eye, Clock } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { title: 'Music', subtitle: 'DJs & Artists', icon: Music, href: '/music', color: 'text-neon-cyan', glowColor: 'rgba(0, 240, 255, 0.3)' },
    { title: 'Performers', subtitle: 'Fire & Flow', icon: Flame, href: '/performers', color: 'text-neon-magenta', glowColor: 'rgba(255, 0, 255, 0.3)' },
    { title: 'Workshops', subtitle: 'Heal & Learn', icon: Tent, href: '/workshops', color: 'text-neon-green', glowColor: 'rgba(0, 255, 136, 0.3)' },
    { title: 'VJs', subtitle: 'Visual Artists', icon: Eye, href: '/vjs', color: 'text-neon-magenta', glowColor: 'rgba(255, 0, 255, 0.3)' },
    { title: 'Info', subtitle: 'Key Times & Map', icon: Clock, href: '/info', color: 'text-neon-yellow', glowColor: 'rgba(255, 255, 0, 0.3)' },
    { title: 'My Plan', subtitle: 'Your Schedule', icon: Calendar, href: '/schedule', color: 'text-white', glowColor: 'rgba(255, 255, 255, 0.2)' },
  ];

  return (
    <div className="p-6 pt-12 min-h-screen flex flex-col">
      {/* Header with enhanced glow effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center relative"
      >
        {/* Animated glow background */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.4) 0%, rgba(255, 0, 255, 0.2) 50%, transparent 70%)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />

        <h1
          className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta tracking-tighter mb-2"
          style={{
            textShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.3), 0 0 90px rgba(255, 0, 255, 0.2)',
            filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.4))',
          }}
        >
          DIMENSION
        </h1>
        <p
          className="text-neon-magenta font-mono tracking-[0.2em] text-sm uppercase"
          style={{
            textShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
          }}
        >
          10th Anniversary Edition
        </p>
      </motion.div>

      {/* Menu buttons with subtle pulse animation */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setLocation(item.href)}
            className="group relative overflow-hidden p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 transition-all active:scale-95 text-left hover:bg-white/5"
            style={{
              animation: `subtle-pulse ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: 'transform 0.8s ease' }} />

            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                boxShadow: `inset 0 0 30px ${item.glowColor}, 0 0 20px ${item.glowColor}`,
              }}
            />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </h2>
                <p className={`text-xs font-mono uppercase tracking-widest ${item.color}`}>
                  {item.subtitle}
                </p>
              </div>
              <item.icon
                className={`w-8 h-8 ${item.color} opacity-80 group-hover:scale-110 transition-transform duration-300`}
                style={{
                  filter: `drop-shadow(0 0 8px currentColor)`,
                }}
              />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
        NUKUTAWHITI • NORTHLAND • AOTEAROA NZ
      </div>

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes subtle-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);
            border-color: rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 20px 0 rgba(0, 240, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </div>
  );
}
