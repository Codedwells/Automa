import React, { useState } from 'react'
import { v4 } from 'uuid'
import {
	DndContext,
	DragEndEvent,
	UniqueIdentifier,
	closestCenter
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Draggable } from './draggable'
import { Droppable } from './droppable'
import { SortableItem } from './sortable-item'

type TDraggableItems = { name: string; id: UniqueIdentifier }

const defaultDraggables: TDraggableItems[] = [
	{ name: 'make-api-call', id: v4() },
	{ name: 'send-email', id: v4() },
	{ name: 'send-notification', id: v4() },
	{ name: 'write-to-database', id: v4() }
]

export function DropZone() {
	const [items, setItems] = useState<TDraggableItems[]>([])
	const [draggables, setDraggables] =
		useState<TDraggableItems[]>(defaultDraggables)

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event

		if (
			over &&
			over.id === 'dropzone' &&
			!items.some((item) => item.id === active.id)
		) {
			let item = draggables.find((item) => item.id === active.id)!

			setItems((prev) => [...prev, { name: item.name, id: v4() }])
		} else if (over && over.id !== 'dropzone') {
			setItems((prev) => {
				const oldIndex = prev.indexOf(
					items.find((item) => item.id === active.id)!
				)
				const newIndex = prev.indexOf(
					items.find((item) => item.id === over.id)!
				)
				return arrayMove(prev, oldIndex, newIndex)
			})
		}
	}

	const handleRemove = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id))
	}

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<div className='flex items-start gap-4'>
				<div className='flex flex-col gap-2'>
					{draggables.map((item) => (
						<Draggable
							key={v4()}
							id={String(item.id)}
							className='rounded-lg bg-red-400 p-4'
						>
							{item.name}
						</Draggable>
					))}
				</div>
				<Droppable
					id='dropzone'
					className='border-red h-[300px] w-[300px] items-center justify-center rounded-md border-dashed border-black bg-gray-100 p-4'
				>
					<SortableContext
						items={items}
						strategy={verticalListSortingStrategy}
					>
						<div className='space-y-2'>
							{items.map((item) => (
								<SortableItem
									key={v4()}
									id={String(item.id)}
									name={item.name}
									onRemove={handleRemove}
								/>
							))}
						</div>
					</SortableContext>
				</Droppable>
			</div>
		</DndContext>
	)
}
