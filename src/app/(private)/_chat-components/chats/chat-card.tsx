import { ChatType } from "@/interfaces";
import { ChatState, setSelectedChat } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: ChatType }) => {
  const dispatch = useDispatch();
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
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

  const isSelected = selectedChat?._id === chat._id;

  return (
    <div
      className={`flex justify-between hover:bg-gray-100 border cursor-pointer py-2 px-2 rounded-[4px] ${
        isSelected ? "bg-gray-100 border !border-gray-200 border-solid" : ""
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex gap-5 items-center">
        <Image src={chatImage} width={40} height={40} className="rounded-full" alt="avatar chat" />
        <span className="text-gray-700 text-sm">{chatName}</span>
      </div>
      <div className="flex items-end">{lastMessageTime}</div>
    </div>
  );
};

export default ChatCard;
