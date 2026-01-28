import { Link } from "wouter";

export function Header({ title, subtitle }: { title?: string, subtitle?: string }) {
  return (
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
        <div className="w-8 h-8 rounded-full border border-neon-cyan bg-neon-cyan/20 flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f0ff]" />
        </div>
      </div>
    </header>
  );
}
