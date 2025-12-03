import { Metric } from "./Metric";
import type { BrandMetricsData } from "./types";

import "./BrandMetrics.css";

interface BrandMetricsProps {
  data: BrandMetricsData;
}

export function BrandMetrics({ data }: BrandMetricsProps) {
  return (
    <div className="brand-metrics">
      <div className="brand-metrics__kpi">
        <div className="brand-metrics__label">{data.primaryMetric.label}</div>
        <div className="brand-metrics__value">{data.primaryMetric.value}</div>
        <div
          className={`brand-metrics__change brand-metrics__change--${data.primaryMetric.change.trend}`}
        >
          {data.primaryMetric.change.trend === "positive" ? "↑" : "↓"}{" "}
          {data.primaryMetric.change.value}{" "}
          {data.primaryMetric.change.comparison}
        </div>
      </div>

      <div className="brand-metrics__divider" />

      <div className="brand-metrics__metrics">
        {data.secondaryMetrics.map(({ label, value }) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}
