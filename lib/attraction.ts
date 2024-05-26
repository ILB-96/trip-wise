"use server";
import { revalidatePath } from "next/cache";
import Attraction, { IAttraction } from "../models/attraction";
import { connectToDB } from "../utils/database";
import { redirect } from "next/navigation";
import { ATTRACTIONS_PER_PAGE } from "@app/dashboard/attractions/page";
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
