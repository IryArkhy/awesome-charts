interface MetricsProps {
  label: string;
  value: string;
}

export function Metric({ label, value }: MetricsProps) {
  return (
    <div className="brand-metrics__metric">
      <div className="brand-metrics__metric-label">{label}</div>
      <div className="brand-metrics__metric-value">{value}</div>
    </div>
  );
}
