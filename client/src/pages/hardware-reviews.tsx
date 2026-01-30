import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { SEOHead } from "@/components/common/seo-head";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, TrendingUp, Star } from "lucide-react";
import { getBlogPostsByCategory, type BlogPost } from "@/lib/static-data";
import { AdSlot } from "@/components/common/ad-slot";
import AdUnit from "@/components/common/AdUnit";
import AdsterraNative from "@/components/common/AdsterraNative";

export default function HardwareReviews() {
  const [filter, setFilter] = useState<string>("all");

  // Use static data instead of API calls
  const posts = getBlogPostsByCategory("Hardware Review");

  const filters = [
    { label: "All Reviews", value: "all" },
    { label: "ASIC Miners", value: "asic" },
    { label: "GPUs", value: "gpu" },
    { label: "Power Supplies", value: "psu" },
    { label: "Cooling", value: "cooling" },
  ];

  const featuredSpecs = [
    {
      label: "Miners Reviewed",
      value: posts.length,
      color: "text-blue-500",
    },
    {
      label: "Avg. Efficiency",
      value: "15.2 J/TH",
      color: "text-green-500",
    },
    {
      label: "Top Rating",
      value: "4.8/5",
      color: "text-yellow-500",
    },
    {
      label: "Price Range",
      value: "$500-$5K",
      color: "text-purple-500",
    },
  ];

  return (
    <>
      <SEOHead
        title="Bitcoin Mining Hardware Reviews | Bitcoin Mining Insider"
        description="In-depth Bitcoin mining hardware reviews and comparisons. ASIC miners, GPUs, power supplies, and cooling systems tested and rated by experts."
        keywords={[
          "bitcoin mining hardware",
          "ASIC reviews",
          "mining GPU",
          "hardware comparison",
          "mining equipment",
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500/10 to-cyan-100 dark:from-blue-500/20 dark:to-muted py-16">
        <div className="container-layout">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-6 glow-effect">
              <Cpu className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Hardware <span className="text-blue-500">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert reviews and comparisons of Bitcoin mining hardware. Make
              informed decisions with our comprehensive testing and analysis.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {featuredSpecs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <div className={`text-2xl font-bold ${spec.color} mb-1`}>
                    {spec.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-layout py-12">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-foreground">
            Hardware Reviews
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <Badge
                key={filterOption.value}
                variant={filter === filterOption.value ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filter === filterOption.value
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => setFilter(filterOption.value)}
              >
                {filterOption.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Cpu className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No hardware reviews found
            </h3>
            <p className="text-muted-foreground">
              We're constantly adding new hardware reviews. Check back soon for
              the latest reviews!
            </p>
          </div>
        )}

        {/* Google AdSense Ad Slot - After Reviews Grid */}
        <div className="my-12 flex justify-center">
          <AdUnit client="ca-pub-7632399404847430" slot="5287633032" />
          <AdsterraNative />
        </div>
      </main>
    </>
  );
}
