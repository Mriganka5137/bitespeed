"use client";
import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { Connection, Handle, Position } from "reactflow";

const MessageNode = ({
  data,
}: {
  data: {
    label: string;
  };
}) => {
  const [isSourceHandleConnected, setIsSourceHandleConnected] = useState(false);

  const sourceHandleIsValidConnection = (connection: Connection) => {
    // Check if the source handle is already connected
    const isValidConnection = !isSourceHandleConnected;
    return isValidConnection;
  };

  const onConnect = (connection: Connection) => {
    // Update the connection status of the source handle
    setIsSourceHandleConnected(true);
  };

  return (
    <>
      <div className="w-60 bg-white border rounded-lg shadow-xl">
        <div className=" w-full flex bg-teal-100 px-3 py-2 items-center justify-between">
          <div className=" flex items-center gap-2">
            <MdOutlineMessage className="size-4 text-gray-600 " />
            <p className=" font-bold text-sm">Send Message</p>
          </div>
          <IoLogoWhatsapp className=" text-green-500 size-4 bg-white p-0.5 rounded-full" />
        </div>
        <div className=" p-4 ">
          <p>{data?.label}</p>
        </div>
      </div>
      <Handle
        className=" !bg-black !size-2 !border-0  !rounded-full !text-white"
        type="source"
        position={Position.Right}
        isValidConnection={sourceHandleIsValidConnection}
        onConnect={onConnect}
      />
      <Handle
        type="target"
        position={Position.Left}
        className=" !bg-black !size-2 !border-0  !rounded-full !text-white"
      />
    </>
  );
};

export default MessageNode;
