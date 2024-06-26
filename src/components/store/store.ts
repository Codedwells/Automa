import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { v4 } from 'uuid'
import { create } from 'zustand'

// draggableItems store
const defaultDraggables: TDraggableItems[] = [
	{ name: 'send email', id: v4(), image: '/email.svg' },
	{ name: 'make api call', id: v4(), image: '/logo.png' },
	{ name: 'send notification', id: v4(), image: '/notification.png' },
	{ name: 'write to database', id: v4(), image: '/database.png' }
]

type TDraggableItems = { name: string; id: UniqueIdentifier; image: string }

interface draggableItems {
	draggableItems: TDraggableItems[]
	setDraggableItems: (draggableItems: TDraggableItems[]) => void
}

export const useDraggableItemsStore = create<draggableItems>((set) => ({
	draggableItems: defaultDraggables,
	setDraggableItems: (draggableItems) => set({ draggableItems })
}))

// SortableItems store
interface sortableItems {
	sortableItems: TDraggableItems[]
	setSortableItems: (sortableItems: TDraggableItems[]) => void
    handleRemove: (id: UniqueIdentifier) => void
    handleDragEnd: (event: DragEndEvent, draggables: TDraggableItems[]) => void
}

export const useSortableItemsStore = create<sortableItems>((set) => ({
	sortableItems: [],
	setSortableItems: (sortableItems) => set({ sortableItems }),
	handleRemove: (id: UniqueIdentifier) =>
		set((state) => ({
			sortableItems: state.sortableItems.filter((item) => item.id !== id)
		})),
	handleDragEnd: (event: DragEndEvent, draggables: TDraggableItems[]) =>
		set((state) => {
			const { over, active } = event

			if (
				over &&
				over.id === 'dropzone' &&
				!state.sortableItems.some((item) => item.id === active.id)
			) {
				let item = draggables.find(
					(item: TDraggableItems) => item.id === active.id
				)
				if (item) {
					return {
						sortableItems: [
							...state.sortableItems,
							{ name: item.name, id: v4(), image: item.image }
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
