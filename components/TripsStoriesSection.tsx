import Image from "next/image";

interface CardProps {
  title: string;
  imgUrl: string;
  readTime: string;
  isMain: boolean;
}

interface Story {
  title: string;
  imgUrl: string;
  readTime: string;
  isMain: boolean;
}

const Card: React.FC<CardProps> = ({ title, imgUrl, readTime, isMain }) => {
  if (isMain) {
    return (
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-lg col-span-full sm:col-span-full lg:col-span-1 row-span-3"
        style={{
          height: "full",
          maxHeight: "600px",
          minHeight: "250px",
        }}
      >
        <Image
          src={imgUrl}
          alt={title}
          layout="fill"
          className="object-cover"
        />
        <div
          className="absolute bottom-0 left-0 w-full p-4 bg-black opacity-85 flex flex-col justify-end"
          style={{ minHeight: "100px" }}
        >
          <h3 className="text-lg font-semibold text-white absolute top-2">
            {title}
          </h3>
          <p className="text-sm text-white">{readTime}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-lg bg-white hover:bg-purple-500"
        style={{ width: "100%", height: "auto", maxHeight: "500px" }} // Max height for uniformity
      >
        <div className="flex items-center" style={{ padding: "10px" }}>
          <div
            style={{
              height: "100%",
              overflow: "hidden",
              borderRadius: "15px",
              minInlineSize: "100px",
            }}
          >
            <Image
              src={imgUrl}
              alt={title}
              layout="responsive"
              width={150}
              height={150}
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>
          <div className="p-8" style={{ width: "600px" }}>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-white absolute top-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 hover:text-white absolute bottom-2">
              {readTime}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

const TripsStoriesSection: React.FC = () => {
  const stories: Story[] = [
    {
      title: "October: Festive seasons across the globe",
      imgUrl: "/assets/images/TripsStoriesSection/bigOne.jpg",
      readTime: "3 min read",
      isMain: true,
    },
    {
      title: "Turkey: A Journey Through the Ottoman Empire",
      imgUrl: "/assets/images/TripsStoriesSection/Image68.jpg",
      readTime: "4 min read",
      isMain: false,
    },
    {
      title: "Indonesia: Exploring Bali and Beyond",
      imgUrl: "/assets/images/TripsStoriesSection/Image69.jpg",
      readTime: "5 min read",
      isMain: false,
    },
    {
      title: "Israel: From Jerusalem to the Desert",
      imgUrl: "/assets/images/TripsStoriesSection/Image70.jpg",
      readTime: "3 min read",
      isMain: false,
    },
    {
      title: "Turkey: A Journey Through the Ottoman Empire",
      imgUrl: "/assets/images/TripsStoriesSection/Image68.jpg",
      readTime: "4 min read",
      isMain: false,
    },
    {
      title: "Indonesia: Exploring Bali and Beyond",
      imgUrl: "/assets/images/TripsStoriesSection/Image69.jpg",
      readTime: "5 min read",
      isMain: false,
    },
    {
      title: "Israel: From Jerusalem to the Desert",
      imgUrl: "/assets/images/TripsStoriesSection/Image70.jpg",
      readTime: "3 min read",
      isMain: false,
    },
  ];

  return (
    <div className="max-w-8xl mx-auto px-10 py-10">
      <h2 className="text-3xl font-bold mb-6">Latest Trips & Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {stories.map((story) => (
          <Card
            key={story.title}
            title={story.title}
            imgUrl={story.imgUrl}
            readTime={story.readTime}
            isMain={story.isMain}
          />
        ))}
      </div>
      <div style={{ paddingTop: 200 }} />
    </div>
  );
};

export default TripsStoriesSection;
