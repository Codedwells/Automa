import React, { useState } from 'react'
import { v4 } from 'uuid'
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Draggable } from './draggable'
import { Droppable } from './droppable'
import { SortableItem } from './sortable-item'
import { Play } from 'lucide-react'

type TDraggableItems = { name: string; id: UniqueIdentifier; image: string }

const defaultDraggables: TDraggableItems[] = [
	{ name: 'send email', id: v4(), image: '/email.svg' },
	{ name: 'make api call', id: v4(), image: '/logo.png' },
	{ name: 'send notification', id: v4(), image: '/notification.png' },
	{ name: 'write to database', id: v4(), image: '/database.png' }
]

export function DropZone() {
	const [items, setItems] = useState<TDraggableItems[]>([])
	const [draggables, setDraggables] =
		useState<TDraggableItems[]>(defaultDraggables)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 50
			}
		})
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event

		if (
			over &&
			over.id === 'dropzone' &&
			!items.some((item) => item.id === active.id)
		) {
			let item = draggables.find((item) => item.id === active.id)!

			setItems((prev) => [
				...prev,
				{ name: item.name, id: v4(), image: item.image }
			])
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

	// Handle remove item
	const handleRemove = (id: UniqueIdentifier) => {
		setItems((prev) => prev.filter((item) => item.id !== id))
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<div className='flex h-full w-full flex-1 flex-row items-start gap-4'>
				<div className='flex h-[91vh]  flex-col gap-2 py-2'>
					<div className='my-2'>
						<p className='text-lg font-semibold'>Workflows</p>
						<p className='-mt-1 text-xs text-gray-600'>
							Simplifed automation workflows
						</p>
					</div>
					{draggables.map((item) => (
						<Draggable
							key={v4()}
							id={String(item.id)}
							image={item.image}
							className=''
						>
							{item.name}
						</Draggable>
					))}
				</div>

				<Droppable
					id='dropzone'
					className='my-4 ml-8 h-fit min-h-[80vh] w-[300px] items-center justify-center rounded-md border border-dashed border-black bg-gray-50'
				>
					<div className='flex items-center justify-between border-b p-3'>
						<div className='flex flex-col'>
							<p className='text-lg font-semibold'>
								Workflows Stacks
							</p>
							<p className='-mt-1 text-xs text-gray-600'>
								Arrange your workflows here
							</p>
						</div>
						<button className='flex rounded bg-green-600 p-2 text-white hover:opacity-80 active:opacity-60'>
							<Play size={22} className='hover:animate-pulse' />{' '}
							Run
						</button>
					</div>

					<SortableContext
						items={items}
						strategy={verticalListSortingStrategy}
					>
						<div className='space-y-2 p-3'>
							{items.map((item) => (
								<SortableItem
									key={v4()}
									image={item.image}
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
