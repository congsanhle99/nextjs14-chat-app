import { UserType } from "@/interfaces";
import { UserState } from "@/redux/userSlice";
import { CreateNewChat } from "@/server-actions/chats";
import { GetAllUsers } from "@/server-actions/users";
import { Button, Divider, Modal, Spin, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NewChatModal = ({
  showChatModal,
  setShowChatModal,
}: {
  showChatModal: boolean;
  setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await GetAllUsers();
      if (res.error) {
        throw new Error("No Users Found!");
      }
      setUsers(res);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onAddToChat = async (userId: string) => {
    try {
      setSelectedUserId(userId);
      setLoading(true);
      const res = await CreateNewChat({
        users: [userId, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGroupChat: false,
      });
      if (res.error) {
        throw new Error(res.error);
      } else {
        message.success("Chat Created Successfully!");
      }
      setShowChatModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal open={showChatModal} onCancel={() => setShowChatModal(false)} footer={null} centered>
      <div className="flex flex-col gap-5">
        <h1 className="text-primary text-center text-xl font-bold uppercase">Create New Chat</h1>

        {loading && !selectedUserId && (
          <div className="flex justify-center my-20">
            <Spin />
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="flex flex-col gap-5">
            {users.map((user) => {
              if (user._id === currentUserData?._id) {
                return null;
              }
              return (
                <>
                  <div key={user._id} className="flex justify-between items-center h1">
                    <div className="flex items-center gap-5">
                      <Image src={user.profilePicture} width={40} height={40} className="rounded-full" alt="avatar" />
                      <span className="text-gray-500">{user.name}</span>
                    </div>
                    <Button
                      loading={selectedUserId === user._id && loading}
                      onClick={() => onAddToChat(user._id)}
                      size="small"
                    >
                      Add to chat
                    </Button>
                  </div>
                  <Divider className="border-gray-200 my-[1px]" />
                </>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NewChatModal;
