import { Node } from "reactflow";

export const initialNodes = [
  {
    id: "1",
    type: "messageNode",
    data: { label: "test message" },
    position: { x: 50, y: 25 },
  },

  {
    id: "2",
    type: "messageNode",
    data: { label: "test message" },
    position: { x: 400, y: 200 },
  },
] as Node[];
