import { cn } from "@/lib/utils";

interface AdSpaceProps {
  size: "banner" | "leaderboard" | "mobile" | "square";
  className?: string;
  label?: string;
}

const adSizes = {
  banner: "h-24 w-full max-w-[728px]",
  leaderboard: "h-24 w-full max-w-[728px]",
  mobile: "h-20 w-full max-w-[320px]",
  square: "h-64 w-64",
};

const adLabels = {
  banner: "728 x 90 Banner Ad",
  leaderboard: "728 x 90 Leaderboard Ad",
  mobile: "320 x 100 Mobile Banner Ad",
  square: "300 x 250 Square Ad",
};

export function AdSpace({ size, className, label }: AdSpaceProps) {
  return (
    <div
      className={cn(
        "bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center text-center p-4",
        adSizes[size],
        className
      )}
    >
      <div className="text-muted-foreground text-xs mb-2">Advertisement</div>
      <div className="text-muted-foreground/70 text-xs">
        {label || adLabels[size]}
      </div>
      {/* Google AdSense or other ad network integration would go here */}
    </div>
  );
}
