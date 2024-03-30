"use client";
import useStore from "@/zustand/store";
import { getDisconnectedNodes } from "@/zustand/utils";
import Link from "next/link";
import React from "react";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const { edges, nodes } = useStore((state) => state);
  const { toast } = useToast();
  const handleSaveClick = () => {
    // Check for disconnected nodes
    const disconnectedNodes = getDisconnectedNodes(nodes, edges);

    // If there are disconnected nodes, display an error message
    if (disconnectedNodes.length > 0) {
      toast({
        description: "Cannot save changes. There are disconnected nodes.",
        variant: "destructive",
      });
    } else {
      toast({
        description: "Changes saved successfully.",
        variant: "default",
      });
    }
  };

  return (
    <nav className=" w-full p-5 bg-slate-100 text-right  flex justify-end items-center ">
      <button
        className="border px-5 py-2 rounded-md border-blue-500 text-blue-800 mr-36 text-sm font-medium bg-white hover:bg-slate-100"
        onClick={handleSaveClick}
      >
        Save Changes
      </button>
    </nav>
  );
};

export default Navbar;
