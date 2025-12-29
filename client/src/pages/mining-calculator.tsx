import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/common/seo-head";
import { Calculator, TrendingUp, Zap, DollarSign, Bitcoin } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/use-bitcoin-price";
import { AdSlot } from "@/components/common/ad-slot";
import AdUnit from "@/components/common/AdUnit";

interface CalculatorInputs {
  hashrate: string;
  powerConsumption: string;
  electricityCost: string;
  hardwareCost: string;
  poolFee: string;
}

interface CalculatorResults {
  dailyRevenue: number;
  dailyCost: number;
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  roi: number;
  breakEvenDays: number;
}

export default function MiningCalculator() {
  const { data: priceData } = useBitcoinPrice();
  const btcPrice = priceData?.bitcoin?.usd || 45000;
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hashrate: "100",
    powerConsumption: "3000",
    electricityCost: "0.12",
    hardwareCost: "5000",
    poolFee: "2.5",
  });

  const [results, setResults] = useState<CalculatorResults>({
    dailyRevenue: 0,
    dailyCost: 0,
    dailyProfit: 0,
    monthlyProfit: 0,
    yearlyProfit: 0,
    roi: 0,
    breakEvenDays: 0,
  });

  // Bitcoin network parameters (approximate)
  const networkHashrate = 500; // EH/s
  const blockReward = 6.25; // BTC per block
  const blocksPerDay = 144; // 6 blocks per hour * 24 hours

  const calculateProfitability = () => {
    const hashrate = parseFloat(inputs.hashrate) || 0;
    const powerConsumption = parseFloat(inputs.powerConsumption) || 0;
    const electricityCost = parseFloat(inputs.electricityCost) || 0;
    const hardwareCost = parseFloat(inputs.hardwareCost) || 0;
    const poolFee = parseFloat(inputs.poolFee) || 0;

    if (hashrate <= 0 || powerConsumption <= 0 || electricityCost <= 0) {
      return;
    }

    // Calculate daily Bitcoin mined
    const dailyBTC =
      (hashrate / (networkHashrate * 1000000)) * blockReward * blocksPerDay;

    // Apply pool fee
    const dailyBTCAfterFee = dailyBTC * (1 - poolFee / 100);

    // Calculate revenue and costs
    const dailyRevenue = dailyBTCAfterFee * btcPrice;
    const dailyCost = (powerConsumption / 1000) * electricityCost * 24;
    const dailyProfit = dailyRevenue - dailyCost;

    // Calculate other metrics
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;
    const roi = hardwareCost > 0 ? (yearlyProfit / hardwareCost) * 100 : 0;
    const breakEvenDays =
      hardwareCost > 0 && dailyProfit > 0 ? hardwareCost / dailyProfit : 0;

    setResults({
      dailyRevenue,
      dailyCost,
      dailyProfit,
      monthlyProfit,
      yearlyProfit,
      roi,
      breakEvenDays,
    });
  };

  useEffect(() => {
    calculateProfitability();
  }, [inputs, btcPrice]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatBTC = (amount: number) => {
    return `${amount.toFixed(8)} BTC`;
  };

  const presetConfigurations = [
    {
      name: "Antminer S19 XP",
      hashrate: "140",
      powerConsumption: "3010",
      hardwareCost: "3500",
    },
    {
      name: "Antminer S19j Pro",
      hashrate: "104",
      powerConsumption: "3068",
      hardwareCost: "2800",
    },
    {
      name: "Whatsminer M50",
      hashrate: "126",
      powerConsumption: "3276",
      hardwareCost: "3200",
    },
  ];

  const applyPreset = (preset: (typeof presetConfigurations)[0]) => {
    setInputs((prev) => ({
      ...prev,
      hashrate: preset.hashrate,
      powerConsumption: preset.powerConsumption,
      hardwareCost: preset.hardwareCost,
    }));
  };

  return (
    <>
      <SEOHead
        title="Bitcoin Mining Cost & Output Estimator | Bitcoin Mining Insider"
        description="Estimate Bitcoin mining outputs and operating costs using public market data and simplified assumptions. Educational only—no financial advice."
        keywords={[
          "bitcoin mining calculator",
          "mining estimation",
          "mining costs",
          "hashrate",
          "electricity cost",
          "mining costs",
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500/10 to-indigo-100 dark:from-purple-500/20 dark:to-muted py-16">
        <div className="container-layout">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 text-white mb-6 glow-effect">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mining <span className="text-purple-500">Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore how different inputs (hashrate, power, electricity rate)
              affect estimated outputs and operating costs.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Real-time BTC price: {formatCurrency(btcPrice)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Network difficulty: 62.46T</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-layout py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Mining Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hashrate">Hashrate (TH/s)</Label>
                    <Input
                      id="hashrate"
                      type="number"
                      value={inputs.hashrate}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          hashrate: e.target.value,
                        }))
                      }
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="powerConsumption">Power (W)</Label>
                    <Input
                      id="powerConsumption"
                      type="number"
                      value={inputs.powerConsumption}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          powerConsumption: e.target.value,
                        }))
                      }
                      placeholder="3000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="electricityCost">
                      Electricity Cost ($/kWh)
                    </Label>
                    <Input
                      id="electricityCost"
                      type="number"
                      step="0.01"
                      value={inputs.electricityCost}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          electricityCost: e.target.value,
                        }))
                      }
                      placeholder="0.12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hardwareCost">Hardware Cost ($)</Label>
                    <Input
                      id="hardwareCost"
                      type="number"
                      value={inputs.hardwareCost}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          hardwareCost: e.target.value,
                        }))
                      }
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="poolFee">Pool Fee (%)</Label>
                  <Input
                    id="poolFee"
                    type="number"
                    step="0.1"
                    value={inputs.poolFee}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        poolFee: e.target.value,
                      }))
                    }
                    placeholder="2.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preset Configurations */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {presetConfigurations.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="justify-start"
                      onClick={() => applyPreset(preset)}
                    >
                      <Bitcoin className="w-4 h-4 mr-2" />
                      {preset.name} ({preset.hashrate} TH/s)
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

            {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Estimates (educational)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.dailyProfit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated Net (Daily)
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.monthlyProfit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated Net (Monthly)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(results.yearlyProfit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated Net (Yearly)
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {results.roi.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Payback Ratio (Simplified)
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Daily Revenue:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(results.dailyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Cost:</span>
                    <span className="font-medium">
                      {formatCurrency(results.dailyCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payback Time (Days):
                    </span>
                    <span className="font-medium">
                      {results.breakEvenDays.toFixed(0)} days
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Badge
                    variant={
                      results.dailyProfit > 0 ? "default" : "destructive"
                    }
                    className="w-full justify-center"
                  >
                    {results.dailyProfit > 0
                      ? "Estimated net positive (not a guarantee)"
                      : "Estimated net negative (not a guarantee)"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  This calculator provides estimates based on current network
                  conditions and Bitcoin price. Actual results may vary due to
                  network difficulty changes, price fluctuations, and other
                  factors. Use these estimates to support educational
                  understanding only.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google AdSense Ad Slot - After Calculator Content */}
        <div className="my-12 flex justify-center">
          <AdUnit client="ca-pub-7632399404847430" slot="5287633032" />
        </div>
      </main>
    </>
  );
}
