import { useState, useEffect } from 'react';
import { X, Share, PlusSquare } from 'lucide-react';

// Detect if running on iOS
function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

// Detect if running in standalone mode (already installed)
function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    ('standalone' in window.navigator && (window.navigator as any).standalone) ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

// Check if the prompt was dismissed
function wasPromptDismissed(): boolean {
  if (typeof localStorage === 'undefined') return false;
  const dismissed = localStorage.getItem('ios-install-prompt-dismissed');
  if (!dismissed) return false;

  // Re-show after 7 days
  const dismissedTime = parseInt(dismissed, 10);
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - dismissedTime < sevenDays;
}

export function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show on iOS, not in standalone, and not dismissed recently
    if (isIOS() && !isStandalone() && !wasPromptDismissed()) {
      // Delay showing the prompt slightly for better UX
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('ios-install-prompt-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-card/95 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl p-4 shadow-lg shadow-neon-cyan/10">
        <button
          onClick={dismissPrompt}
          className="absolute top-3 right-3 text-muted-foreground hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-8">
          <h3 className="text-lg font-display font-bold text-white mb-2">
            Install Dimension App
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add this app to your home screen for the best experience with offline access and quick launch.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                <Share className="w-4 h-4 text-neon-cyan" />
              </div>
              <p className="text-white">
                Tap the <span className="font-semibold text-neon-cyan">Share</span> button in Safari
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                <PlusSquare className="w-4 h-4 text-neon-cyan" />
              </div>
              <p className="text-white">
                Select <span className="font-semibold text-neon-cyan">Add to Home Screen</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
