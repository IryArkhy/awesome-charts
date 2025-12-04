import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

import { DragOverlay } from "../../DragAndDrop";

import type { BlockType, Block, GridCell, GridPosition } from "../types";
import { useDragAndDrop } from "../hooks";

import { GridContext, type GridContextValue } from "./grid-context";
import {
  generateNewBlock,
  findBlockById,
  moveBlockInGrid,
  placeBlockInGrid,
  removeBlockById,
  ensureGridCapacity,
  initializeGrid,
  removeTrailingEmptyRows,
  removeAllEmptyRows,
} from "./utils";

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid(0));
  const [autoTrimEmptyRows, setAutoTrimEmptyRows] = useState(false);

  const trimEmptyRows = (grid: GridCell[][], removeAll: boolean) =>
    removeAll ? removeAllEmptyRows(grid) : removeTrailingEmptyRows(grid);

  const addBlock = useCallback((type: BlockType) => {
    setGrid((currentGrid) => {
      const { gridWithCapacity, emptyCell } = ensureGridCapacity(currentGrid);
      const newBlock: Block = generateNewBlock({ ...emptyCell, type });

      return placeBlockInGrid(gridWithCapacity, newBlock, emptyCell);
    });
  }, []);

  const removeBlock = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const gridAfterRemoval = removeBlockById(currentGrid, id);

        return trimEmptyRows(gridAfterRemoval, autoTrimEmptyRows);
      });
    },
    [autoTrimEmptyRows]
  );

  const moveBlock = useCallback(
    (id: string, newPosition: GridPosition) => {
      setGrid((currentGrid) => {
        const blockToMove = findBlockById(currentGrid, id);

        if (!blockToMove) return currentGrid;

        const targetCell = currentGrid[newPosition.row]?.[newPosition.col];
        if (targetCell !== null) return currentGrid;

        const gridAfterMove = moveBlockInGrid(
          currentGrid,
          id,
          blockToMove,
          newPosition
        );

        return trimEmptyRows(gridAfterMove, autoTrimEmptyRows);
      });
    },
    [autoTrimEmptyRows]
  );

  const moveBlockToNewRowAtEnd = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const blockToMove = findBlockById(currentGrid, id);

        if (!blockToMove) return currentGrid;

        const gridAfterRemoval = removeBlockById(currentGrid, id);
        const trimmedGrid = trimEmptyRows(gridAfterRemoval, autoTrimEmptyRows);

        const newRowIndex = trimmedGrid.length;
        const newRow = Array(3).fill(null);
        newRow[0] = { ...blockToMove, row: newRowIndex, col: 0 };

        return [...trimmedGrid, newRow];
      });
    },
    [autoTrimEmptyRows]
  );

  const handleAutoTrimToggle = useCallback((value: boolean) => {
    setAutoTrimEmptyRows(value);

    if (value) {
      setGrid((current) => removeAllEmptyRows(current));
    }
  }, []);

  const { sensors, handleDragStart, handleDragEnd, activeBlock } =
    useDragAndDrop({
      moveBlock,
      moveBlockToNewRowAtEnd,
      grid,
    });

  const value: GridContextValue = useMemo(
    () => ({
      grid,
      addBlock,
      removeBlock,
      moveBlock,
      autoTrimEmptyRows,
      setAutoTrimEmptyRows: handleAutoTrimToggle,
    }),
    [
      grid,
      addBlock,
      removeBlock,
      moveBlock,
      autoTrimEmptyRows,
      handleAutoTrimToggle,
    ]
  );

  return (
    <GridContext.Provider value={value}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        <DragOverlay isShown={Boolean(activeBlock)} />
      </DndContext>
    </GridContext.Provider>
  );
};
