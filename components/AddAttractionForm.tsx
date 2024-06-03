import { useState, FormEvent, ChangeEvent } from "react";

const AddAttractionForm = () => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const allowedDomains = [
    "upload.wikimedia.org",
    "en.wikipedia.org",
    "www.telegraph.co.uk",
    "www.nationalparks.org",
    "i0.wp.com",
    "a.cdn-hotels.com",
    "images.unsplash.com",
    "avatars.githubusercontent.com",
    "source.unsplash.com",
    "i.ibb.co",
    "lh3.googleusercontent.com",
  ];

  const isValidImageURL = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return allowedDomains.includes(hostname);
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidImageURL(image)) {
      setMessage("Invalid image URL. Please use an allowed source.");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      return;
    }

    const data = {
      title,
      location,
      country,
      description,
      image,
    };

    try {
      const res = await fetch("/api/attraction/addAttraction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP status ${res.status}`);
      }

      const result = await res.json();
      setMessage("Attraction added successfully!");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error: any) {
      // Explicitly typing 'error' as 'any'
      setMessage(`Failed to add attraction: ${error.message}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLocation(e.target.value)
        }
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCountry(e.target.value)
        }
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImage(e.target.value)
        }
        required
        className="border p-2 rounded"
      />
      <p className="text-sm text-gray-500">
        Please use image URLs from the following websites:
        <ul className="list-disc list-inside">
          <li>Wikimedia Commons (upload.wikimedia.org)</li>
          <li>Wikipedia (en.wikipedia.org)</li>
          <li>The Telegraph (www.telegraph.co.uk)</li>
          <li>National Parks Foundation (www.nationalparks.org)</li>
          <li>WordPress (i0.wp.com)</li>
          <li>Hotels (a.cdn-hotels.com)</li>
          <li>Unsplash (images.unsplash.com, source.unsplash.com)</li>
          <li>GitHub (avatars.githubusercontent.com)</li>
          <li>ImgBB (i.ibb.co)</li>
          <li>Google Photos (lh3.googleusercontent.com)</li>
        </ul>
      </p>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Attraction
      </button>
      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </form>
  );
};

export default AddAttractionForm;
