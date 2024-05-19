import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    id: number;
    image: string;
    authorName: string;
    email: string;
    content: string;
    createdAt: number;
}

const commentSchema: Schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    image: { type: String },
    authorName: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Number, required: true },
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);

export default Comment;