import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { useShallow } from "zustand/react/shallow";
import Sidebar from "./Sidebar";
import MessageNode from "./MessageNode";
import useStore from "@/zustand/store";
import { v4 as uuidv4 } from "uuid";

//  Selector function to get the required state from the store
const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const DragAndDrop = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setEdges,
    setNodes,
  } = useStore(useShallow(selector));

  // Declare custom node types
  const nodeTypes = useMemo(() => {
    return {
      messageNode: MessageNode,
    };
  }, []);
  // State to store the selected node
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  // State to store the value of the selected node
  const [editValue, setEditValue] = useState(selectedNode?.data.label);

  // Reference to the react flow wrapper
  const reactFlowWrapper = useRef(null);
  // State to store the react flow instance
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  // Drag and Drop functionality --> prevent default
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drop event handler --> create a new node on drop
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `Test Message ${nodes.length + 1} ` },
      };

      // setNodes((nds) => nds.concat(newNode));
      setNodes([...nodes, newNode]);
    },
    [nodes, setNodes, reactFlowInstance]
  );

  return (
    <div className=" flex">
      <ReactFlowProvider>
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            panOnDrag={true}
            onNodeClick={(
              event: React.MouseEvent,
              node: Node & { data: { label: string } }
            ) => {
              // set the selected node and the edit value
              setSelectedNode(node);
              setEditValue(node.data.label);
            }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar
          selectedNode={selectedNode as Node}
          setSelectedNode={setSelectedNode}
          editValue={editValue}
          setEditValue={setEditValue}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default DragAndDrop;
