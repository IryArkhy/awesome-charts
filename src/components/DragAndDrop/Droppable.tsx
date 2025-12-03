import { type HTMLAttributes, type PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

import "./Droppable.css";

interface DroppableProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  id: string;
  disabled: boolean;
}

export function Droppable({
  id,
  disabled,
  children,
  ...props
}: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={`droppable ${isOver ? "droppable--over" : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
