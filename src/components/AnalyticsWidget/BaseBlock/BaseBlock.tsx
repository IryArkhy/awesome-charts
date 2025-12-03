import { useState, type PropsWithChildren } from "react";

import type { Block } from "../../../types";

import { Draggable } from "../../DragAndDrop";

import { useGrid } from "../context";

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
    <Draggable
      id={block.id}
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
    </Draggable>
  );
};
