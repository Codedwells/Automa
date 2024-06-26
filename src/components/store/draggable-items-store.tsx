import { UniqueIdentifier } from '@dnd-kit/core'
import { v4 } from 'uuid'
import { create } from 'zustand'

// draggableItems store
const defaultDraggables: TDraggableItems[] = [
	{ name: 'send email', id: v4(), image: '/email.svg' },
	{ name: 'make api call', id: v4(), image: '/logo.png' },
	{ name: 'send notification', id: v4(), image: '/notification.png' },
	{ name: 'write to database', id: v4(), image: '/database.png' }
]

export type TDraggableItems = {
	name: string
	id: UniqueIdentifier
	image: string
}

interface draggableItems {
	draggableItems: TDraggableItems[]
	setDraggableItems: (draggableItems: TDraggableItems[]) => void
}

export const useDraggableItemsStore = create<draggableItems>((set) => ({
	draggableItems: defaultDraggables,
	setDraggableItems: (draggableItems) => set({ draggableItems })
}))
