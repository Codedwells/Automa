import React, { useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type SortableItemProps = {
	id: string
	name: string
	onRemove: (id: string) => void
}

export function SortableItem({ id, name, onRemove }: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}


	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='flex justify-between rounded-lg bg-blue-400 p-4'
		>
			<div className='flex flex-col'>
				<p className='text-wh'>{name}</p>
			</div>
			<button
				id={`remove-${id}`}
                onClick={() => onRemove(id)}
				className='ml-2 border p-1 text-white hover:opacity-80 active:opacity-50'
			>
				X
			</button>
		</div>
	)
}
