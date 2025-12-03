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

interface UseDragAndDropProps {
  moveBlock: (id: string, newPosition: GridPosition) => void;
  blocks: GridCell[][];
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

export function useDragAndDrop({ moveBlock, blocks }: UseDragAndDropProps) {
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

      const targetPosition = parseCellId(over.id as string);

      if (!targetPosition) {
        console.warn(`Invalid cell ID format: ${over.id}`);

        return;
      }

      moveBlock(active.id as string, targetPosition);
    },
    [moveBlock]
  );

  const activeBlock = useMemo(() => {
    if (!activeId) return null;

    return (
      blocks.flat().find((cell): cell is Block => cell?.id === activeId) ?? null
    );
  }, [activeId, blocks]);

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeBlock,
  };
}
