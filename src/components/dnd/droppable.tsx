import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
}

export function Droppable({ children, className, id }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {children}
    </div>
  );
}

