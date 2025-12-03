import { useEffect, useRef } from "react";

import { useGrid } from "../context";

import { GridFallback } from "./GridFallback";
import { GridRow } from "./GridRow";
import { GridCell } from "./GridCell";
import "./Grid.css";

export const Grid = () => {
  const { blocks } = useGrid();

  const bottomRef = useRef<HTMLDivElement>(null);
  const prevRowCountRef = useRef(blocks.length);

  useEffect(() => {
    if (blocks.length > prevRowCountRef.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    prevRowCountRef.current = blocks.length;
  }, [blocks.length]);

  if (blocks.length === 0) {
    return <GridFallback />;
  }

  return (
    <div className="grid">
      {blocks.map((row, rowIndex) => (
        <GridRow key={rowIndex}>
          {row.map((cell, colIndex) => (
            <GridCell
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={`${rowIndex}-${colIndex}`}
            />
          ))}
        </GridRow>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
