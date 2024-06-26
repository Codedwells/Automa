import React, { useState } from 'react'
import { v4 } from 'uuid'
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Draggable } from './draggable'
import { Droppable } from './droppable'
import { SortableItem } from './sortable-item'
import { Loader, Play } from 'lucide-react'
import {
	TSortableItems,
	useSortableItemsStore
} from '../store/sortable-items-store'
import { useDraggableItemsStore } from '../store/draggable-items-store'
import { TLogItem, runWorkflows } from '@/lib/workflows'
import { cn } from '@/lib/utils'

export function DropZone() {
	const [running, setRunning] = useState(false)
	const { draggableItems } = useDraggableItemsStore()
	const { sortableItems, handleRemove, handleDragEnd } =
		useSortableItemsStore()
	const [logs, setLogs] = useState<TLogItem[]>([])

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 50
			}
		})
	)

	const handleDragEnded = (event: DragEndEvent) => {
		handleDragEnd(event, draggableItems as TSortableItems[])
	}

	const handleWorkflows = async () => {
		setRunning(true)
		const logs = await runWorkflows(sortableItems)
		setLogs(logs)
		setRunning(false)
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnded}
		>
			<div className='flex h-full w-full flex-1 flex-row items-start gap-4'>
				<div className='flex h-[91vh]  flex-col gap-2 py-2'>
					<div className='my-2'>
						<p className='text-lg font-semibold'>Workflows</p>
						<p className='-mt-1 text-xs text-gray-600'>
							Simplifed automation workflows
						</p>
					</div>
					{draggableItems.map((item) => (
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

				<div className='flex gap-8'>
					<Droppable
						id='dropzone'
						className='my-4 ml-8 h-fit min-h-[80vh] w-[500px] items-center justify-center rounded-md border border-dashed border-black bg-gray-50'
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
							<button
								onClick={handleWorkflows}
								className='flex rounded bg-green-600 p-2 text-white hover:opacity-80 active:opacity-60'
							>
								<Play
									size={22}
									className='hover:animate-pulse'
								/>{' '}
								Run
							</button>
						</div>

						<SortableContext
							items={sortableItems}
							strategy={verticalListSortingStrategy}
						>
							<div className='space-y-2 p-3'>
								{sortableItems.map((item) => (
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

					<div className='mt-2 flex-1 rounded border max-w-lg overflow-hidden bg-slate-50'>
						<div className='flex flex-col border-b p-2'>
							<p className='text-lg font-semibold'>
								Run the workflows
							</p>
							<p className='-mt-1 text-xs text-gray-600'>
								Log the results of the workflows
							</p>
						</div>
                        <div className={cn("hidden p-4 rounded",{"flex":running})}>
                           <Loader className='animate-spin'/> running ...
                        </div>
						<div>
							{logs.map((log, index) => {
								return (
									<div
										key={index}
										className='flex border-b flex-col gap-2 p-4'
									>
										<p className='text-sm font-semibold'>
											Name : {log.name}
										</p>
										<p className='text-sm font-semibold'>
											Type : {log.requestType}
										</p>
										<p className='text-sm font-semibold'>
											Status : {log.responseCode}
										</p>
										<p className='text-xs text-gray-600'>
											{JSON.stringify(log.data, null, 2)}
										</p>
										<p className='text-xs text-gray-500'>
											Time : {new Date(log.time).toLocaleString()}
										</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</DndContext>
	)
}
