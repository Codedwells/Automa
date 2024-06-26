import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
				'flex cursor-move select-none hover:shadow items-center gap-1 rounded-md border-2 bg-white p-2',
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
		</div>
	)
}
