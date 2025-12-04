import { useEffect, useRef } from "react";

import { useGrid, countRowEmptyCells } from "../../context";

import { NewRowPanel } from "../NewRowPanel";

import { GridFallback } from "./GridFallback";
import { GridRow } from "./GridRow";
import { GridCell } from "./GridCell";
import "./Grid.css";

export const Grid = () => {
  const { grid } = useGrid();

  const bottomRef = useRef<HTMLDivElement>(null);
  const prevRowCountRef = useRef(grid.length);

  useEffect(() => {
    if (grid.length > prevRowCountRef.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    prevRowCountRef.current = grid.length;
  }, [grid.length]);

  if (grid.length === 0) {
    return <GridFallback />;
  }

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <GridRow key={rowIndex}>
          {row.map((cell, colIndex) => (
            // TODO: min-width for the cells so they dont shrink and hide the content
            <GridCell
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={`${rowIndex}-${colIndex}`}
            />
          ))}
        </GridRow>
      ))}
      {countRowEmptyCells(grid[grid.length - 1]) <= 1 && <NewRowPanel />}
      <div ref={bottomRef} />
    </div>
  );
};
