import type { Edge, EdgeTypes } from "reactflow";

const initialEdges = [
  { id: "a->c", source: "a", target: "c", animated: true },
  { id: "b->d", source: "b", target: "d" },
  { id: "c->d", source: "c", target: "d", animated: true },
] satisfies Edge[];

const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
