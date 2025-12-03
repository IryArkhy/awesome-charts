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
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 12,
            font: {
              size: 11,
            },
            color: "#757575",
            usePointStyle: true,
            pointStyle: "circle" as const,
          },
        },
        title: {
          display: true,
          text: data.title,
          align: "start" as const,
          font: {
            size: 14,
            weight: 500,
          },
          color: "#212121",
          padding: {
            bottom: 16,
          },
        },
        tooltip: {
          backgroundColor: "rgba(33, 33, 33, 0.95)",
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 13,
            weight: 500,
          },
          bodyFont: {
            size: 13,
          },
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
          stacked: false,
          grid: {
            display: false,
          },
          ticks: {
            color: "#757575",
            font: {
              size: 11,
            },
          },
        },
        y: {
          stacked: false,
          beginAtZero: true,
          grid: {
            color: "#f0f0f0",
          },
          ticks: {
            color: "#757575",
            font: {
              size: 11,
            },
            callback: (value: number | string) => {
              if (typeof value === "number") {
                return value >= 1000 ? `${value / 1000}k` : value;
              }
              return value;
            },
          },
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
