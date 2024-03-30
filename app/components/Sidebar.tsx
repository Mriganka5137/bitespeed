"use client";
import React, { useState } from "react";
import { Node } from "reactflow";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";

interface SidebarProps {
  selectedNode: Node | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({
  selectedNode,
  setSelectedNode,
  editValue,
  setEditValue,
}: SidebarProps) => {
  // Function to handle the drag start event
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Function to handle the change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  return (
    <aside className="  border-x h-screen w-96 p-5">
      {selectedNode ? (
        <form
          className=" space-y-5"
          onSubmit={() => {
            // check if the edit value is empty
            if (selectedNode) {
              if (editValue === "") {
                setSelectedNode(null);
                setEditValue("");
                return;
              }
              selectedNode.data.label = editValue;
              setSelectedNode(null);
              setEditValue("");
            }
          }}
        >
          <div className="flex items-center  border-b py-2 ">
            <IoIosArrowRoundBack
              onClick={() => setSelectedNode(null)}
              className="size-5 cursor-pointer"
            />
            <p className=" text-center flex-1">Message</p>
          </div>
          <div className=" space-y-2">
            <label htmlFor="edit" className=" text-gray-400">
              Text
            </label>
            <input
              id="edit"
              type="text"
              value={editValue}
              onChange={handleChange}
              className="w-full border  rounded-md min-h-20 p-2"
            />
          </div>
        </form>
      ) : (
        // Drag and drop message node
        <div
          className="  border text-center p-5 rounded-md border-blue-500 text-blue-800 w-56 flex flex-col items-center gap-2 cursor-move"
          onDragStart={(event) => onDragStart(event, "messageNode")}
          draggable
        >
          <MdOutlineMessage className="size-8" />
          <span>Message</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
