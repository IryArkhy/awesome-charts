import type { PropsWithChildren } from "react";

import "./ChartWrapper.css";

export function ChartWrapper({ children }: PropsWithChildren) {
  return <div className="chart-wrapper">{children}</div>;
}
