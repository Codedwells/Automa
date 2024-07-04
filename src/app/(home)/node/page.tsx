'use client'

import { useShallow } from 'zustand/react/shallow'
import { Background, Controls, ReactFlow } from 'reactflow'

import 'reactflow/dist/style.css'
import { nodeTypes } from '@/components/nodes/nodes'
import { edgeTypes } from '@/components/nodes/edges'
import useNodeStore from '@/store/store'

const selector = (state: any) => ({
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
		<div className='h-[91vh]'>
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
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	)
}
