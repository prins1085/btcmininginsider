import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ReadingTimeIndicatorProps {
  totalReadTime: number; // in minutes
}

export function ReadingTimeIndicator({ totalReadTime }: ReadingTimeIndicatorProps) {
  const [timeRemaining, setTimeRemaining] = useState(totalReadTime);

  useEffect(() => {
    const updateTimeRemaining = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      const remaining = Math.max(totalReadTime * (1 - progress), 0);
      setTimeRemaining(Math.ceil(remaining));
    };

    window.addEventListener("scroll", updateTimeRemaining);
    return () => window.removeEventListener("scroll", updateTimeRemaining);
  }, [totalReadTime]);

  return (
    <div className="fixed top-20 right-4 z-40 bg-card/90 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg">
      <div className="flex items-center space-x-2 text-sm">
        <Clock className="w-4 h-4 text-[hsl(var(--bitcoin))]" />
        <span className="text-muted-foreground">
          {timeRemaining > 0 ? `${timeRemaining} min left` : "Finished!"}
        </span>
      </div>
    </div>
  );
}