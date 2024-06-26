import React, { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Draggable } from './draggable'
import { Droppable } from './droppable'

export function DropZone() {
	const [isDropped, setIsDropped] = useState(false)
	const draggableMarkup = (
		<Draggable className='rounded-lg bg-red-400 p-4'>Drag me</Draggable>
	)

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex items-center gap-4'>
				{!isDropped ? draggableMarkup : null}
				<Droppable className='border-red h-[300px] w-[300px] items-center justify-center rounded-md border-dashed border-black bg-gray-100 p-4'>
					{isDropped ? draggableMarkup : 'Drop here'}
				</Droppable>
			</div>
		</DndContext>
	)

	function handleDragEnd(event: DragEndEvent) {
		if (event.over && event.over.id === 'droppable') {
			setIsDropped(true)
		}
	}
}
