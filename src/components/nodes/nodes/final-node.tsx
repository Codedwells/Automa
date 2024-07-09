import { Clock, Plus, Rss, Trash } from 'lucide-react'
import React, { memo, useEffect, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import useNodeStore from '@/store/store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default memo(({ xPos, yPos, id, data }: NodeProps) => {
	const [url, setUrl] = useState('')
	const { updateNodeData, deleteNode } = useNodeStore((state) => state)

	const handleDeleteNode = () => {
		deleteNode(id)
	}

	const handleUpdateNodeData = () => {
		updateNodeData(id, { url })
	}

	useEffect(() => {
		setUrl(data?.url)
	}, [])
	return (
		<div className=''>
			<figure className='group/node relative'>
				<Popover>
					<PopoverTrigger>
						<div
							className={`flex h-[150px] w-[150px] cursor-pointer items-center justify-center rounded-full bg-${data.color}-500 p-4 shadow-xl ring-${data.color}-500/50 transition-all duration-300 hover:ring-8`}
						>
							<div className='text-center'>
								<Rss className='h-[130px] w-[130px] text-white' />
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent side='right'>
						<div>
							<div className='space-y-1'>
								<Label>URL</Label>
								<Input
									value={url}
									onChange={(e) => setUrl(e.target.value)}
								/>
							</div>
							<Button
								onClick={handleUpdateNodeData}
								className='mt-2'
							>
								Update
							</Button>
						</div>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger className=' absolute -right-4 top-4 '>
						<div
							className={`hidden h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full shadow-lg group-hover/node:flex bg-${data.color}-500 text-center text-sm text-white ring-white transition-all duration-300 hover:ring-4`}
						>
							<Plus className='h-[30px] w-[30px] text-white' />
						</div>
					</PopoverTrigger>
					<PopoverContent side='right'>
						<Button
							onClick={handleDeleteNode}
							className='flex items-center w-full justify-center rounded-full'
							variant='destructive'
						>
							Delete&nbsp; <Trash className='mr-2 h-4 w-4' />
						</Button>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>
						<div
							className={`absolute -bottom-4 -left-3 z-10 flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-full bg-${data.color}-500 text-center text-sm text-white shadow-lg ring-white transition-all duration-300 hover:ring-4`}
						>
							<Clock className='h-[50px] w-[50px] text-white' />
						</div>
					</PopoverTrigger>
					<PopoverContent>Manage timing from here</PopoverContent>
				</Popover>
				<Handle type='target' position={Position.Top} />
			</figure>

			<div className='mt-8 flex flex-col items-center'>
				<h3 className='font-semibold'>FINAL Feed</h3>
				<p className='-mt-1 text-sm text-gray-700'>{data?.label}</p>
			</div>
		</div>
	)
})
