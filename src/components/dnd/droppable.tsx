import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

type DroppableProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
}

export function Droppable({ children, className, id }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={cn({"!bg-green-100":isOver},className)}>
      {children}
    </div>
  );
}

