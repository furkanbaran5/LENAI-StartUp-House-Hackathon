import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Forms from "@/pages/Forms";
import Packages from "@/pages/Packages";
import Product from "@/pages/Product";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function AnimatedRoute({ component: Component }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Component />
    </motion.div>
  );
}

// 🆙 Scroll To Top Component
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop /> {/* Scroll behavior buraya eklendi ✅ */}
      <Switch location={location}>
        <Route path="/" component={() => <AnimatedRoute component={Home} />} />
        <Route path="/about" component={() => <AnimatedRoute component={About} />} />
        <Route path="/packages" component={() => <AnimatedRoute component={Packages} />} />
        <Route path="/product" component={() => <AnimatedRoute component={Product} />} />
        <Route path="/login" component={() => <AnimatedRoute component={Login} />} />
        <Route path="/register" component={() => <AnimatedRoute component={Register} />} />
        <Route path="/form" component={() => <AnimatedRoute component={Forms} />} />
        <Route component={() => <AnimatedRoute component={NotFound} />} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;