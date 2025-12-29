import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BlogPost from "@/pages/blog-post";
import Search from "@/pages/search";
import MiningGuides from "@/pages/mining-guides";
import HardwareReviews from "@/pages/hardware-reviews";
import MiningCalculator from "@/pages/mining-calculator";
import News from "@/pages/news";
import { useEffect } from "react";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import Disclaimer from "@/pages/disclaimer";

function Router() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/search" component={Search} />
          <Route path="/mining-guides" component={MiningGuides} />
          <Route path="/hardware-reviews" component={HardwareReviews} />
          <Route path="/calculator" component={MiningCalculator} />
          <Route path="/news" component={News} />
          <Route path="/category/:category" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
