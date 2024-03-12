import { UserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, Upload, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { uploadImageToFirebaseAndReturnUrl } from "@/helpers/image-upload";
import { UpdateUserProfile } from "@/server-actions/users";

const CurrentUserInfo = ({
  // currentUser,
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  // currentUser: UserType | null;
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
  const { signOut } = useClerk();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("Logged out successfully!");
      router.push("/sign-in");
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onProfilePictureUpdate = async () => {
    try {
      setLoading(true);
      const url: string = await uploadImageToFirebaseAndReturnUrl(selectedFile!);
      const res = await UpdateUserProfile(currentUserData?._id!, { profilePicture: url });
      if (res.error) {
        throw new Error(res.error);
      }
      dispatch(SetCurrentUser(res));
      message.success("Profile Picture Updated!");
      setShowCurrentUserInfo(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <Drawer open={showCurrentUserInfo} onClose={() => setShowCurrentUserInfo(false)} title="Profile">
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
            {!selectedFile && (
              <Image
                src={currentUserData?.profilePicture}
                width={160}
                height={160}
                alt="avatar user"
                className="rounded-full"
              />
            )}
            <Upload
              className="cursor-pointer"
              beforeUpload={(file) => {
                setSelectedFile(file);
                return false;
              }}
              listType={selectedFile ? "picture-circle" : "text"}
              maxCount={1}
            >
              Change Profile Picture
            </Upload>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData.name)}
            {getProperty("Username", currentUserData.userName)}
            {getProperty("ID", currentUserData._id)}
            {getProperty("Join On", dayjs(currentUserData.createAt).format("DD/MMM/YYYY HH:mm"))}
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <Button
              className="w-full"
              block
              loading={loading}
              onClick={onProfilePictureUpdate}
              disabled={!selectedFile}
            >
              Upload Picture
            </Button>
            <Button className="w-full" block loading={loading && !selectedFile} onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CurrentUserInfo;
