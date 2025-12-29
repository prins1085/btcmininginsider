import { Link } from "wouter";
import { TrendingUp } from "lucide-react";
import type { BlogPost } from "@/lib/static-data";

interface TrendingWidgetProps {
  posts: BlogPost[];
}

export function TrendingWidget({ posts }: TrendingWidgetProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">Trending Articles</h2>
      </div>

      <div className="space-y-4">
        {posts.slice(0, 5).map((post, index) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group cursor-pointer">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                    index === 0 ? "bg-orange-500" : "bg-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.readTime} min read
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
