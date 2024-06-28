'use client'

import type { OnConnect } from 'reactflow'

import { useCallback } from 'react'
import {
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	addEdge,
	useNodesState,
	useEdgesState
} from 'reactflow'

import 'reactflow/dist/style.css'
import { initialNodes, nodeTypes } from '@/components/nodes/nodes'
import { edgeTypes, initialEdges } from '@/components/nodes/edges'

export default function Page() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((edges) => addEdge(connection, edges)),
		[setEdges]
	)

	return (
		<div className='h-[80vh]'>
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
				<MiniMap />
				<Controls />
			</ReactFlow>
		</div>
	)
}
