import { type HTMLAttributes, type PropsWithChildren } from "react";

import { useDraggable } from "@dnd-kit/core";

import "./Draggable.css";

interface DraggableProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function Draggable({
  id,
  children,
  className,
  ...props
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        isDragging ? "draggable--dragging" : "draggable--idle"
      }`}
      {...props}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
