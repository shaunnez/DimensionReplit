import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Timetable from "@/pages/Timetable";
import MySchedule from "@/pages/MySchedule";
import { AnimatePresence, motion } from "framer-motion";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/workshops">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Timetable category="workshop" title="Workshops" />
          </motion.div>
        </Route>
        <Route path="/music">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <Timetable category="music" title="Music & Arts" />
           </motion.div>
        </Route>
        <Route path="/schedule">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MySchedule />
          </motion.div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background text-foreground min-h-screen font-ui selection:bg-neon-cyan selection:text-black">
        <Router />
        <Navigation />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
