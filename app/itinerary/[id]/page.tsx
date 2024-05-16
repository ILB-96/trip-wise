"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ItineraryPage = ({ params }: { params: { id: string } }) => {
  const [fetchedComments, setComments]: [any, Dispatch<SetStateAction<any>>] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/itinerary/${params.id}/getComments`,
        {
          method: "GET",
        },
      );
      const result = await response.json();
      setComments(result);
    };
    fetchComments();
  }, []);

  return (
    <div className="space-y-4">
      {fetchedComments && fetchedComments.comments.success && fetchedComments.comments.comments.map((comment: any) => (
        <div key={comment._id}>
          {JSON.stringify(comment)}
        </div>
      ))}
    </div>
  );
};

export default ItineraryPage;