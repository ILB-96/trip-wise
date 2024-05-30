import mongoose from "mongoose"

interface IChat {
    members: String[];
    messages: mongoose.Schema.Types.ObjectId[];
    isGroup: boolean;
    name: string;
    createdAt: Date;
    lastMessageAt: Date;
}

const ChatSchema = new mongoose.Schema<IChat>({
    members: {
        type: [{ type: String, ref: 'User' }],
        required: true,
        default: []
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        default: []
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: ''
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
      }
},
    {
        timestamps: true
    }
)

const Chat = mongoose.models?.Chat || mongoose.model('Chat', ChatSchema)

export default Chat