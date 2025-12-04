import { type Dispatch, type SetStateAction, useCallback } from "react";

import { GRID_COLUMNS } from "../constants";
import type { Block, BlockType, GridCell, GridPosition } from "../types";
import {
  findBlockById,
  findOrCreateEmptyCell,
  generateNewBlock,
  moveBlockInGrid,
  placeBlockInGrid,
  removeBlockById,
} from "../context/utils";

type UseGridOperationsArgs = {
  setGrid: Dispatch<SetStateAction<GridCell[][]>>;
  trimGrid: (grid: GridCell[][]) => GridCell[][];
};

type UseGridOperationsResult = {
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, newPosition: GridPosition) => void;
  moveBlockToNewRowAtEnd: (id: string) => void;
};

export const useGridOperations = ({
  setGrid,
  trimGrid,
}: UseGridOperationsArgs): UseGridOperationsResult => {
  const addBlock = useCallback(
    (type: BlockType) => {
      setGrid((currentGrid) => {
        const { grid: gridWithCapacity, position: emptyCell } =
          findOrCreateEmptyCell(currentGrid);

        const newBlock: Block = generateNewBlock({ ...emptyCell, type });

        return placeBlockInGrid(gridWithCapacity, newBlock, emptyCell);
      });
    },
    [setGrid]
  );

  const removeBlock = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const gridAfterRemoval = removeBlockById(currentGrid, id);

        return trimGrid(gridAfterRemoval);
      });
    },
    [setGrid, trimGrid]
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

        return trimGrid(gridAfterMove);
      });
    },
    [setGrid, trimGrid]
  );

  const moveBlockToNewRowAtEnd = useCallback(
    (id: string) => {
      setGrid((currentGrid) => {
        const blockToMove = findBlockById(currentGrid, id);
        if (!blockToMove) return currentGrid;

        const gridAfterRemoval = removeBlockById(currentGrid, id);
        const trimmedGrid = trimGrid(gridAfterRemoval);

        const newRowIndex = trimmedGrid.length;
        const newRow = Array(GRID_COLUMNS).fill(null);
        newRow[0] = { ...blockToMove, row: newRowIndex, col: 0 };

        return [...trimmedGrid, newRow];
      });
    },
    [setGrid, trimGrid]
  );

  return {
    addBlock,
    removeBlock,
    moveBlock,
    moveBlockToNewRowAtEnd,
  };
};
