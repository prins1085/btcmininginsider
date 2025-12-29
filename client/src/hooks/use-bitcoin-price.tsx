import { useQuery } from "@tanstack/react-query";

interface BitcoinPriceData {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
  };
  chart7d: {
    prices: Array<[number, number]>;
  };
}

export function useBitcoinPrice() {
  return useQuery({
    queryKey: ["bitcoin-price"],
    queryFn: async (): Promise<BitcoinPriceData> => {
      const marketsUrl =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&price_change_percentage=24h";
      const chartUrl =
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7";

      const [marketsRes, chartRes] = await Promise.all([
        fetch(marketsUrl, {
          headers: { accept: "application/json" },
        }),
        fetch(chartUrl, {
          headers: { accept: "application/json" },
        }),
      ]);

      if (!marketsRes.ok) {
        throw new Error("Failed to fetch Bitcoin market data");
      }
      if (!chartRes.ok) {
        throw new Error("Failed to fetch Bitcoin 7-day chart");
      }

      const marketsJson = (await marketsRes.json()) as Array<{
        current_price: number;
        market_cap: number;
        price_change_percentage_24h: number;
      }>;
      const chartJson = (await chartRes.json()) as {
        prices: Array<[number, number]>;
      };

      const item = marketsJson?.[0];
      
      // Ensure prices array exists and has valid data
      const prices = chartJson?.prices || [];
      
      // Log for debugging (remove in production if needed)
      if (prices.length === 0) {
        console.warn("No chart prices data received from API");
      }

      return {
        bitcoin: {
          usd: item?.current_price ?? 0,
          usd_24h_change: item?.price_change_percentage_24h ?? 0,
          usd_market_cap: item?.market_cap ?? 0,
        },
        chart7d: {
          prices: prices,
        },
      };
    },
    retry: 2,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 60000, // Cache for 1 minute
  });
}