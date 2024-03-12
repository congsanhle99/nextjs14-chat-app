/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./Current-User-Info";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "@/redux/userSlice";

const Header = () => {
  const pathName = usePathname();
  const isPublicRoute = pathName.includes("sign-in") || pathName.includes("sign-up");
  if (isPublicRoute) {
    return null;
  }

  // const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const { currentUserData }: UserState = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const res = await GetCurrentUserFromMongoDB();
      if (res.error) {
        throw new Error(res.error);
      }
      // setCurrentUser(res);
      dispatch(SetCurrentUser(res as UserType));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      {/* {isPublicRoute ? null : (
        <div className="bg-gray-200 w-full px-5 py-1 flex justify-between items-center border-b border-solid border-gray-300">
          <div>
            <h1 className="text-2xl font-bold text-primary uppercase">Quick Chat</h1>
          </div>
          <div className="gap-5 flex items-center">
            <span className="text-sm">{currentUser?.name}</span>
            <Avatar
              src={currentUser?.profilePicture}
              className="cursor-pointer"
              onClick={() => setShowCurrentUserInfo(true)}
            />
          </div>

          {showCurrentUserInfo && (
            <CurrentUserInfo
              currentUser={currentUser}
              showCurrentUserInfo={showCurrentUserInfo}
              setShowCurrentUserInfo={setShowCurrentUserInfo}
            />
          )}
        </div>
      )} */}
      <div className="bg-gray-200 w-full px-5 py-1 flex justify-between items-center border-b border-solid border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-primary uppercase">Quick Chat</h1>
        </div>
        <div className="gap-5 flex items-center">
          <span className="text-sm">{currentUserData?.name}</span>
          <Avatar
            src={currentUserData?.profilePicture}
            className="cursor-pointer"
            onClick={() => setShowCurrentUserInfo(true)}
          />
        </div>

        {showCurrentUserInfo && (
          <CurrentUserInfo showCurrentUserInfo={showCurrentUserInfo} setShowCurrentUserInfo={setShowCurrentUserInfo} />
        )}
      </div>
    </>
  );
};

export default Header;
