import { cn } from "@/lib/utils";

interface AdSlotProps {
  className?: string;
  label?: string;
}

/**
 * AdSense-safe placeholder component.
 * - Intentionally does NOT load any ad scripts.
 * - Place ONLY after primary content (avoid above-the-fold).
 */
export function AdSlot({ className, label }: AdSlotProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[728px] mx-auto bg-muted/40 border border-dashed border-muted-foreground/30 rounded-lg p-4 text-center",
        className
      )}
    >
      {/* Google AdSense Responsive Ad Slot */}
      <div className="text-xs text-muted-foreground mb-1">Advertisement</div>
      <div className="text-xs text-muted-foreground/80">
        {label || "Responsive Ad Slot (loads after content)"}
      </div>
    </div>
  );
}



