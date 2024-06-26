import React, { useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { X } from 'lucide-react'

type SortableItemProps = {
	id: string
	name: string
	image: string
	onRemove: (id: string) => void
	className?: string
}

export function SortableItem({
	id,
	image = '/logo.png',
	name,
	className,
	onRemove
}: SortableItemProps) {
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
			className={cn(
				'flex cursor-move select-none items-center gap-1 rounded-md border-2 bg-white p-4 hover:shadow',
				className
			)}
		>
			<Image
				src={image}
				width={500}
				height={500}
				alt='logo image'
				className='w-[40px]'
			/>
			<div className='flex flex-col'>
				<h1 className='text-sm font-semibold capitalize text-gray-700'>
					{name}
				</h1>
				<p className='-mt-1 text-xs text-gray-500'>
					Add an email workflow
				</p>
			</div>
			<button
				id={`remove-${id}`}
				onClick={() => onRemove(id)}
				className='rounded-full border p-1 text-gray-600 ml-auto hover:opacity-80 active:opacity-50'
			>
				<X />
			</button>
		</div>
	)
}
