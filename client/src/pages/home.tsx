import { useParams, Link } from "wouter";
import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { TrendingWidget } from "@/components/blog/trending-widget";
import { BitcoinStats } from "@/components/common/bitcoin-stats";
import { NewsletterSignup } from "@/components/common/newsletter-signup";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { SEOHead } from "@/components/common/seo-head";
import { AdSlot } from "@/components/common/ad-slot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getAllBlogPosts,
  getFeaturedBlogPost,
  getBlogPostsByCategory,
  getAllCategories,
  type BlogPost,
} from "@/lib/static-data";
import React from "react";

export default function Home() {
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const currentCategory = params.category || selectedCategory;

  // Use static data instead of API calls
  const featuredPost = getFeaturedBlogPost();
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();

  // Filter posts by category
  const posts =
    currentCategory === "all"
      ? allPosts
      : getBlogPostsByCategory(currentCategory);

  // Reset visibleCount when category changes
  React.useEffect(() => {
    setVisibleCount(6);
  }, [currentCategory]);

  const categoryOptions = [
    { label: "All", value: "all" },
    ...categories.map((cat) => ({ label: cat.name, value: cat.slug })),
  ];

  return (
    <>
      <SEOHead
        title="Bitcoin Mining Insider - Bitcoin Mining News, Guides & Insights"
        description="An educational resource for Bitcoin mining news, hardware context, calculators, and industry insights. Informational only—no financial advice."
        keywords={[
          "bitcoin mining",
          "BTC mining",
          "cryptocurrency",
          "mining hardware",
          "ASIC miners",
          "mining pools",
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--bitcoin))]/10 to-orange-100 dark:from-[hsl(var(--bitcoin))]/20 dark:to-muted py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f89540' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="container-layout relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Master Bitcoin Mining with
                <span className="text-gradient block mt-2">
                  Expert Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stay ahead in the Bitcoin mining game with our comprehensive
                guides, hardware reviews, and real-time profitability analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/mining-guides">
                  <Button className="bitcoin-bg hover:bg-[hsl(var(--bitcoin-dark))] text-white glow-effect w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button
                    variant="outline"
                    className="border-[hsl(var(--bitcoin))] text-[hsl(var(--bitcoin))] hover:bg-[hsl(var(--bitcoin))] hover:text-white transition-all duration-300 w-full sm:w-auto"
                  >
                    Mining Calculator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="floating-animation">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Bitcoin mining facility"
                  className="rounded-xl shadow-2xl w-full h-auto"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-[hsl(var(--bitcoin))] rounded-full flex items-center justify-center pulse-gentle">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <BitcoinStats />

      {/* Main Content */}
      <main className="container-layout py-12">
        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <FeaturedArticle post={featuredPost} />
          </div>
        )}

        {/* Google AdSense Ad Slot - After Featured Article */}
        <div className="my-12 flex justify-center">
          <AdSlot label="Banner Ad - After Featured Content" />
        </div>

        {/* Blog Grid */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-foreground">
              Latest Articles
            </h2>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <Badge
                  key={category.value}
                  variant={
                    currentCategory === category.value ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-colors ${
                    currentCategory === category.value
                      ? "bitcoin-bg text-white"
                      : "hover:bg-[hsl(var(--bitcoin))] hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, visibleCount).map((post, index) => (
              <div
                key={post.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No articles found in this category.
              </p>
            </div>
          )}
        </section>

        {/* Google AdSense Ad Slot - After Blog Grid */}
        <div className="my-12 flex justify-center">
          <AdSlot label="Banner Ad - After Blog Grid" />
        </div>

        {/* Load More Button */}
        {visibleCount < posts.length && (
          <div className="text-center mb-16">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((c) => c + 6)}
            >
              Load More Articles
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Google AdSense Ad Slot - After Newsletter */}
        <div className="my-12 flex justify-center">
          <AdSlot label="Banner Ad - After Newsletter" />
        </div>

        {/* Trending Articles */}
        <TrendingWidget posts={allPosts.slice(0, 5)} />
      </main>
    </>
  );
}
