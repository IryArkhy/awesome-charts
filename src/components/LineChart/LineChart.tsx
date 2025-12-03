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
          borderColor: "#60ca23",
          backgroundColor: "rgba(96, 202, 35, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#60ca23",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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
            size: 14,
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
        x: {
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
    <Line
      data={chartData}
      options={options}
      role="img"
      aria-label={data.title}
    />
  );
}
