interface Dataset {
  label: string;
  data: number[];
  color: string;
}

export interface BarChartData {
  title: string;
  labels: string[];
  datasets: Array<Dataset>;
}
