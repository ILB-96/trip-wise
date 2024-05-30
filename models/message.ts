import mongoose from "mongoose"

interface IMessage {
    chat: mongoose.Schema.Types.ObjectId;
    sender: string;
    text: string;
    createdAt: Date;
    seenBy: string[];
}

const MessageSchema = new mongoose.Schema<IMessage>({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    sender: {
        type: String,
        ref: "User",
    },
    text: {
        type: String,
        default: "",
    },
    seenBy: {
        type: [{ type: String, ref: "User" }],
        default: []
    }
},
    {
        timestamps: true
    }
)

const Message = mongoose.models?.Message || mongoose.model('Message', MessageSchema)

export default Message