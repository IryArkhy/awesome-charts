import type { Block } from "../../types";

import { BaseBlock } from "../BaseBlock";

interface TextBlockProps {
  block: Block;
}

export const TextBlock = ({ block }: TextBlockProps) => {
  return (
    <BaseBlock block={block}>
      <div>Text Block Placeholder</div>
    </BaseBlock>
  );
};
