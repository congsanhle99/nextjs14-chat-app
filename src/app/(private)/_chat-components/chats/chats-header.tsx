import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import NewChatModal from "./new-chat-modal";

const ChatsHeader = () => {
  const [showChatModal, setShowChatModal] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      label: "New Chat",
      key: "1",
      onClick: () => setShowChatModal(true),
    },
    {
      label: "New Group",
      key: "2",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-500 font-bold">My Chats</h1>
        <Dropdown.Button size="small" className="w-max" menu={{ items }}>
          New message
        </Dropdown.Button>
      </div>
      {showChatModal && <NewChatModal showChatModal={showChatModal} setShowChatModal={setShowChatModal} />}
    </div>
  );
};

export default ChatsHeader;
