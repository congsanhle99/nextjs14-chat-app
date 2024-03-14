import { setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chats";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatsList = () => {
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
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
    getChats();
  }, [currentUserData]);

  return <div>ChatsList</div>;
};

export default ChatsList;
