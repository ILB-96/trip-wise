import { connectToDB } from "@utils/database";
import TripCommentReport, {
  ITripCommentReport,
  ITripCommentReportBase,
} from "@models/tripCommentReport";
import { revalidatePath } from "next/cache";
import TripComment from "@models/tripComment";

export const REPORTS_PER_PAGE = 5;
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
    console.log(reports);
    reports.forEach((report) => {
      report._id = report._id.toString("base64");
      report.tripCommentId._id = report.tripCommentId._id.toString("base64");
    });
    return { count, reports };
  } catch (err) {
    throw new Error("Failed to fetch reports!");
  }
};

export const deleteTripCommentReport = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { tripCommentId, id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await TripComment.findByIdAndDelete(tripCommentId);
    await TripCommentReport.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete comment!");
  }

  revalidatePath("/dashboard/reports");
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
