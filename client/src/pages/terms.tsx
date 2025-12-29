import { SEOHead } from "@/components/common/seo-head";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions | Bitcoin Mining Insider"
        description="Terms and Conditions for using Bitcoin Mining Insider. Educational-only content, no financial advice, and limitation of liability."
        keywords={[
          "terms",
          "terms and conditions",
          "no financial advice",
          "limitation of liability",
        ]}
      />

      <main className="container-layout py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            These Terms &amp; Conditions (“Terms”) govern your use of Bitcoin
            Mining Insider (the “Website”). By accessing or using the Website,
            you agree
            to these Terms. If you do not agree, please do not use the Website.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Informational and educational use only
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All content on this Website is provided for educational and
            informational purposes only. Content may include general discussions
            of mining hardware, operating considerations, and publicly available
            network or market data. The Website is not intended to be a complete
            or real-time source of truth.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            No financial or investment advice
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nothing on this Website constitutes financial, investment, legal, or
            tax advice. You are solely responsible for your decisions and for
            verifying information from independent sources. Cryptocurrency
            markets can be volatile, and mining economics can change quickly due
            to factors such as difficulty adjustments, fees, energy pricing,
            equipment failure, or regulatory changes.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Tools, calculators, and estimates
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Any tools or calculators provided by the Website are for educational
            estimation only. They rely on user inputs and simplifying
            assumptions. Actual outcomes may differ materially.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Third-party services and links
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Website may reference third-party services or display
            third-party content (such as market data provided by public APIs).
            We do not control and are not responsible for third-party services,
            their availability, or their content and policies.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Intellectual property
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Unless otherwise noted, text and original content on this Website is
            owned by Bitcoin Mining Insider and may not be reproduced for commercial
            purposes without permission. You may share excerpts with attribution
            and a link to the original page.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Limitation of liability
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To the maximum extent permitted by law, Bitcoin Mining Insider and its
            contributors shall not be liable for any direct, indirect,
            incidental, consequential, special, or exemplary damages arising out
            of or relating to your use of the Website, reliance on any content,
            or inability to access the Website.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Disclaimer of warranties
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Website is provided on an “as is” and “as available” basis
            without warranties of any kind, whether express or implied,
            including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Changes
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may modify these Terms at any time. Your continued use of the
            Website after changes are posted constitutes acceptance of the
            updated Terms.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">
            Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these Terms? Email{" "}
            <span className="font-medium text-foreground">
              contact@bitcoinmininginsider.com
            </span>
            .
          </p>

          <p className="text-xs text-muted-foreground mt-10">
            Effective date: 2025-12-27
          </p>
        </article>
      </main>
    </>
  );
}



