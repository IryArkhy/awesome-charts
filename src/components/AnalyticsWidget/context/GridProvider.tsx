import { useCallback, useState, type PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

import {
  ensureGridCapacity,
  initializeGrid,
  removeTrailingEmptyRows,
  removeAllEmptyRows,
} from "../../../utils";
import type { BlockType, Block, GridCell, GridPosition } from "../../../types";
import { useDragAndDrop } from "../../../hooks";
import { DragOverlay } from "../../DragAndDrop";

import { GridContext, type GridContextValue } from "./grid-context";
import {
  generateNewBlock,
  findBlockById,
  moveBlockInGrid,
  placeBlockInGrid,
} from "./utils";

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [blocks, setBlocks] = useState<GridCell[][]>(() => initializeGrid(0));
  const [removeEmptyRows, setRemoveEmptyRows] = useState(false);

  const addBlock = useCallback((type: BlockType) => {
    setBlocks((currentBlocks) => {
      const { gridWithCapacity, emptyCell } = ensureGridCapacity(currentBlocks);

      const newBlock: Block = generateNewBlock({ ...emptyCell, type });

      return placeBlockInGrid(gridWithCapacity, newBlock, emptyCell);
    });
  }, []);

  const removeBlock = useCallback(
    (id: string) => {
      setBlocks((currentBlocks) => {
        const gridAfterRemoval = currentBlocks.map((row) =>
          row.map((cell) => (cell?.id === id ? null : cell))
        );

        return removeEmptyRows
          ? removeAllEmptyRows(gridAfterRemoval)
          : removeTrailingEmptyRows(gridAfterRemoval);
      });
    },
    [removeEmptyRows]
  );

  const moveBlock = useCallback(
    (id: string, newPosition: GridPosition) => {
      setBlocks((currentBlocks) => {
        const blockToMove = findBlockById(currentBlocks, id);

        if (!blockToMove) return currentBlocks;

        const targetCell = currentBlocks[newPosition.row]?.[newPosition.col];
        if (targetCell !== null) return currentBlocks;

        const gridAfterMove = moveBlockInGrid(
          currentBlocks,
          id,
          blockToMove,
          newPosition
        );

        return removeEmptyRows
          ? removeAllEmptyRows(gridAfterMove)
          : removeTrailingEmptyRows(gridAfterMove);
      });
    },
    [removeEmptyRows]
  );

  function changeRemoveEmptyRows(value: boolean) {
    setRemoveEmptyRows(value);

    if (value) {
      setBlocks((current) => removeAllEmptyRows(current));
    }
  }

  const { sensors, handleDragStart, handleDragEnd, activeBlock } =
    useDragAndDrop({
      moveBlock,
      blocks,
    });

  const value: GridContextValue = {
    blocks,
    addBlock,
    removeBlock,
    moveBlock,
    removeEmptyRows,
    changeRemoveEmptyRows,
  };

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
