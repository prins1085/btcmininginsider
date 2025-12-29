import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedDate?: string;
  readTime?: number;
}

export function SEOHead({
  title,
  description,
  image = "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  url = window.location.href,
  type = "website",
  keywords = [],
  author,
  publishedDate,
  readTime,
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Create or update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Basic meta tags
    updateMetaName("description", description);
    updateMetaName("robots", "index,follow");
    if (keywords.length > 0) {
      updateMetaName("keywords", keywords.join(", "));
    }

    // Canonical
    updateLinkTag("canonical", url);

    // Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", "Bitcoin Mining Insider");

    // Twitter Card tags
    updateMetaName("twitter:card", "summary_large_image");
    updateMetaName("twitter:title", title);
    updateMetaName("twitter:description", description);
    updateMetaName("twitter:image", image);

    // Article-specific tags
    if (author) {
      updateMetaName("author", author);
      updateMetaTag("article:author", author);
    }

    if (publishedDate) {
      updateMetaTag("article:published_time", publishedDate);
    }

    // Structured data for articles
    if (type === "article" && author && publishedDate) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: image,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          name: "Bitcoin Mining Insider",
        },
        datePublished: publishedDate,
        url: url,
      };

      let script = document.querySelector(
        "#structured-data"
      ) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [
    title,
    description,
    image,
    url,
    type,
    keywords,
    author,
    publishedDate,
    readTime,
  ]);

  return null;
}
