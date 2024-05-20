"use client";
import { Button } from "@components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";

const TripPage = ({ params }: { params: { id: string } }) => {
  const [fetchedComments, setComments]: [any, Dispatch<SetStateAction<any>>] = useState(null);
  const [fetchedImage, setImage]: [any, Dispatch<SetStateAction<any>>] = useState(null);
  const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/trip/${params.id}/getComments`,
        {
          method: "GET",
        },
      );
      const result = await response.json();
      setComments(result);
    };
    fetchComments();
  }, []);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const fetchImage = async () => {
    // console.log(inputValue);
    const response = await fetch(`/api/trip/unsplash/${inputValue}`);
    const result = await response.json();
    setImage(result.imgUrl);
  }
  return (
    <div className="space-y-5 py-10 justify-center">
      <div className="flex items-center justify-center">
        <input
          className="p-4 outline-none rounded-md shadow-md shadow-slate-400/10 border"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter image query"
        />
        <Button onClick={fetchImage}>Fetch image</Button>
      </div>
      {fetchedImage && (
        <div className="flex justify-center">
          <Image
            className=""
            src={fetchedImage}
            alt="Fetched from Unsplash"
            width={500}
            height={500}
            priority
          />
        </div>
      )}
      <div className="space-y-4">
        {fetchedComments &&
          fetchedComments.success &&
          fetchedComments.comments.map((comment: any) => (
            <div key={comment._id}>{JSON.stringify(comment)}</div>
          ))}
      </div>
    </div>
  );
};

export default TripPage;