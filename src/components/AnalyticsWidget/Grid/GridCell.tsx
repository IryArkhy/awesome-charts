import { memo, Suspense } from "react";

import type { GridCell as GridCellType } from "../../../types";

import { LoadingSpinner } from "../../LoadingSpinner";
import { Droppable } from "../../DragAndDrop/Droppable";

import { BlockRenderer } from "../BlockRenderer";

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  cell: GridCellType;
}

export const GridCell = memo(({ rowIndex, colIndex, cell }: GridCellProps) => {
  return (
    <Droppable
      id={`cell-${rowIndex}-${colIndex}`}
      disabled={cell !== null}
      data-row={rowIndex}
      data-col={colIndex}
    >
      {cell && (
        <div className="grid__block droppable-target">
          <Suspense fallback={<LoadingSpinner />}>
            <BlockRenderer block={cell} />
          </Suspense>
        </div>
      )}
    </Droppable>
  );
});
