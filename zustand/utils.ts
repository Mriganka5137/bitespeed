import { Edge, Node } from "reactflow";

const hasIncidentEdges = (nodeId: any, edges: Edge[]) => {
  // Check if there are any edges incident to the given node
  return edges.some((edge) => edge.source === nodeId || edge.target === nodeId);
};

export const getDisconnectedNodes = (nodes: Node[], edges: Edge[]) => {
  // Initialize an array to store disconnected node IDs
  const disconnectedNodes: string[] = [];

  // Iterate over all nodes
  nodes.forEach((node) => {
    // Check if the node has any incident edges
    const isConnected = hasIncidentEdges(node.id, edges);

    // If the node has no incident edges, it is disconnected
    if (!isConnected) {
      disconnectedNodes.push(node.id);
    }
  });

  return disconnectedNodes;
};
