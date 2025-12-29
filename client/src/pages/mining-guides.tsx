import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { SEOHead } from "@/components/common/seo-head";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Star } from "lucide-react";
import { getBlogPostsByCategory, type BlogPost } from "@/lib/static-data";
import { AdSlot } from "@/components/common/ad-slot";

export default function MiningGuides() {
  const [filter, setFilter] = useState<string>("all");

  // Use static data instead of API calls
  const posts = getBlogPostsByCategory("Mining Guides");

  const filters = [
    { label: "All Guides", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Setup", value: "setup" },
  ];

  const guideStats = [
    {
      label: "Guides Available",
      value: posts.length,
      color: "text-green-500",
    },
    {
      label: "Avg. Read Time",
      value: `${Math.round(
        posts.reduce((acc, p) => acc + p.readTime, 0) / posts.length
      )} min`,
      color: "text-blue-500",
    },
    {
      label: "Difficulty Levels",
      value: "3",
      color: "text-purple-500",
    },
    {
      label: "Updated",
      value: "Regularly",
      color: "text-orange-500",
    },
  ];

  return (
    <>
      <SEOHead
        title="Bitcoin Mining Guides | Bitcoin Mining Insider"
        description="Comprehensive Bitcoin mining guides for beginners and experts. Step-by-step tutorials, setup instructions, and best practices for successful mining."
        keywords={[
          "bitcoin mining guides",
          "mining tutorials",
          "mining setup",
          "mining for beginners",
          "mining best practices",
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500/10 to-emerald-100 dark:from-green-500/20 dark:to-muted py-16">
        <div className="container-layout">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-6 glow-effect">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mining <span className="text-green-500">Guides</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master Bitcoin mining with our comprehensive guides. From beginner
              tutorials to advanced optimization techniques.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {guideStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
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
          <h2 className="text-3xl font-bold text-foreground">Mining Guides</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <Badge
                key={filterOption.value}
                variant={filter === filterOption.value ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filter === filterOption.value
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-500 hover:text-white"
                }`}
                onClick={() => setFilter(filterOption.value)}
              >
                {filterOption.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
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
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No mining guides found
            </h3>
            <p className="text-muted-foreground">
              We're constantly adding new guides. Check back soon for the latest
              tutorials!
            </p>
          </div>
        )}

        {/* Google AdSense Ad Slot - After Guides Grid */}
        <div className="my-12 flex justify-center">
          <AdSlot label="Banner Ad - After Guides" />
        </div>
      </main>
    </>
  );
}
