import { Fragment, memo } from "react";

import { API_URLS } from "../../../../utils";

import { LineChart, type LineChartData } from "../../../LineChart";
import { BarChart, type BarChartData } from "../../../BarChart";
import { BrandMetrics, type BrandMetricsData } from "../../../BrandMetrics";

import type { Block } from "../../types";

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
        API_URLS.GET.lineChart,
        LineChart,
        ChartWrapper
      );

    case "bar-chart":
      return renderBlock<BarChartData>(
        block,
        API_URLS.GET.barChart,
        BarChart,
        ChartWrapper
      );

    case "text":
      return renderBlock<BrandMetricsData>(
        block,
        API_URLS.GET.brandMetrics,
        BrandMetrics
      );

    default:
      return null as never;
  }
});
