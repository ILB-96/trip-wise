// File: /models/user.ts
import mongoose, { Document, Schema, Types } from "mongoose";
import { IAccount } from "./account";
import Trip from "./trip";
export type Role = "ADMIN" | "USER";

export interface IUser extends Document {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: Role;
  accounts: IAccount[];
  chats: Types.ObjectId[];
  favorites: Types.ObjectId[];
}

const UserSchema: Schema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
  password: { type: String },
  role: { type: String, required: true, default: "USER" },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Trip" }], // Ensure this is correct
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;
