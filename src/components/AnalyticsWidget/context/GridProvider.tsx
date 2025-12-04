import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

import { DragOverlay } from "../../DragAndDrop";
import { GRID_COLUMNS } from "../constants";

import type { BlockType, Block, GridCell, GridPosition } from "../types";
import { useDragAndDrop } from "../hooks";

import { GridContext, type GridContextValue } from "./grid-context";
import {
  generateNewBlock,
  findBlockById,
  moveBlockInGrid,
  placeBlockInGrid,
  removeBlockById,
  findOrCreateEmptyCell,
  initializeGrid,
  removeTrailingEmptyRows,
  removeAllEmptyRows,
} from "./utils";

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid(0));
  const [trimEmptyRows, setTrimEmptyRows] = useState(false);

  const removeEmptyRows = (grid: GridCell[][], removeAll: boolean) =>
    removeAll ? removeAllEmptyRows(grid) : removeTrailingEmptyRows(grid);

  const addBlock = useCallback((type: BlockType) => {
    setGrid((currentGrid) => {
      const { grid: gridWithCapacity, position: emptyCell } =
        findOrCreateEmptyCell(currentGrid);

      const newBlock: Block = generateNewBlock({ ...emptyCell, type });

      return placeBlockInGrid(gridWithCapacity, newBlock, emptyCell);
    });
  }, []);

  const removeBlock = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const gridAfterRemoval = removeBlockById(currentGrid, id);

        return removeEmptyRows(gridAfterRemoval, trimEmptyRows);
      });
    },
    [trimEmptyRows]
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

        return removeEmptyRows(gridAfterMove, trimEmptyRows);
      });
    },
    [trimEmptyRows]
  );

  const moveBlockToNewRowAtEnd = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const blockToMove = findBlockById(currentGrid, id);

        if (!blockToMove) return currentGrid;

        const gridAfterRemoval = removeBlockById(currentGrid, id);
        const trimmedGrid = removeEmptyRows(gridAfterRemoval, trimEmptyRows);

        const newRowIndex = trimmedGrid.length;
        const newRow = Array(GRID_COLUMNS).fill(null);
        newRow[0] = { ...blockToMove, row: newRowIndex, col: 0 };

        return [...trimmedGrid, newRow];
      });
    },
    [trimEmptyRows]
  );

  const handleTrimToggle = useCallback((value: boolean) => {
    setTrimEmptyRows(value);

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
      trimEmptyRows,
      setTrimEmptyRows: handleTrimToggle,
    }),
    [grid, addBlock, removeBlock, moveBlock, trimEmptyRows, handleTrimToggle]
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
