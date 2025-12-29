import { SEOHead } from "@/components/common/seo-head";

export default function Disclaimer() {
  return (
    <>
      <SEOHead
        title="Disclaimer | Bitcoin Mining Insider"
        description="Bitcoin Mining Insider disclaimer: educational-only information, no financial advice, and general risk disclosure for cryptocurrency and mining."
        keywords={["disclaimer", "no financial advice", "risk disclosure"]}
      />

      <main className="container-layout py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">Disclaimer</h1>

          <div className="rounded-lg border border-border bg-card p-6 mb-8">
            <p className="text-foreground font-medium">
              This website is for educational and informational purposes only
              and does not constitute financial or investment advice.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Cryptocurrency markets and mining economics involve risk and can
              change quickly due to price volatility, network difficulty
              adjustments, fees, equipment downtime, energy pricing, and
              regulatory developments. Always verify information independently
              and consider consulting qualified professionals where appropriate.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            No advice relationship
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Content on Bitcoin Mining Insider is general information. We are not a
            broker, exchange, or financial advisor. Reading or using this site
            does not create an advisory, fiduciary, or professional relationship.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Estimates and tools
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Any calculators, charts, and estimates are simplified models intended
            for educational understanding. They may rely on assumptions and data
            sources that can be incomplete or delayed. Actual outcomes may
            differ materially.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Market data
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cryptocurrency price and market data shown on this site is provided
            for informational purposes only. We do not guarantee accuracy,
            completeness, or timeliness.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Limitation of liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, Bitcoin Mining Insider is not
            responsible for losses or damages arising from the use of this site
            or reliance on its content.
          </p>
        </article>
      </main>
    </>
  );
}



