"use client";
import React from "react";
import DnDFlow from "./components/DragAndDrop";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className=" w-full h-screen">
      <DnDFlow />
    </div>
  );
};

export default page;
