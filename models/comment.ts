import mongoose, { Types, Document } from "mongoose";

export interface ICommentBase {
    author: Types.ObjectId;
    content: string;
    itineraryId: Types.ObjectId;
}
export interface IComment extends Document, ICommentBase {
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
}, { timestamps: true });

const Comment = mongoose.models?.Comment || mongoose.model<IComment>('Comment', commentSchema);
export default Comment;