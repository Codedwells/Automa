import { create } from 'zustand'
import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	addEdge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	applyNodeChanges,
	applyEdgeChanges,
	NodeTypes,
	EdgeTypes
} from 'reactflow'
import finalNode from '@/components/nodes/nodes/final-node'
import sourceNode from '@/components/nodes/nodes/source-node'
import throughNode from '@/components/nodes/nodes/through-node'
import { v4 as uuidv4 } from 'uuid'
import { TLogItem, runNodeWorkflows } from '@/lib/workflows'

// Initial state
const initialNodes = [
	{
		id: 'a',
		type: 'sourceNode',
		position: { x: -288, y: -452 },
		data: { label: 'This is the father node', color: 'red', url: 'https://jsonplaceholder.typicode.com/todos/1' }
	},
	{
		id: 'c',
		position: { x: -71, y: -228 },
		type: 'throughNode',
		data: { label: 'your ideas', color: 'green', url: 'https://jsonplaceholder.typicode.com/todos/2' }
	},
	{
		id: 'd',
		type: 'finalNode',
		position: { x: -320, y: -27 },
		data: { label: 'The final node here', color: 'orange', url: 'https://jsonplaceholder.typicode.com/todos/3' }
	}
] satisfies Node[]

export type CustomNodesType = (typeof initialNodes)[0]

export const nodeTypes = {
	finalNode: finalNode,
	sourceNode: sourceNode,
	throughNode: throughNode
} satisfies NodeTypes

export type ModuleTypes = keyof typeof nodeTypes
export type NodeColors = 'red' | 'blue' | 'green' | 'orange'

export const initialEdges = [
	{ id: 'a->c', source: 'a', target: 'c', animated: true },
	{ id: 'b->d', source: 'b', target: 'd' },
	{ id: 'c->d', source: 'c', target: 'd', animated: true }
] satisfies Edge[]

export const edgeTypes = {
	// Add your custom edge types here!
} satisfies EdgeTypes

export type RFState = {
	nodes: Node[]
	edges: Edge[]
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
	setNodes: (nodes: Node[]) => void
	setEdges: (edges: Edge[]) => void
	addNode: (moduleType: ModuleTypes, color: NodeColors) => void
	addNodeBetween: (
		parentNodeId: string,
		moduleType: ModuleTypes,
		color: NodeColors
	) => void
	deleteNode: (nodeId: string) => void
	updateNodeData: (nodeId: string, data: any) => void
	runWorkflow: () => Promise<TLogItem[]>
}

const useNodeStore = create<RFState>((set, get) => ({
	nodes: initialNodes,
	edges: initialEdges,
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes)
		})
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges)
		})
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges)
		})
	},
	setNodes: (nodes: Node[]) => {
		set({ nodes })
	},
	setEdges: (edges: Edge[]) => {
		set({ edges })
	},
	addNode: (moduleType: ModuleTypes, color: NodeColors) => {
		const nodes = get().nodes

		const newNode = {
			id: uuidv4(),
			type: moduleType,
			position: { x: -300, y: -470 },
			data: { label: 'New Node', color }
		}

		set({ nodes: [...nodes, newNode] })
	},
	addNodeBetween: (
		parentNodeId: string,
		moduleType: ModuleTypes,
		color: NodeColors
	) => {
		const nodes = get().nodes
		const edges = get().edges

		const parentNode = nodes.find((node) => node.id === parentNodeId)
		if (!parentNode) return

		const childEdge = edges.find((edge) => edge.source === parentNodeId)
		if (!childEdge) return

		const childNode = nodes.find((node) => node.id === childEdge.target)
		if (!childNode) return

		const newNodeId = uuidv4()
		const newNode = {
			id: newNodeId,
			type: moduleType,
			position: {
				x: (parentNode.position.x + childNode.position.x) / 2,
				y: (parentNode.position.y + childNode.position.y) / 2
			},
			data: { label: 'New Node', color }
		}

		const newEdges = [
			...edges.filter((edge) => edge.source !== parentNodeId),
			{
				id: `${parentNodeId}->${newNodeId}`,
				source: parentNodeId,
				target: newNodeId
			},
			{
				id: `${newNodeId}->${childEdge.target}`,
				source: newNodeId,
				target: childEdge.target
			}
		]

		set({ nodes: [...nodes, newNode], edges: newEdges })
	},
	deleteNode: (nodeId: string) => {
		const nodes = get().nodes
		const edges = get().edges

		const nodeToDelete = nodes.find((node) => node.id === nodeId)
		if (!nodeToDelete) return

		const parentEdge = edges.find((edge) => edge.target === nodeId)
		const childEdge = edges.find((edge) => edge.source === nodeId)

		const newNodes = nodes.filter((node) => node.id !== nodeId)
		const newEdges = edges.filter(
			(edge) => edge.source !== nodeId && edge.target !== nodeId
		)

		if (parentEdge && childEdge) {
			const newEdge = {
				id: `${parentEdge.source}->${childEdge.target}`,
				source: parentEdge.source,
				target: childEdge.target
			}
			newEdges.push(newEdge)
		}

		set({ nodes: newNodes, edges: newEdges })
	},
	updateNodeData: (nodeId: string, data: any) => {
		const nodes = get().nodes
		const node = nodes.find((node) => node.id === nodeId)
		if (!node) return

		const newNodes = nodes.map((node) => {
			if (node.id === nodeId) {
				return {
					...node,
					data: {
						...node.data,
						...data
					}
				}
			}
			return node
		})

		set({ nodes: newNodes })
	},
	runWorkflow: async () => {
		const response = await runNodeWorkflows(
			get().nodes as CustomNodesType[]
		)

		return response
	}
}))

export default useNodeStore
