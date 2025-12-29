import { useParams, Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { BlogCard } from "@/components/blog/blog-card";
import { NewsletterSignup } from "@/components/common/newsletter-signup";
import { ReadingProgress } from "@/components/common/reading-progress";
import { ReadingTimeIndicator } from "@/components/common/reading-time-indicator";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { SEOHead } from "@/components/common/seo-head";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowLeft, Share } from "lucide-react";
import { getBlogPost, getAllBlogPosts, type BlogPost } from "@/lib/static-data";
import { AdSlot } from "@/components/common/ad-slot";
import AdUnit from "@/components/common/AdUnit";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = slug ? getBlogPost(slug) : undefined;
  const allPosts = getAllBlogPosts();

  // Get related posts (same category, excluding current post)
  const relatedPosts = post
    ? allPosts.filter((p) => p.slug !== slug).slice(0, 3)
    : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container-layout py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Bitcoin Mining Insider`}
        description={post.excerpt}
        image={post.imageUrl}
        type="article"
        keywords={post.tags || []}
        author={post.authorName}
        publishedDate={new Date(post.publishedAt).toISOString()}
        readTime={post.readTime}
      />

      <ReadingProgress />
      <ReadingTimeIndicator totalReadTime={post.readTime} />

      <main className="container-layout py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge className="bitcoin-bg text-white border-none">
                {post.category}
              </Badge>
              {post.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.authorName}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <span>•</span>
                <span>
                  {formatDistanceToNow(new Date(post.publishedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="border-t border-border pt-8 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {post.authorName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mining Expert & Technical Writer
                  </div>
                </div>
              </div>

              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </footer>
        </article>

        {/* Newsletter Signup */}
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* Ads must load after primary content */}
        <div className="max-w-4xl mx-auto mt-16">
          <AdUnit client="ca-pub-7632399404847430" slot="5287633032" />
        </div>
      </main>
    </>
  );
}
