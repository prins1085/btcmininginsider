import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { SEOHead } from "@/components/common/seo-head";
import { Badge } from "@/components/ui/badge";
import { Newspaper, TrendingUp, Clock, Globe } from "lucide-react";
import { getBlogPostsByCategory, type BlogPost } from "@/lib/static-data";
import { useCryptoNews } from "@/hooks/use-crypto-news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdSlot } from "@/components/common/ad-slot";
import AdUnit from "@/components/common/AdUnit";
import AdsterraNative from "@/components/common/AdsterraNative";

export default function News() {
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Use static data instead of API calls
  const posts = getBlogPostsByCategory("News");
  const { data: liveNews, isLoading: isLiveLoading, error: liveError } =
    useCryptoNews();

  const timeFilters = [
    { label: "All Time", value: "all" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Today", value: "today" },
  ];

  const newsStats = [
    {
      label: "Articles Published",
      value: posts.length,
      icon: Newspaper,
      color: "text-red-500",
    },
    {
      label: "Breaking News",
      value: posts.filter((p) => p.featured).length,
      icon: TrendingUp,
      color: "text-orange-500",
    },
    {
      label: "Avg. Read Time",
      value: `${Math.round(
        posts.reduce((acc, p) => acc + p.readTime, 0) / posts.length
      )} min`,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      label: "Global Coverage",
      value: "24/7",
      icon: Globe,
      color: "text-green-500",
    },
  ];

  return (
    <>
      <SEOHead
        title="Bitcoin Mining News | Bitcoin Mining Insider"
        description="Bitcoin mining news and educational explainers, plus a live headline feed from public sources. Informational only—no financial advice."
        keywords={[
          "bitcoin mining news",
          "crypto news",
          "mining updates",
          "BTC news",
          "blockchain news",
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500/10 to-pink-100 dark:from-red-500/20 dark:to-muted py-16">
        <div className="container-layout">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white mb-6 glow-effect">
              <Newspaper className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mining <span className="text-red-500">News</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay updated with the latest Bitcoin mining news, market
              developments, and industry insights.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {newsStats.map((stat) => (
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
          <h2 className="text-3xl font-bold text-foreground">Latest News</h2>
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <Badge
                key={filter.value}
                variant={timeFilter === filter.value ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  timeFilter === filter.value
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                }`}
                onClick={() => setTimeFilter(filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* News Grid */}
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
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No news articles found
            </h3>
            <p className="text-muted-foreground">
              We're constantly updating our news section. Check back soon for
              the latest developments!
            </p>
          </div>
        )}

        {/* Live headlines (public API). Kept separate from our original content. */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Live Headlines (Public Sources)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Headlines are shown for informational purposes only. We do not
                endorse third-party sources and we do not provide financial
                advice.
              </p>
            </CardHeader>
            <CardContent>
              {isLiveLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading live headlines...
                </p>
              )}
              {liveError && (
                <p className="text-sm text-muted-foreground">
                  Live headlines are temporarily unavailable.
                </p>
              )}
              {!isLiveLoading && !liveError && liveNews?.length ? (
                <ul className="space-y-3">
                  {liveNews.slice(0, 10).map((item: any) => (
                    <li key={item.id} className="text-sm">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground hover:underline"
                      >
                        {item.title}
                      </a>
                      <div className="text-xs text-muted-foreground mt-1">
                        Source: {item.source} •{" "}
                        {new Date(item.publishedAt * 1000).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Ads must load after primary content */}
        <div className="mt-12">
          <AdUnit client="ca-pub-7632399404847430" slot="5287633032" />
          <AdsterraNative />
        </div>
      </main>
    </>
  );
}
