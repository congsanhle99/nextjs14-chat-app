"use client";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [currentUser, setCurrentUser] = useState<any>("Welcome");

  const getCurrentUser = async () => {
    try {
      const res = await GetCurrentUserFromMongoDB();
      if (res.error) {
        throw new Error(res.error);
      }
      setCurrentUser(res);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="bg-gray-200 w-full px-5 py-1 flex justify-between items-center border-b border-solid border-gray-300">
      <div>
        <h1 className="text-2xl font-bold text-primary uppercase">Quick Chat</h1>
      </div>
      <div className="gap-5 flex items-center">
        <span className="text-sm">{currentUser?.name}</span>
        <Avatar src={currentUser?.profilePicture} />
      </div>
    </div>
  );
};

export default Header;
