import { DragOverlay as DndOverlay } from "@dnd-kit/core";

import "./DragOverlay.css";

interface DragOverlayProps {
  isShown: boolean;
}

export function DragOverlay({ isShown }: DragOverlayProps) {
  return (
    <DndOverlay>
      {isShown ? (
        <div className="drag-overlay">
          <div className="drag-overlay__content">Dragging...</div>
        </div>
      ) : null}
    </DndOverlay>
  );
}
