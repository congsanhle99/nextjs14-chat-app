import { connectMongoDB } from "@/config/db-config";
connectMongoDB();

export default async function Home() {
  return (
    <div className="p-10">
      <h1>Home Page</h1>
    </div>
  );
}
