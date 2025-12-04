import { useDroppable, useDndContext } from "@dnd-kit/core";

import { NEW_ROW_DROP_ZONE_ID } from "../../constants";

import "./NewRowPanel.css";

export function NewRowPanel() {
  const { active } = useDndContext();
  const isDragging = active !== null;

  const { setNodeRef, isOver } = useDroppable({
    id: NEW_ROW_DROP_ZONE_ID,
    disabled: !isDragging,
  });

  if (!isDragging) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      className={`new-row-panel ${isOver ? "new-row-panel--over" : ""}`}
    >
      <div className="new-row-panel__content">
        <span className="new-row-panel__icon">+</span>
        <span className="new-row-panel__text">Drop here to add to new row</span>
      </div>
    </div>
  );
}
