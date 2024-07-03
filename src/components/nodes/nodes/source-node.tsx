import { Clock, Rss } from 'lucide-react'
import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

export default memo(({ xPos, yPos, id, data }: NodeProps) => {
	return (
		<div className=''>
			<figure className='relative'>
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
						Modify Item setting here
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
				<Handle type='source' position={Position.Bottom} />
			</figure>

			<div className='mt-8 flex flex-col items-center'>
				<h3 className='font-semibold'>SOURCE Node</h3>
				<p className='-mt-1 text-sm text-gray-700'>{data?.label}</p>
			</div>
		</div>
	)
})
