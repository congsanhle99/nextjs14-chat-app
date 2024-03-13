"use server";

import { connectMongoDB } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();
    // check if User is already in DB based on clerkUserId
    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }
    // if User is not in DB ->  create a new User in DB
    let email = "";
    if (clerkUser?.emailAddresses) {
      email = clerkUser?.emailAddresses[0]?.emailAddress || "";
    }

    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      userName: clerkUser?.username,
      email,
      profilePicture: clerkUser?.imageUrl,
    };

    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const UpdateUserProfile = async (userId: string, payload: any) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true });
    return JSON.parse(JSON.stringify(updateUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const GetAllUsers = async () => {
  try {
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
