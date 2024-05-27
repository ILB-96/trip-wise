"use server";
import { connectToDB } from "@utils/database";
import TripCommentReport, {
  ITripCommentReport,
  ITripCommentReportBase,
} from "@models/tripCommentReport";
import { revalidatePath } from "next/cache";
import TripComment from "@models/tripComment";
import { REPORTS_PER_PAGE } from "@app/dashboard/reports/page";
export const getReports = async (q: string | RegExp, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDB(); // Ensure the database connection is awaited

    const count = await TripCommentReport.find({
      reason: { $regex: regex },
    }).countDocuments();

    const reports = await TripCommentReport.find({ reason: { $regex: regex } })
      .populate("tripCommentId") // Populate the tripCommentId field
      .populate("snitchId") // Populate the snitchId field
      .limit(REPORTS_PER_PAGE)
      .skip(REPORTS_PER_PAGE * (page - 1))
      .lean();

    return { count, reports };
  } catch (err) {
    throw new Error("Failed to fetch reports!");
  }
};

export const deleteTripCommentReport = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { tripCommentId, id } = Object.fromEntries(formData);

  console.log("commentIdObject", tripCommentId);
  try {
    await connectToDB(); // Ensure the database connection is awaited
    const deletedComment = await TripComment.findByIdAndDelete(tripCommentId);
    if (!deletedComment) {
      throw new Error(`Failed to delete TripComment with ID: ${tripCommentId}`);
    }
    console.log("hey");

    const deletedReport = await TripCommentReport.findByIdAndDelete(id);
    if (!deletedReport) {
      throw new Error(`Failed to delete TripCommentReport with ID: ${id}`);
    }

    revalidatePath("/dashboard/reports");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete comment!");
  }
};

export const addReport = async (
  report: ITripCommentReportBase
): Promise<{
  success: boolean;
  error?: string;
  report?: ITripCommentReportBase;
}> => {
  try {
    await connectToDB();
    const newReport: ITripCommentReport = await TripCommentReport.create({
      ...report,
    });
    if (!newReport)
      return {
        success: false,
        error: "Was not able to create the report in DB",
      };

    revalidatePath(`/dashboard/reports`);

    return { success: true, report: newReport };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addTripReport = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { snitchId, id, reason } = Object.fromEntries(formData);

  try {
    await connectToDB(); // Ensure the database connection is awaited

    const newReport = await TripCommentReport.findOneAndUpdate(
      { tripCommentId: id, snitchId },
      { $set: { reason } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidatePath("/dashboard/reports");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add report!");
  }
};
