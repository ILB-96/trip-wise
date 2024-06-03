"use server";
import { revalidatePath } from "next/cache";
import Attraction, { IAttraction } from "../models/attraction";
import { connectToDB } from "../utils/database";
import { redirect } from "next/navigation";
import { ATTRACTIONS_PER_PAGE } from "@app/dashboard/attractions/page";
import { startOfDay, subDays } from "date-fns";
import { Types } from "mongoose";
export const addAttraction = async (
  attractionData: IAttraction
): Promise<IAttraction> => {
  await connectToDB();
  const attraction = new Attraction(attractionData);
  await attraction.save();
  return attraction;
};

export const getAllAttractions = async (): Promise<IAttraction[]> => {
  await connectToDB();
  return Attraction.find({});
};

export const getAttractionById = async (
  id: string
): Promise<IAttraction | null> => {
  await connectToDB();
  return Attraction.findById(id);
};

export const getAttractions = async (q: string | RegExp, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    let count = await Attraction.find({
      title: { $regex: regex },
    }).countDocuments();
    const attractions = await Attraction.find({ title: { $regex: regex } })
      .limit(ATTRACTIONS_PER_PAGE)
      .skip(ATTRACTIONS_PER_PAGE * (page - 1))
      .lean();

    return { count, attractions };
  } catch (err) {
    throw new Error("Failed to fetch reports!");
  }
};

export const deleteAttraction = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Attraction.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete attraction!");
  }

  revalidatePath("/dashboard/attractions");
};

export const updateAttraction = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id, title, country, location, price, image, description } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields: { [key: string]: any } = {
      title,
      country,
      location,
      price,
      image,
      description,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Attraction.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update attraction!");
  }

  revalidatePath("/dashboard/attractions");
  redirect("/dashboard/attractions");
};

export const getAttractionsStatistics = async () => {
  try {
    await connectToDB();

    const totalAttractions = await Attraction.countDocuments();

    const oneWeekAgo = subDays(new Date(), 7);
    const newAttractionsThisWeek = await Attraction.countDocuments({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    });
    let attractionsChange = 0;
    if (totalAttractions !== newAttractionsThisWeek) {
      attractionsChange =
        (newAttractionsThisWeek / (totalAttractions - newAttractionsThisWeek)) *
        100;
    }

    return {
      totalAttractions,
      attractionsChange: attractionsChange.toFixed(2),
    };
  } catch (error) {
    throw new Error("Failed to fetch trips statistics");
  }
};

export const getAttractionsChart = async () => {
  try {
    await connectToDB();

    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 6);

    const data = await Attraction.find({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    }).sort({ _id: 1 });

    // Group data by day
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item._id.getTimestamp())
        .toISOString()
        .split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    // Format data for the chart
    const formattedData = Object.keys(groupedData).map((date) => ({
      date,
      count: groupedData[date],
    }));

    return { attractionsData: formattedData };
  } catch (error) {
    console.error("Failed to fetch users statistics", error);
    throw new Error("Failed to fetch users statistics");
  }
};

export const getAttPage = async (
  q: { [key: string]: string },
  page: number
) => {
  let regex;
  try {
    console.log("q", q);
    regex = new RegExp(q.q, "i");
  } catch (err) {
    console.error("Invalid regex pattern:", err);
    regex = new RegExp("", "i"); // Default to an empty pattern
  }

  try {
    await connectToDB();

    let matchConditions = [
      {
        $or: [
          { title: { $regex: regex } },
          { location: { $regex: regex } },
          { country: { $regex: regex } },
        ],
      },
    ];

    // Conditionally adding the country condition if q.country is not empty
    if (q.country && q.country.trim() !== "") {
      matchConditions.push({ country: q.country });
    }
    if (q.location && q.location.trim() !== "") {
      matchConditions.push({ location: q.location });
    }
    if (q.types && q.types.trim() !== "") {
      matchConditions.push({ types: q.types });
    }

    const aggregatePipeline = [
      {
        $match: {
          $and: matchConditions,
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$rating" },
          numericalPrice: {
            $cond: {
              if: { $gt: [{ $type: "$price" }, "missing"] },
              then: { $strLenCP: "$price" },
              else: -1,
            },
          },
        },
      },
    ];

    if (q.price && q.price.trim() !== "") {
      aggregatePipeline.push({
        $match: { numericalPrice: parseFloat(q.price) },
      });
    }

    // If the rating filter is provided, add it to the pipeline
    if (q.rating && q.rating.trim() !== "") {
      aggregatePipeline.push({
        $match: {
          averageRating: { $gte: parseFloat(q.rating) },
        },
      });
    }

    // Sorting based on sortBy parameter
    if (q.sortBy && q.sortBy.trim() !== "") {
      let sortField;
      switch (q.sortBy) {
        case "Rating":
          sortField = { averageRating: -1 };
          break;
        case "Price Ascending":
          sortField = { numericalPrice: 1 };
          break;
        case "Price Descending":
          sortField = { numericalPrice: -1 };
          break;
        default:
          sortField = { createdAt: -1 }; // Default to Newest
      }
      aggregatePipeline.push({ $sort: sortField });
    }

    aggregatePipeline.push(
      { $skip: 21 * (page - 1) },
      { $limit: 21 },
      {
        $project: {
          _id: 1,
          title: 1,
          views: 1,
          rating: 1,
          image: 1,
          description: 1,
          country: 1,
          location: 1,
          price: 1,
          types: 1,
          averageRating: 1,
          numericalPrice: 1,
        },
      }
    );

    const attractions = await Attraction.aggregate(aggregatePipeline);

    // Convert MongoDB objects to plain objects
    const plainAttractions = attractions.map((attraction) => ({
      ...attraction,
      _id: attraction._id.toString(), // Convert _id to string
    }));

    // Count the total number of trips matching the conditions
    const countAggregatePipeline = [
      {
        $match: {
          $and: matchConditions,
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$rating" },
          numericalPrice: {
            $cond: {
              if: { $gt: [{ $type: "$price" }, "missing"] },
              then: { $strLenCP: "$price" },
              else: -1,
            },
          },
        },
      },
    ];

    if (q.price && q.price.trim() !== "") {
      countAggregatePipeline.push({
        $match: { numericalPrice: parseFloat(q.price) },
      });
    }

    if (q.rating && q.rating.trim() !== "") {
      countAggregatePipeline.push({
        $match: {
          averageRating: { $gte: parseFloat(q.rating) },
        },
      });
    }

    countAggregatePipeline.push({
      $count: "count",
    });

    const countResult = await Attraction.aggregate(countAggregatePipeline);
    const count = countResult[0]?.count || 0;
    console.log(attractions, count);
    return { count, attractions: plainAttractions };
  } catch (err) {
    console.error("Error fetching trips:", err);
    throw new Error("Failed to fetch trips!");
  }
};

export const getAttTypes = async () => {
  await connectToDB();
  return { types: await Attraction.distinct("types") };
};
