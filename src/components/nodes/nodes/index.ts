import type { Node, NodeTypes } from 'reactflow'
import finalNode from './final-node'
import throughNode from './through-node'
import sourceNode from './source-node'

const initialNodes = [
	{
		id: 'a',
		type: 'sourceNode',
		position: { x: -288, y: -452 },
		data: { label: 'This is the father node', color: 'red' }
	},
	{
		id: 'b',
		type: 'throughNode',
		position: { x: -536, y: -230 },
		data: { label: 'drag me!', color: 'blue' }
	},
	{
		id: 'c',
		position: { x: -71, y: -228 },
		type: 'throughNode',
		data: { label: 'your ideas', color: 'green' }
	},
	{
		id: 'd',
		type: 'finalNode',
		position: { x: -320, y: -27 },
		data: { label: 'The final node here', color: 'orange' }
	}
] satisfies Node[]

const nodeTypes = {
	finalNode: finalNode,
	sourceNode: sourceNode,
	throughNode: throughNode
} satisfies NodeTypes
