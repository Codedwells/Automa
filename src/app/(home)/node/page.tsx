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

	const addNode = useNodeStore((state) => state.addNode)

	const handleAddNode = () => {
		addNode(moduleType, nodeColorMap[moduleType])
	}

	return (
		<div className='absolute right-4 top-4 z-[50] space-y-4 rounded-md bg-white p-4 shadow'>
			<RadioGroup
				defaultValue='7'
				onValueChange={(value) => setModuleType(value as ModuleTypes)}
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
			<Button onClick={handleAddNode}>Add Node</Button>
		</div>
	)
}
