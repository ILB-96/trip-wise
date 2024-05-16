import mongoose, { Schema } from "mongoose";

// Account Interface
export interface IAccount extends Document {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  }
  
  const AccountSchema = new Schema<IAccount>({
    userId: { type: String, ref: 'User' },
    type: {type: String},
    provider: {type: String},
    providerAccountId: {type: String},
    refresh_token: {type: String},
    access_token: {type: String},
    expires_at: {type: Number},
    token_type: {type: String},
    scope: {type: String},
    id_token: {type: String},
    session_state: {type: String},
  });
  
  AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });
  
  const Account = mongoose.models?.Account || mongoose.model<IAccount>('Account', AccountSchema);
  export default Account;