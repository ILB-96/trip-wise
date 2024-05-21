import { auth } from "@auth";
import { ITripComment, ITripCommentBase } from "@models/tripComment"
import TripComment from "@models/tripComment";
import Trip, { ITrip } from "@models/trip";
import { connectToDB } from "@utils/database";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "@models/user";


export const addComment = async (comment: ITripCommentBase): Promise<{ success: boolean, error?: string, comment?: ITripCommentBase }> => {
    try {
        await connectToDB();
        // const session = await auth();
        // if (!session) return { success: false, error: "Not authenticated user" };
        let trip: ITrip | null = await Trip.findOne({
            _id: comment.tripId,
        });
        if (trip) {
            const user = await User.findOne({ _id: comment.author });
            if(!user) {
                return { success: false, error: "Invalid user, could be another different database" };
            }
            const newComment: ITripComment = await TripComment.create({
                ...comment,
            });
            if (!newComment) return { success: false, error: "Was not able to create the comment in DB" };
            if (trip.comments === null) {
                trip.comments = [];
            }
            trip.comments!.push(newComment._id);
            await trip.save();

            revalidatePath(`/trip/${comment.tripId}`); 

            return { success: true, comment: newComment };
        }
        else {
            return { success: false, error: "Trip not found" };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
export const getComments = async (tripId: string): Promise<{ success: boolean, error?: string, comments?: any[] }> => {
    try {
        await connectToDB();
        if (!await Trip.exists({ _id: tripId })) {
            return { success: false, error: "Trip not found" };
        }
        let desiredTrip: ITrip = (await Trip.findOne({_id: tripId}))!;
        desiredTrip = await desiredTrip.populate("comments");
        desiredTrip = await desiredTrip.populate("comments.author", "email name image");
        let comments: ITripComment[] | undefined = desiredTrip.comments;
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