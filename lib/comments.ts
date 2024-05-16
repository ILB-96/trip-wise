import { auth } from "@auth";
import { IComment, ICommentBase } from "@models/comment"
import Comment from "@models/comment";
import Itinerary, { IItinerary } from "@models/itinerary";
import { connectToDB } from "@utils/database";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";


export const addComment = async (comment: ICommentBase): Promise<{ success: boolean, error?: string, comment?: ICommentBase }> => {
    try {
        await connectToDB();
        // const session = await auth();
        // if (!session) return { success: false, error: "Not authenticated user" };
        let itinerary: IItinerary | null = await Itinerary.findOne({
            _id: comment.itineraryId,
        });
        if (itinerary) {
            const newComment: IComment = await Comment.create({
                ...comment,
            });
            if (!newComment) return { success: false, error: "Was not able to create the comment in DB" };
            if (itinerary.comments === null) {
                itinerary.comments = [];
            }
            itinerary.comments!.push(newComment._id);
            await itinerary.save();
            revalidatePath(`/itinerary/${comment.itineraryId}`);
            return { success: true, comment: newComment };
        }
        else {
            return { success: false, error: "Itinerary not found" };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
export const getComments = async (itineraryId: string): Promise<{ success: boolean, error?: string, comments?: any[] }> => {
    try {
        await connectToDB();
        if (!await Itinerary.exists({ _id: itineraryId })) {
            return { success: false, error: "Itinerary not found" };
        }
        let itinerary: IItinerary = (await Itinerary.findOne({_id: itineraryId}))!;
        itinerary = await itinerary.populate("comments");
        itinerary = await itinerary.populate("comments.author", "email name image");
        let comments: IComment[] | undefined = itinerary.comments;
        if (!comments) {
            comments = [];
        }
        comments = comments.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
        return { success: true, comments };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}