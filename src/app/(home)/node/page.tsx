'use client'

import { useShallow } from 'zustand/react/shallow'
import { Controls, ReactFlow } from 'reactflow'

import 'reactflow/dist/style.css'
import useNodeStore, { RFState, edgeTypes, nodeTypes } from '@/store/store'

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
				<Controls />
			</ReactFlow>
		</div>
	)
}
