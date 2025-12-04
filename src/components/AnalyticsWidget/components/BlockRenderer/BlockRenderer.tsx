import { Fragment, memo } from "react";

import type { Block } from "../../types";

import { LineChart, type LineChartData } from "../../../LineChart";
import { BarChart, type BarChartData } from "../../../BarChart";
import { BrandMetrics, type BrandMetricsData } from "../../../BrandMetrics";

import { ChartWrapper } from "./ChartWrapper";
import { DataBlock } from "./DataBlock";

interface BlockRendererProps {
  block: Block;
}

function renderBlock<T>(
  block: Block,
  dataUrl: string,
  Component: React.ComponentType<{ data: T }>,
  Wrapper: React.ComponentType<{ children: React.ReactNode }> = Fragment
) {
  return (
    <DataBlock<T> dataUrl={dataUrl} block={block}>
      {(data) => (
        <Wrapper>
          <Component data={data} />
        </Wrapper>
      )}
    </DataBlock>
  );
}

export const BlockRenderer = memo(({ block }: BlockRendererProps) => {
  switch (block.type) {
    case "line-chart":
      return renderBlock<LineChartData>(
        block,
        "/data/lineChartData.json",
        LineChart,
        ChartWrapper
      );

    case "bar-chart":
      return renderBlock<BarChartData>(
        block,
        "/data/barChartData.json",
        BarChart,
        ChartWrapper
      );

    case "text":
      return renderBlock<BrandMetricsData>(
        block,
        "/data/textBlockData.json",
        BrandMetrics
      );

    default:
      return null as never;
  }
});
