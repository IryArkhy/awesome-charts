import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";

import {
  baseChartOptions,
  createTitleConfig,
  baseTooltipConfig,
  baseXAxisConfig,
  baseYAxisConfig,
  hiddenLegendConfig,
  CHART_COLORS,
} from "../chartConfig";

import type { LineChartData } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: LineChartData;
}

export function LineChart({ data }: LineChartProps) {
  const chartData: ChartData<"line"> = useMemo(() => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: data.dataset.label,
          data: data.dataset.data,
          borderColor: CHART_COLORS.primary,
          backgroundColor: CHART_COLORS.primaryWithAlpha,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: CHART_COLORS.primary,
          pointBorderColor: CHART_COLORS.white,
          pointBorderWidth: 2,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      ...baseChartOptions,
      plugins: {
        legend: hiddenLegendConfig,
        title: createTitleConfig(data.title),
        tooltip: {
          ...baseTooltipConfig,
          bodyFont: {
            ...baseTooltipConfig.bodyFont,
            weight: 600,
          },
          callbacks: {
            label: (context) => {
              const y = context.parsed?.y ?? 0;
              return `${y.toLocaleString()} mentions`;
            },
          },
        },
      },
      scales: {
        x: baseXAxisConfig,
        y: baseYAxisConfig,
      },
    }),
    [data.title]
  );

  return (
    <Line
      data={chartData}
      options={options}
      role="img"
      aria-label={data.title}
    />
  );
}
