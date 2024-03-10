import { Button, Flex } from "antd";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const logInUserData = await currentUser();
  let email = "";
  if (logInUserData?.emailAddresses && logInUserData?.emailAddresses.length) {
    email = logInUserData.emailAddresses[0].emailAddress;
  }

  return (
    <div className="p-10">
      <div className="flex flex-col gap-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <span>First Name: {logInUserData?.firstName}</span>
        <span>Last Name: {logInUserData?.lastName}</span>
        <span>User Name: {logInUserData?.username}</span>
        <span>Email: {email}</span>
      </div>
    </div>
  );
}
