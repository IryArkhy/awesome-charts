import type { Block } from "../../types";

import { BaseBlock } from "../BaseBlock";

interface LineChartBlockProps {
  block: Block;
}

export const LineChartBlock = ({ block }: LineChartBlockProps) => {
  return (
    <BaseBlock block={block}>
      <div>Line Chart Placeholder</div>
    </BaseBlock>
  );
};
