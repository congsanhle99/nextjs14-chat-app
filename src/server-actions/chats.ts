"use server";

import ChatModel from "@/models/chat-model";

export const CreateNewChat = async (payload: any) => {
  try {
    const newChat = await ChatModel.create(payload);
    return JSON.parse(JSON.stringify(newChat));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
