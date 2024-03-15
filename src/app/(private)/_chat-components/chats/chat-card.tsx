import { ChatType } from "@/interfaces";
import { UserState } from "@/redux/userSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: ChatType }) => {
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
  let chatName = "";
  let chatImage = "";
  let lastMessage = "";
  let lastMessageSenderName = "";
  let lastMessageTime = "";

  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatImage = chat.groupProfilePicture;
  } else {
    const recipient = chat.users.find((user) => user._id !== currentUserData?._id);
    chatName = recipient?.name!;
    chatImage = recipient?.profilePicture!;
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <Image src={chatImage} width={40} height={40} className="rounded-full" alt="avatar chat" />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div className="flex items-end">{lastMessageTime}</div>
    </div>
  );
};

export default ChatCard;
