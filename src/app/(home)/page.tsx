'use client'

import { useShallow } from 'zustand/react/shallow'
import { Controls, ReactFlow } from 'reactflow'

import 'reactflow/dist/style.css'
import useNodeStore, {
	ModuleTypes,
	NodeColors,
	RFState,
	edgeTypes,
	nodeTypes
} from '@/store/store'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { TLogItem } from '@/lib/workflows'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

const selector = (state: RFState) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect
})

export default function Page() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
		useNodeStore(useShallow(selector))

	return (
		<div className='h-[91vh] bg-gray-100'>
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				edges={edges}
				edgeTypes={edgeTypes}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<ManageNodes />

				<Controls />
			</ReactFlow>
		</div>
	)
}

const nodeColorMap: { [key: string]: NodeColors } = {
	sourceNode: 'red',
	throughNode: 'blue',
	finalNode: 'orange'
}

// Add node component
const ManageNodes = () => {
	const [moduleType, setModuleType] = useState<ModuleTypes>('sourceNode')
	const [logs, setLogs] = useState<TLogItem[]>([])
	const [running, setRunning] = useState(false)

	const { addNode, nodes, runWorkflow } = useNodeStore((state) => state)

	const handleAddNode = () => {
		addNode(moduleType, nodeColorMap[moduleType])
	}

	const handleRunWorkflow = async () => {
		setRunning(true)
		const logs = await runWorkflow()
		setLogs(logs)
		setRunning(false)
	}

	return (
		<div className='absolute right-4 top-4 z-[50] space-y-4 rounded-md bg-white p-4 shadow'>
			<div className='mt-4'>
				<RadioGroup
					defaultValue='7'
					onValueChange={(value) =>
						setModuleType(value as ModuleTypes)
					}
                    className='flex items-center justify-between gap-1'
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='sourceNode' id='r1' />
						<Label htmlFor='r1'>Source Node</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='throughNode' id='r2' />
						<Label htmlFor='r2'>Middle Node</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='finalNode' id='r3' />
						<Label htmlFor='r3'>Final Node</Label>
					</div>
				</RadioGroup>
				<Button onClick={handleAddNode} className='mt-4 w-full'>Add Node</Button>
			</div>

			<div>
				<h2 className='text-lg font-bold'>Workflows</h2>
				<ul className='space-y-2'>
					{nodes.map((node) => (
						<li key={node.id}>
							{node.data.url} - {node.type}
						</li>
					))}
				</ul>

				<Button onClick={handleRunWorkflow} className='mt-2 w-full'>
					Run Workflows
				</Button>

				<div className='mt-2 max-w-lg h-[450px] flex-1 overflow-y-auto overflow-x-hidden rounded border bg-slate-50'>
					<div className='flex flex-col border-b p-2'>
						<p className='text-lg font-semibold'>
							Run the workflows
						</p>
						<p className='-mt-1 text-xs text-gray-600'>
							Log the results of the workflows
						</p>
					</div>
					<div
						className={cn('hidden rounded p-4', { flex: running })}
					>
						<Loader className='animate-spin' /> running ...
					</div>
					<div>
						{logs.map((log, index) => {
							return (
								<div
									key={index}
									className='flex flex-col gap-2 border-b p-4'
								>
									<p className='text-sm font-semibold'>
										Node label : {log.name}
									</p>
									<p className='text-sm font-semibold'>
										Type : {log.requestType}
									</p>
									<p className='text-sm font-semibold'>
										Status : {log.responseCode}
									</p>
									<p className='text-xs text-gray-600'>
										Response: {JSON.stringify(log.data, null, 2)}
									</p>
									<p className='text-xs text-gray-500'>
										Time :{' '}
										{new Date(log.time).toLocaleString()}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
