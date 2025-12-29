import { SEOHead } from "@/components/common/seo-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Please complete the form",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // No backend in this static site. We intentionally do not send data anywhere.
    // Replace with a real endpoint or email service when available.
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    toast({
      title: "Message received",
      description:
        "Thanks for reaching out. For now, please also email contact@bitcoinmininginsider.com for time-sensitive requests.",
    });
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Bitcoin Mining Insider"
        description="Contact Bitcoin Mining Insider for corrections, feedback, or general questions about our Bitcoin mining educational content."
        keywords={[
          "contact Bitcoin Mining Insider",
          "bitcoin mining questions",
          "site feedback",
        ]}
      />

      <main className="container-layout py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We welcome corrections, clarifying questions, and suggestions for
            future educational topics. If you are reporting a factual issue,
            please include a link to the relevant page and the supporting
            source.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="How can we help?"
                      rows={6}
                    />
                  </div>
                  <Button className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other ways to reach us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div>contact@bitcoinmininginsider.com</div>
                </div>
                <div>
                  <div className="font-medium text-foreground">What to expect</div>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      We aim to respond to educational questions and correction
                      requests as time allows.
                    </li>
                    <li>
                      We may not respond to messages requesting financial,
                      investment, or trading advice.
                    </li>
                    <li>
                      Please do not include sensitive personal information.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}



