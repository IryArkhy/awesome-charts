export const CHART_COLORS = {
  primary: "#60ca23",
  primaryWithAlpha: "rgba(96, 202, 35, 0.1)",
  textPrimary: "#212121",
  textSecondary: "#757575",
  white: "#fff",
  tooltipBackground: "rgba(33, 33, 33, 0.95)",
  gridLine: "#f0f0f0",
} as const;

export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

export const createTitleConfig = (title: string) => ({
  display: true,
  text: title,
  align: "start" as const,
  font: {
    size: 14,
    weight: 500,
  },
  color: CHART_COLORS.textSecondary,
  padding: {
    bottom: 16,
  },
});

export const baseTooltipConfig = {
  backgroundColor: CHART_COLORS.tooltipBackground,
  padding: 12,
  cornerRadius: 8,
  titleFont: {
    size: 13,
    weight: 500,
  },
  bodyFont: {
    size: 13,
  },
};

export const baseXAxisConfig = {
  grid: {
    display: false,
  },
  ticks: {
    color: CHART_COLORS.textSecondary,
    font: {
      size: 11,
    },
  },
};

export const baseYAxisConfig = {
  beginAtZero: true,
  grid: {
    color: CHART_COLORS.gridLine,
  },
  ticks: {
    color: CHART_COLORS.textSecondary,
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
};

export const bottomLegendConfig = {
  display: true,
  position: "bottom" as const,
  labels: {
    boxWidth: 12,
    boxHeight: 12,
    padding: 12,
    font: {
      size: 11,
    },
    color: CHART_COLORS.textSecondary,
    usePointStyle: true,
    pointStyle: "circle" as const,
  },
};

export const hiddenLegendConfig = {
  display: false,
};
