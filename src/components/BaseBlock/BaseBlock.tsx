import { useState, type PropsWithChildren } from "react";

import { useGrid } from "../../contexts";
import type { Block } from "../../types";

import { BlockHeader } from "./BlockHeader";
import "./BaseBlock.css";

interface BaseBlockProps extends PropsWithChildren {
  block: Block;
}

export const BaseBlock = ({ block, children }: BaseBlockProps) => {
  const { removeBlock } = useGrid();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    removeBlock(block.id);
  };

  return (
    <div
      className="base-block"
      data-block-id={block.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BlockHeader
        type={block.type}
        showActions={isHovered}
        onDelete={handleDelete}
      />
      <div className="base-block__content">{children}</div>
    </div>
  );
};
