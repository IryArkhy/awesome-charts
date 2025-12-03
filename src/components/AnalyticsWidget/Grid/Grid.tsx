import { useGrid } from "../context";

import { GridFallback } from "./GridFallback";
import { GridRow } from "./GridRow";
import { GridCell } from "./GridCell";
import "./Grid.css";

export const Grid = () => {
  const { blocks } = useGrid();

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
    </div>
  );
};
