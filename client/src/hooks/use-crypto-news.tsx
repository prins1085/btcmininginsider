import { useQuery } from "@tanstack/react-query";

export interface LiveNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: number; // unix seconds
}

type CryptoCompareNewsResponse = {
  Data?: Array<{
    id: string | number;
    title: string;
    url: string;
    source: string;
    published_on: number;
    categories?: string;
    tags?: string;
  }>;
};

const KEYWORDS = [
  "bitcoin",
  "btc",
  "mining",
  "miner",
  "hashrate",
  "difficulty",
  "asic",
  "block reward",
  "halving",
];

function matchesKeywords(text: string) {
  const t = text.toLowerCase();
  return KEYWORDS.some((k) => t.includes(k));
}

export function useCryptoNews() {
  return useQuery({
    queryKey: ["live-news", "cryptocompare"],
    queryFn: async (): Promise<LiveNewsItem[]> => {
      const res = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN", {
        headers: { accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch live news");
      }
      const json = (await res.json()) as CryptoCompareNewsResponse;
      const items = (json.Data || [])
        .map((n) => ({
          id: String(n.id),
          title: n.title,
          url: n.url,
          source: n.source,
          publishedAt: n.published_on,
          categories: n.categories || "",
          tags: n.tags || "",
        }))
        .filter((n) => matchesKeywords(`${n.title} ${n.categories} ${n.tags}`))
        .map(({ categories, tags, ...rest }) => rest);

      return items;
    },
    staleTime: 10 * 60 * 1000, // 10 min cache
    refetchInterval: 10 * 60 * 1000,
    retry: 2,
  });
}


