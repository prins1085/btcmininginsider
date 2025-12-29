import React from "react";
import {
  Bitcoin,
  TrendingUp,
  Zap,
  Shield,
  ArrowUp,
  ArrowDown,
  DollarSign,
} from "lucide-react";
import { useBitcoinPrice } from "@/hooks/use-bitcoin-price";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export function BitcoinStats() {
  const { data: priceData, isLoading, error } = useBitcoinPrice();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatCompactUSD = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    return {
      value: `${isPositive ? "+" : ""}${change.toFixed(2)}%`,
      color: isPositive ? "text-green-500" : "text-red-500",
      icon: isPositive ? ArrowUp : ArrowDown,
    };
  };

  // Process chart data - ensure we have valid data points
  const chartPoints = React.useMemo(() => {
    if (!priceData?.chart7d?.prices || priceData.chart7d.prices.length === 0) {
      return [];
    }

    // Map and process the data
    const processed = priceData.chart7d.prices
      .map(([ts, price]) => {
        if (!ts || !price || isNaN(Number(ts)) || isNaN(Number(price))) {
          return null;
        }
        const timestamp = Number(ts);
        const priceValue = Number(price);
        
        if (timestamp <= 0 || priceValue <= 0) {
          return null;
        }
        
        const date = new Date(timestamp);
        return {
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          timestamp: timestamp,
          price: priceValue,
        };
      })
      .filter((item): item is { date: string; timestamp: number; price: number } => item !== null);

    // Remove duplicates by timestamp and sort
    const unique = Array.from(
      new Map(processed.map((item) => [item.timestamp, item])).values()
    ).sort((a, b) => a.timestamp - b.timestamp);

    // Debug log (can be removed in production)
    if (unique.length > 0) {
      console.log("Chart data points:", unique.length, "First:", unique[0], "Last:", unique[unique.length - 1]);
    }

    return unique;
  }, [priceData?.chart7d?.prices]);

  const stats = [
    {
      icon: Bitcoin,
      label: "BTC Price",
      value: isLoading
        ? "Loading..."
        : error
        ? "N/A"
        : formatPrice(priceData?.bitcoin?.usd || 0),
      color: "text-[hsl(var(--bitcoin))]",
      change: priceData?.bitcoin?.usd_24h_change,
    },
    {
      icon: DollarSign,
      label: "Market Cap",
      value: isLoading
        ? "Loading..."
        : error
        ? "N/A"
        : formatCompactUSD(priceData?.bitcoin?.usd_market_cap || 0),
      color: "text-green-500",
    },
    {
      icon: Zap,
      label: "Mining Difficulty",
      value: "62.46T",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      label: "Next Halving",
      value: "2028",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="bg-card border-b border-border py-8">
      <div className="container-layout">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            const changeData = stat.change ? formatChange(stat.change) : null;
            const ChangeIcon = changeData?.icon;

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {/* Label */}
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {stat.label}
                </div>

                {/* Value with Icon */}
                <div
                  className={`text-xl md:text-2xl font-bold ${stat.color} flex items-center justify-center gap-2`}
                >
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="break-words text-center">{stat.value}</span>
                </div>

                {/* Change Indicator (only for BTC Price) */}
                {changeData && ChangeIcon && (
                  <div
                    className={`text-xs flex items-center justify-center gap-1 ${changeData.color} font-medium`}
                  >
                    <ChangeIcon className="w-3 h-3" />
                    <span>{changeData.value}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 7-Day Price Chart */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              7-Day BTC Price Trend
            </h3>
          </div>

          {isLoading && chartPoints.length === 0 ? (
            <div className="h-64 w-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--bitcoin))] mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">
                  Loading chart data...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="h-64 w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Unable to load chart data. Please try again later.
                </p>
              </div>
            </div>
          ) : chartPoints.length > 0 ? (
            <>
              <div className="h-64 w-full mb-4 relative" style={{ minHeight: "256px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartPoints}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f7931a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f7931a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      stroke="hsl(var(--border))"
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      stroke="hsl(var(--border))"
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `$${(value / 1000).toFixed(0)}k`;
                        }
                        return `$${value.toLocaleString()}`;
                      }}
                      domain={["auto", "auto"]}
                    />
                    <Tooltip
                      formatter={(value: number) => formatPrice(value)}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#f7931a"
                      strokeWidth={5}
                      dot={false}
                      activeDot={{ r: 10, fill: "#f7931a", strokeWidth: 3, stroke: "#fff" }}
                      isAnimationActive={false}
                      connectNulls={true}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ zIndex: 10 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Cryptocurrency data is shown for informational purposes only.
              </p>
            </>
          ) : (
            <div className="h-64 w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  No chart data available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
