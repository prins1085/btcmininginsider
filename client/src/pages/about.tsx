import { SEOHead } from "@/components/common/seo-head";

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us | Bitcoin Mining Insider"
        description="Learn about Bitcoin Mining Insider—an educational Bitcoin mining publication focused on practical explainers, hardware context, and risk-aware learning."
        keywords={[
          "about Bitcoin Mining Insider",
          "bitcoin mining education",
          "mining guides",
          "hardware reviews",
          "bitcoin data",
        ]}
      />

      <main className="container-layout py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">About Us</h1>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Bitcoin Mining Insider is an educational Bitcoin mining blog built for
            readers who want clear explanations, practical context, and a
            grounded understanding of how mining works. We focus on mining
            fundamentals, hardware concepts, operational considerations, and how
            to interpret public network and market data responsibly.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            What we publish
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our content is designed to help you build an “engineering-level”
            mental model of mining—from hashrate and difficulty to electricity,
            heat, noise, and uptime. We publish:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
            <li>
              Guides that explain mining terminology and workflows in plain
              language.
            </li>
            <li>
              Hardware reviews that describe specifications and trade-offs (not
              endorsements).
            </li>
            <li>
              News and analysis that helps you understand what happened and why
              it matters for miners operationally.
            </li>
            <li>
              Tools and calculators intended for educational estimation and
              scenario exploration.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            What we do not do
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not provide financial, investment, or trading advice. We do
            not publish “signals,” profit promises, or recommendations to buy or
            sell any asset. When we discuss economics, it is presented as
            general, high-level information and operational context.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Data sources & accuracy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Where we display cryptocurrency market data, we use public APIs
            (e.g., CoinGecko) and basic caching to reduce load. Data may be
            delayed or unavailable at times. Always verify important details
            using multiple sources.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions, corrections, or feedback? Reach us at{" "}
            <span className="font-medium text-foreground">
              contact@bitcoinmininginsider.com
            </span>{" "}
            or use the form on our Contact page.
          </p>
        </article>
      </main>
    </>
  );
}



