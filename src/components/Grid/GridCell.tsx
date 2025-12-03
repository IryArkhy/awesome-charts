import { memo, Suspense } from "react";

import type { GridCell as GridCellType } from "../../types";

import { BlockRenderer } from "../BlockRenderer";
import { LoadingSpinner } from "../LoadingSpinner";

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
          <Suspense fallback={<LoadingSpinner />}>
            <BlockRenderer block={cell} />
          </Suspense>
        </div>
      )}
    </div>
  );
});
