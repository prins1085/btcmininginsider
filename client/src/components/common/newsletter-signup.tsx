import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      subscriptionMutation.mutate(email);
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-gradient-to-r from-[hsl(var(--bitcoin))]/10 to-orange-100 dark:from-[hsl(var(--bitcoin))]/20 dark:to-muted rounded-xl p-8 my-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f89540' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm10 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="text-center max-w-2xl mx-auto relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bitcoin-bg text-white mb-6 glow-effect">
          <span className="text-2xl font-bold">₿</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Join 50,000+ Miners
        </h2>
        <p className="text-muted-foreground mb-6">
          Get exclusive Bitcoin mining insights, hardware reviews, and profitability alerts delivered weekly.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button
            type="submit"
            className="bitcoin-bg hover:bg-[hsl(var(--bitcoin-dark))] text-white glow-effect"
            disabled={subscriptionMutation.isPending}
          >
            {subscriptionMutation.isPending ? "Joining..." : "Join Free"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          ✓ Free weekly insights  ✓ No spam  ✓ Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
