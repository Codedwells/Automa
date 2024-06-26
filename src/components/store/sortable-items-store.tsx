import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { v4 } from 'uuid'
import { create } from 'zustand'
import type { TDraggableItems } from './draggable-items-store'

export type TWorkflowItem = {
	name: string
	endpoint: string
}

export interface TSortableItems extends TDraggableItems {
	workflows: TWorkflowItem[]
}

export type Tlogs = {
	time: string
	message: string
}

interface sortableItems {
	sortableItems: TSortableItems[]
	logs: Tlogs[]
	setSortableItems: (sortableItems: TSortableItems[]) => void
	addWorkflow: (id: UniqueIdentifier, workflow: TWorkflowItem) => void
	addLog: (time: string, message: string) => void
	clearLogs: () => void
	handleRemove: (id: UniqueIdentifier) => void
	handleDragEnd: (event: DragEndEvent, draggables: TSortableItems[]) => void
}

export const useSortableItemsStore = create<sortableItems>((set) => ({
	sortableItems: [],
	logs: [],
	setSortableItems: (sortableItems) => set({ sortableItems }),
	// Add a log
	addLog: (time: string, message: string) => {
		set((state) => ({
			logs: [...state.logs, { time, message }]
		}))
	},
	// Clear all logs
	clearLogs: () => set({ logs: [] }),
	// Remove a sortable item
	handleRemove: (id: UniqueIdentifier) =>
		set((state) => ({
			sortableItems: state.sortableItems.filter((item) => item.id !== id)
		})),
	// Add workflow url to a sortable item
	addWorkflow: (id: UniqueIdentifier, workflow: TWorkflowItem) => {
		set((state) => {
			const item = state.sortableItems.find((item) => item.id === id)
			if (item) {
				return {
					sortableItems: state.sortableItems.map((item) => {
						if (item.id === id) {
							return {
								...item,
								workflows: [...(item.workflows || []), workflow]
							}
						}
						return item
					})
				}
			}
			return state
		})
	},
	// Handles the drag end event
	handleDragEnd: (event: DragEndEvent, draggables: TDraggableItems[]) =>
		set((state) => {
			const { over, active } = event

			if (
				over &&
				over.id === 'dropzone' &&
				!state.sortableItems.some((item) => item.id === active.id)
			) {
				let item = draggables.find(
					(item: TDraggableItems) => item.id == active.id
				)

				if (item) {
					return {
						sortableItems: [
							...state.sortableItems,
							{
								name: item.name,
								id: v4(),
								image: item.image,
								workflows: []
							}
						]
					}
				}
			} else if (over && over.id !== 'dropzone') {
				const oldIndex = state.sortableItems.findIndex(
					(item) => item.id === active.id
				)
				const newIndex = state.sortableItems.findIndex(
					(item) => item.id === over.id
				)
				return {
					sortableItems: arrayMove(
						state.sortableItems,
						oldIndex,
						newIndex
					)
				}
			}
			return state
		})
}))
