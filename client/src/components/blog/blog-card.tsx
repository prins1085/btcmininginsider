import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

const categoryColors = {
  "Hardware Review": "bg-blue-500",
  "Mining Guides": "bg-green-500",
  "News": "bg-red-500",
  "Analysis": "bg-purple-500",
  "Tutorial": "bg-yellow-500",
};

export function BlogCard({ post }: BlogCardProps) {
  const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || "bg-gray-500";

  return (
    <article className="bg-card rounded-xl shadow-lg overflow-hidden card-hover group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColor} text-white border-none`}>
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
          <Clock className="w-3 h-3" />
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-bold text-foreground mb-3 leading-tight hover:text-[hsl(var(--bitcoin))] transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {post.authorName}
            </span>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-[hsl(var(--bitcoin))] hover:text-[hsl(var(--bitcoin-dark))] text-sm font-semibold transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
