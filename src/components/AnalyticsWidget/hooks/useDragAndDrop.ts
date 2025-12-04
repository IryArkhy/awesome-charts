import { useCallback, useMemo, useState } from "react";
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { GridCell, GridPosition } from "../types";
import {
  NEW_ROW_DROP_ZONE_ID,
  CELL_ID_PREFIX,
  CELL_ID_PARTS_COUNT,
  MIN_DRAG_DISTANCE,
} from "../constants";
import { isBlock, isValidPosition } from "../typeGuards";

interface UseDragAndDropOptions {
  moveBlock: (id: string, newPosition: GridPosition) => void;
  moveBlockToNewRowAtEnd: (id: string) => void;
  grid: GridCell[][];
}

function parseCellId(cellId: string): GridPosition | null {
  const parts = cellId.split("-");

  if (parts.length !== CELL_ID_PARTS_COUNT || parts[0] !== CELL_ID_PREFIX) {
    return null;
  }

  const row = parseInt(parts[1], 10);
  const col = parseInt(parts[2], 10);

  const position = { row, col };

  return isValidPosition(position) ? position : null;
}

export function useDragAndDrop({
  moveBlock,
  moveBlockToNewRowAtEnd,
  grid,
}: UseDragAndDropOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: MIN_DRAG_DISTANCE,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);

      if (!over) return;

      const blockId = active.id as string;
      const targetId = over.id as string;

      if (targetId === NEW_ROW_DROP_ZONE_ID) {
        moveBlockToNewRowAtEnd(blockId);
        return;
      }

      const targetPosition = parseCellId(targetId);

      if (!targetPosition) {
        console.warn(`Invalid cell ID format: ${targetId}`);
        return;
      }

      moveBlock(blockId, targetPosition);
    },
    [moveBlock, moveBlockToNewRowAtEnd]
  );

  const activeBlock = useMemo(() => {
    if (!activeId) return null;

    return (
      grid
        .flat()
        .filter(isBlock)
        .find((block) => block.id === activeId) ?? null
    );
  }, [activeId, grid]);

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeBlock,
  };
}
