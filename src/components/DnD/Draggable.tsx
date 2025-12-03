import { type HTMLAttributes, type PropsWithChildren } from "react";

import { useDraggable } from "@dnd-kit/core";

interface DraggableProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function Draggable({ id, children, ...props }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
