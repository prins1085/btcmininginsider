import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-foreground mb-8 fade-in-up">Featured Article</h2>
      <div className="bg-card rounded-xl shadow-lg overflow-hidden card-hover group glow-effect">
        <div className="grid md:grid-cols-2 gap-0">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bitcoin-bg text-white border-none pulse-gentle">
                  Featured
                </Badge>
              </div>
            </div>
          </Link>
          
          <div className="p-8">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <span>{post.category}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min read</span>
              </div>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
            </div>
            
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight hover:text-[hsl(var(--bitcoin))] transition-colors">
                {post.title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {post.authorName}
                </span>
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-[hsl(var(--bitcoin))] hover:text-[hsl(var(--bitcoin-dark))] font-semibold transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
