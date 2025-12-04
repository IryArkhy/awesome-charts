import { useMemo, useState, type PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

import { DragOverlay } from "../../DragAndDrop";

import type { GridCell } from "../types";
import { useDragAndDrop, useGridOperations, useGridTrimming } from "../hooks";

import { GridContext, type GridContextValue } from "./grid-context";
import { initializeGrid } from "./utils";

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid(0));

  const { trimEmptyRows, trimGrid, handleTrimToggle } = useGridTrimming({
    setGrid,
  });

  const { addBlock, removeBlock, moveBlock, moveBlockToNewRowAtEnd } =
    useGridOperations({
      setGrid,
      trimGrid,
    });

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
