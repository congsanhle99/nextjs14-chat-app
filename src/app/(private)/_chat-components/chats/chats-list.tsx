import { ChatState, setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chats";
import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";

const ChatsList = () => {
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
  const { chats }: ChatState = useSelector((state: any) => state.chat);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getChats = async () => {
    try {
      setLoading(true);
      const res = await GetAllChats(currentUserData?._id!);
      if (res.error) {
        throw new Error(res.error);
      }
      dispatch(setChats(res));
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserData) {
      getChats();
    }
  }, [currentUserData]);

  return (
    <>
      {chats.length > 0 && (
        <div className="flex flex-col gap-2 mt-5">
          {chats.map((chat) => {
            return <ChatCard key={chat._id} chat={chat} />;
          })}
        </div>
      )}

      {loading && (
        <div className="flex flex-col justify-center items-center mt-60">
          <div className="flex flex-col">
            <Spin />
            <span className="text-gray-500 text-sm my-5">Loading messages...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatsList;
