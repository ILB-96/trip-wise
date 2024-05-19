// pages/about.js

import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className=" lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
            About Us
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Welcome to our travel app, your ultimate companion for discovering,
            planning, and sharing unforgettable travel experiences. Our mission
            is to help you find story-worthy moments and make your journeys more
            enjoyable and well-organized.
          </p>
        </div>
        <div className="w-full lg:w-8/12">
          <Image
            width={700}
            height={1000}
            className="w-full h-full"
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of People"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Our journey began with a simple idea: to create a platform where
            travelers can easily plan their trips and share their adventures
            with the world. We believe that every journey has a story to tell,
            and we are here to help you tell yours. Join us in exploring new
            destinations and sharing your experiences with a community of fellow
            travelers.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={700}
                height={1000}
                className="md:block hidden"
                src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                alt="Shoval featured Image"
              />
              <Image
                width={700}
                height={1000}
                className="md:hidden block"
                src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                alt="Shoval featured Image"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                Shoval
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={700}
                height={1000}
                className="md:block hidden"
                src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                alt="Kfir featured Image"
              />
              <Image
                width={700}
                height={1000}
                className="md:hidden block"
                src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                alt="Kfir featured Image"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                Kfir
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={700}
                height={1000}
                className="md:block hidden"
                src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                alt="Jameel featued Image"
              />
              <Image
                width={700}
                height={1000}
                className="md:hidden block"
                src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                alt="Jameel featued Image"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                Jameel
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={700}
                height={1000}
                className="md:block hidden"
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Daniel featured image"
              />
              <Image
                width={700}
                height={1000}
                className="md:hidden block"
                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                alt="Daniel featured image"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                Daniel
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={700}
                height={1000}
                className="md:block hidden"
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Israel featured image"
              />
              <Image
                width={700}
                height={1000}
                className="md:hidden block"
                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                alt="Israel featured image"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                Israel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// return (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-4">About Us</h1>
//       <p className="text-lg mb-4">
//         Welcome to our travel app! Our mission is to help you plan your trips
//         and share your travel experiences with the world. Whether you're looking
//         for inspiration or want to document your journey, we've got you covered.
//       </p>
//       <p className="text-lg mb-4">
//         Our platform allows you to discover amazing destinations, plan your
//         travel itinerary, and connect with other travelers. Join us on this
//         exciting journey and make the most out of your travel experiences!
//       </p>
//       <p className="text-lg">
//         Thank you for being a part of our community. Happy travels!
//       </p>
//     </div>
//   </div>
// );
