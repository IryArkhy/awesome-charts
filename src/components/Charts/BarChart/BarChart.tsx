import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";

import {
  baseChartOptions,
  createTitleConfig,
  baseTooltipConfig,
  baseXAxisConfig,
  baseYAxisConfig,
  bottomLegendConfig,
} from "../chartConfig";
import type { BarChartData } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: BarChartData;
}

export function BarChart({ data }: BarChartProps) {
  const chartData: ChartData<"bar"> = useMemo(() => {
    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.color,
        borderRadius: 4,
      })),
    };
  }, [data]);

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      ...baseChartOptions,
      plugins: {
        legend: bottomLegendConfig,
        title: createTitleConfig(data.title),
        tooltip: {
          ...baseTooltipConfig,
          callbacks: {
            label: (context) => {
              const y = context.parsed?.y;
              return `${context.dataset.label}: ${
                typeof y === "number" ? y.toLocaleString() : "-"
              }`;
            },
          },
        },
      },
      scales: {
        x: {
          ...baseXAxisConfig,
          stacked: false,
        },
        y: {
          ...baseYAxisConfig,
          stacked: false,
        },
      },
    }),
    [data.title]
  );

  return (
    <Bar
      data={chartData}
      options={options}
      role="img"
      aria-label={data.title}
    />
  );
}
