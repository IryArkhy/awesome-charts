import { memo } from "react";

import type { Block } from "../../types";

import { BarChartBlock } from "./BarChartBlock";
import { LineChartBlock } from "./LineChartBlock";
import { TextBlock } from "./TextBlock";

interface BlockRendererProps {
  block: Block;
}

export const BlockRenderer = memo(({ block }: BlockRendererProps) => {
  switch (block.type) {
    case "line-chart":
      return <LineChartBlock block={block} />;
    case "bar-chart":
      return <BarChartBlock block={block} />;
    case "text":
      return <TextBlock block={block} />;
    default:
      return null;
  }
});
