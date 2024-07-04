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
	applyEdgeChanges
} from 'reactflow'
import { initialNodes } from '@/components/nodes/nodes'
import { initialEdges } from '@/components/nodes/edges'

type RFState = {
	nodes: Node[]
	edges: Edge[]
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
	setNodes: (nodes: Node[]) => void
	setEdges: (edges: Edge[]) => void
}

// this is our useNodeStore hook that we can use in our components to get parts of the store and call actions
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
	}
}))

export default useNodeStore
