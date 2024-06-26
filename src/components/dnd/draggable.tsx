import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'

type DraggableProps = {
	children: React.ReactNode
	className?: string
	id: string
	image: string
}

export function Draggable({
	children,
	className,
	id,
	image = '/logo.png'
}: DraggableProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id
	})
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
			}
		: undefined

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={cn(
				'flex select-none items-center gap-1 rounded-md border-2 bg-white p-2 hover:shadow',
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
					{children}
				</h1>
				<p className='-mt-1 text-xs text-gray-500'>
					Add an email workflow
				</p>
			</div>
			<span className='ml-1 rounded bg-gray-100 py-[4px] text-gray-700 hover:cursor-grab'>
				<GripVertical size={20} />
			</span>
		</div>
	)
}
