import type { Block } from "../../types";

import { BaseBlock } from "../BaseBlock";

interface BarChartBlockProps {
  block: Block;
}

export const BarChartBlock = ({ block }: BarChartBlockProps) => {
  return (
    <BaseBlock block={block}>
      <div>Bar Chart Placeholder</div>
    </BaseBlock>
  );
};
