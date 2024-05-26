import { IAccount } from '@models/account';
import mongoose, { Document, Schema } from 'mongoose';

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
});

const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);
export default User;
