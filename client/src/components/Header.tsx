import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Trippy animation components
const animations = [
  // Spiral Vortex
  () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            borderColor: `hsl(${i * 30}, 100%, 50%)`,
            width: `${(i + 1) * 8}%`,
            height: `${(i + 1) * 8}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 - i * 0.1,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.1,
          }}
        />
      ))}
      <motion.div
        className="absolute w-4 h-4 bg-white rounded-full"
        animate={{
          scale: [1, 50, 1],
          opacity: [1, 0, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  ),

  // Matrix Rain
  () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-neon-green font-mono text-xl"
          style={{ left: `${i * 5}%` }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        >
          {String.fromCharCode(0x30A0 + Math.random() * 96)}
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/20 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  ),

  // Kaleidoscope
  () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ rotate: `${i * 60}deg` }}
          animate={{ rotate: [`${i * 60}deg`, `${i * 60 + 360}deg`] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, j) => (
            <motion.div
              key={j}
              className="absolute w-32 h-32"
              style={{
                background: `linear-gradient(${j * 90}deg, ${['#00f0ff', '#ff00ff', '#ffff00', '#00ff00'][j]}44, transparent)`,
                transformOrigin: "0 0",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: j * 0.25,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  ),

  // Pulsing Circles
  () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${['#00f0ff', '#ff00ff', '#ffff00', '#00ff00'][i % 4]}66, transparent)`,
          }}
          animate={{
            width: ["0%", "150%"],
            height: ["0%", "150%"],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  ),

  // Warp Speed
  () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * window.innerWidth * 2],
            y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * window.innerHeight * 2],
            scale: [0, 3],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  ),

  // Neon Grid
  () => (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "500px" }}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#00f0ff33 1px, transparent 1px),
            linear-gradient(90deg, #00f0ff33 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [60, 60],
          y: [0, 50],
        }}
        transition={{
          y: { duration: 1, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-20 h-20 -translate-x-1/2"
        style={{
          background: "linear-gradient(to top, #ff00ff, #00f0ff)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          filter: ["drop-shadow(0 0 10px #ff00ff)", "drop-shadow(0 0 30px #00f0ff)", "drop-shadow(0 0 10px #ff00ff)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  ),
];

export function Header({ title, subtitle }: { title?: string, subtitle?: string }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerAnimation = () => {
    setCurrentAnimation(Math.floor(Math.random() * animations.length));
    setShowAnimation(true);
  };

  const AnimationComponent = animations[currentAnimation];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
             {title ? (
               <h1 className="text-xl font-display font-bold text-white tracking-widest uppercase glow-text">
                 {title}
               </h1>
             ) : (
               <Link href="/">
                 <h1 className="text-xl font-display font-bold text-white tracking-widest uppercase cursor-pointer">
                   Dimension
                 </h1>
               </Link>
             )}
             {subtitle && (
               <p className="text-xs text-neon-magenta font-mono tracking-widest uppercase mt-1">
                 {subtitle}
               </p>
             )}
          </div>
          <button
            onClick={triggerAnimation}
            className={`w-8 h-8 rounded-full border flex items-center justify-center animate-pulse transition-colors ${
              isOffline
                ? 'border-red-500 bg-red-500/20 hover:bg-red-500/40'
                : 'border-neon-cyan bg-neon-cyan/20 hover:bg-neon-cyan/40'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              isOffline
                ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                : 'bg-neon-cyan shadow-[0_0_10px_#00f0ff]'
            }`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnimation(false)}
          >
            <AnimationComponent />
            <motion.p
              className="absolute bottom-8 left-0 right-0 text-center text-white/50 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              tap to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
