import { connectMongoDB } from "@/config/db-config";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { UserButton, currentUser } from "@clerk/nextjs";
connectMongoDB();

export default async function Home() {
  const logInUserData = await GetCurrentUserFromMongoDB();

  return (
    <div className="p-10">
      <div className="flex flex-col gap-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <span>First Name: {logInUserData?.name}</span>
        <span>User Name: {logInUserData?.userName}</span>
        <span>Email: {logInUserData?.email}</span>
      </div>
    </div>
  );
}
