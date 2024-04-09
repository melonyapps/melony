export interface IMember {
  _id: string;
  email: string;
  user: {
    picture?: string;
  };
  role: "OWNER" | "MEMBER";
}
