import React, { useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Settings2, Trash, Wrench } from 'lucide-react'
import ConfigureFlow from '../modals/configure-flow'

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
				'flex cursor-move select-none items-center justify-between gap-1 rounded-md border-2 bg-white p-4 hover:shadow',
				className
			)}
		>
			<div className='flex items-center'>
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
			</div>

            <div className='ml-auto flex gap-1'>
			<ConfigureFlow image={image} id={id} name={name}>
				<button className='ml-auto rounded-full border p-1 text-gray-600 hover:opacity-80 active:opacity-50'>
					<Settings2 size={20} />
				</button>
			</ConfigureFlow>
			<button
				onClick={() => onRemove(id)}
				className='ml-auto rounded-full border p-1 text-gray-600 hover:opacity-80 active:opacity-50'
			>
				<Trash size={20} />
			</button>
            </div>
		</div>
	)
}
