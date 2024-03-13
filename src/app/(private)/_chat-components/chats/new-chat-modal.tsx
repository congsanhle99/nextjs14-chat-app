import { Modal } from "antd";
import React from "react";

const NewChatModal = ({
  showChatModal,
  setShowChatModal,
}: {
  showChatModal: boolean;
  setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal open={showChatModal} onCancel={() => setShowChatModal(false)} footer={null} centered>
      <div className="flex flex-col gap-5">
        <h1 className="text-primary text-center text-xl font-bold uppercase">Create New Chat</h1>
      </div>
    </Modal>
  );
};

export default NewChatModal;
