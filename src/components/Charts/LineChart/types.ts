interface Dataset {
  label: string;
  data: number[];
}

export interface LineChartData {
  title: string;
  labels: string[];
  dataset: Dataset;
}
