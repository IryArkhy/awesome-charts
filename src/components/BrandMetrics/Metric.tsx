interface MetricsProps {
  label: string;
  value: string;
}

export function Metric({ label, value }: MetricsProps) {
  return (
    <div className="text-block__metric">
      <div className="text-block__metric-label">{label}</div>
      <div className="text-block__metric-value">{value}</div>
    </div>
  );
}
