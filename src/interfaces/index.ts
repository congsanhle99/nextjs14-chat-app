export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  userName: string;
  email: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
}

export interface ChatType {
  _id: string;
  users: UserType[];
  createdBy: UserType;
  lastMessage: MessageType;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  groupBio: string;
  groupAdmins: UserType[];
  unreadCounts: any;
  createAt: string;
  updateAt: string;
}

export interface MessageType {
  _id: string;
  chat: ChatType;
  sender: UserType;
  text: string;
  image: string;
  readBy: UserType[];
  createAt: string;
  updateAt: string;
}
