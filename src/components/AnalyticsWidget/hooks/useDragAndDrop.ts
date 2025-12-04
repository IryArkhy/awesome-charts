import { useCallback, useMemo, useState } from "react";
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { Block, GridCell, GridPosition } from "../types";
import { NEW_ROW_DROP_ZONE_ID } from "../components/NewRowPanel";

interface UseDragAndDropOptions {
  moveBlock: (id: string, newPosition: GridPosition) => void;
  moveBlockToNewRowAtEnd: (id: string) => void;
  grid: GridCell[][];
}

function parseCellId(cellId: string): GridPosition | null {
  const parts = cellId.split("-");

  if (parts.length !== 3 || parts[0] !== "cell") {
    return null;
  }

  const row = parseInt(parts[1], 10);
  const col = parseInt(parts[2], 10);

  if (isNaN(row) || isNaN(col)) {
    return null;
  }

  return { row, col };
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
        distance: 8,
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
      grid.flat().find((cell): cell is Block => cell?.id === activeId) ?? null
    );
  }, [activeId, grid]);

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeBlock,
  };
}
