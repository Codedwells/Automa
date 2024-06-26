import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import {
	TWorkflowItem,
	useSortableItemsStore
} from '../store/sortable-items-store'

type ConfigureFlowProps = {
	children: React.ReactNode
	image: string
	id: string
	name: string
}

export default function ConfigureFlow({
	children,
	image,
	id,
	name
}: ConfigureFlowProps) {
	const { addWorkflow, sortableItems } = useSortableItemsStore()
	const [workflowName, setWorkflowName] = useState('')
	const [workflowEndpoint, setWorkflowEndpoint] = useState('')

	const handleAddWorkflow = () => {
		if (workflowName && workflowEndpoint) {
			addWorkflow(id, { name: workflowName, endpoint: workflowEndpoint })
			setWorkflowName('')
			setWorkflowEndpoint('')
		}
	}

	const currentWorkflows =
		sortableItems.find((item) => item.id === id)?.workflows || []

	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent>
				<CredenzaHeader className='flex flex-row items-center gap-2'>
					<Image
						src={image}
						alt='logo'
						width={210}
						height={210}
						draggable={false}
						className='w-[3rem] select-none rounded-full border-2 hover:border-gray-400 hover:opacity-80'
					/>
					<div>
						<CredenzaTitle className='capitalize'>
							{name}
						</CredenzaTitle>
						<CredenzaDescription>
							Configure your workflow here.
						</CredenzaDescription>
					</div>
				</CredenzaHeader>
				<CredenzaBody>
					<div className='mt-4 flex flex-col gap-2'>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-2'>
								<Label>Name</Label>
								<Input
									placeholder='name'
									value={workflowName}
									onChange={(e) =>
										setWorkflowName(e.target.value)
									}
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label>Endpoint</Label>
								<Input
									placeholder='https://api.myapp.com/api/v1/resource'
									type='url'
									value={workflowEndpoint}
									onChange={(e) =>
										setWorkflowEndpoint(e.target.value)
									}
								/>
							</div>
						</div>
						<Button onClick={handleAddWorkflow}>Add</Button>
					</div>
					<div className='mt-4'>
						<h1 className='text-lg font-semibold text-blue-950'>
							Endpoints
						</h1>
						<p className='text-xs text-muted-foreground'>
							Here are the configured endpoints for this workflow.
						</p>
					</div>
					<ul className='mt-4'>
						{currentWorkflows.map((workflow, index) => (
							<li key={index}>
								<strong>{workflow.name}:</strong>{' '}
								{workflow.endpoint}
							</li>
						))}
					</ul>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}
