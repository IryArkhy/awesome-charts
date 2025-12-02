import { memo } from "react";

import type { GridCell as GridCellType } from "../../types";

import { BlockRenderer } from "../blocks";

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  cell: GridCellType;
}

export const GridCell = memo(({ rowIndex, colIndex, cell }: GridCellProps) => {
  return (
    <div className="grid__cell" data-row={rowIndex} data-col={colIndex}>
      {cell && (
        <div className="grid__block">
          <BlockRenderer block={cell} />
        </div>
      )}
    </div>
  );
});
