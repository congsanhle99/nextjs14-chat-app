import { UserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/userSlice";

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
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={showCurrentUserInfo} onClose={() => setShowCurrentUserInfo(false)} title="Profile">
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
            <Image
              src={currentUserData?.profilePicture}
              width={160}
              height={160}
              alt="avatar user"
              className="rounded-full"
            />
            <span>Change Profile Picture</span>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData.name)}
            {getProperty("Username", currentUserData.userName)}
            {getProperty("ID", currentUserData._id)}
            {getProperty("Join On", dayjs(currentUserData.createAt).format("DD/MMM/YYYY HH:mm"))}
          </div>
          <div className="mt-5">
            <Button className="w-full" block loading={loading} onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CurrentUserInfo;
