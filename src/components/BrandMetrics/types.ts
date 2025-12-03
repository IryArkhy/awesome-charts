export interface BrandMetricsData {
  primaryMetric: {
    label: string;
    value: string;
    change: {
      value: string;
      trend: "positive" | "negative";
      comparison: string;
    };
  };
  secondaryMetrics: Array<{
    label: string;
    value: string;
  }>;
}
