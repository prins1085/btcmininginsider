import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { BlogCard } from "@/components/blog/blog-card";
import { SEOHead } from "@/components/common/seo-head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { searchBlogPosts, type BlogPost } from "@/lib/static-data";

export default function Search() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get initial query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const query = params.get("q") || "";
    setSearchQuery(query);
    setDebouncedQuery(query);
  }, [location]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search results
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        const searchResults = searchBlogPosts(debouncedQuery);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL without navigation
    const newUrl = searchQuery.trim()
      ? `/search?q=${encodeURIComponent(searchQuery.trim())}`
      : "/search";
    window.history.replaceState({}, "", newUrl);
  };

  const clearSearch = () => {
    setSearchQuery("");
    window.history.replaceState({}, "", "/search");
  };

  return (
    <>
      <SEOHead
        title={`Search ${
          searchQuery ? `"${searchQuery}"` : ""
        } | Bitcoin Mining Insider`}
        description={`Search Bitcoin mining articles, guides, and reviews${
          searchQuery ? ` for "${searchQuery}"` : ""
        }`}
      />

      <main className="container-layout py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Search Articles
          </h1>
          <p className="text-muted-foreground mb-8">
            Find Bitcoin mining guides, hardware reviews, and industry insights
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for mining guides, hardware reviews, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 py-3 text-lg"
                autoFocus
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Search Results */}
        {debouncedQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Search Results {results.length > 0 && `(${results.length})`}
            </h2>
            <p className="text-muted-foreground">
              Results for "
              <span className="font-semibold">{debouncedQuery}</span>"
            </p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && debouncedQuery && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="bg-muted h-48 rounded mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!isSearching && debouncedQuery && (
          <>
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any articles matching "{debouncedQuery}". Try
                  different keywords or browse our categories.
                </p>
                <Button onClick={clearSearch}>Clear Search</Button>
              </div>
            )}
          </>
        )}

        {/* Popular Searches / Recent Articles */}
        {!debouncedQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Start Searching
            </h3>
            <p className="text-muted-foreground mb-6">
              Enter keywords above to find articles about Bitcoin mining,
              hardware reviews, tutorials, and more.
            </p>

            <div className="max-w-md mx-auto">
              <h4 className="font-semibold text-foreground mb-4">
                Popular Topics:
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Antminer",
                  "Mining Pools",
                  "Profitability",
                  "ASIC",
                  "Hardware",
                  "Setup Guide",
                ].map((topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
