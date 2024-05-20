"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const TripPage = ({ params }: { params: { id: string } }) => {
  const [fetchedComments, setComments]: [any, Dispatch<SetStateAction<any>>] =
    useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/itinerary/${params.id}/getComments`, {
        method: "GET",
      });
      const result = await response.json();
      setComments(result);
    };
    fetchComments();
  }, []);

  return (
    <div className=''>
      <div className='relative w-full h-[500px] max-w-8xl mx-auto'>
        <Image
          src="https://a.cdn-hotels.com/gdcs/production18/d1838/041ae6b1-0a88-4c22-a648-53a22dd4a006.jpg"
          alt="Santorini"
          priority
          quality={100}
          className="z-0 brightness-50 object-cover"
          fill
        />
        <div className='z-10 relative flex flex-col justify-end min-h-[26rem] pt-15  text-4xl text-white 
         px-20'>
          <h1 className='font-bold text-[var(--fs-400)] leading-[calc(2.25*var(--gs))] tracking-tighter'>
            Santorini Wonderful Trip 🐱‍💻
          </h1>
          <div>
            <div className='text-xl'>
              <span className='items-center inline-flex'>
                <Star
                  size={25}
                  fill="yellow"
                  strokeWidth={0}
                />
                4.2
              </span>
            </div>
            <div className='pt-5 text-[#e2e2e2] text-xl'>
              <div className='items-center'>
                <span className='font-bold'>{`${dummyDays.length} days`}</span><span> in </span> <span className='font-bold'>Greece</span>
              </div>
              <span>
                Created at 30/04/2024 - by
              </span>
              <div className="flex items-center space-x-5 mt-3">
                <AnimatedTooltip items={profile} />
                <span className='font-semibold text-orange-300 italic pl-3'>Jameel Gharra</span>
              </div>
            </div>
            <div className="">
              {types.map((type, index) => (
                <Badge
                  key={index}
                  className="transform transition-transform hover:scale-105 cursor-pointer mr-2"
                  variant="secondary"
                >
                  {type}
                </Badge>
              ))}
            </div>
            <div className='flex space-x-5'>
              <HeartInteraction />
              <Button
                className=' bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-300
               mt-10 text-center'
              >
                ➕Duplicate
              </Button>
            </div>
          </div>
        </div>
      </div>
      <motion.div className='relative p-10 font-bold mt-10'
        ref={ref} // Assign reference
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}

      >

        {dummyDays.map((day, index) => (
          <div
            key={index}
            className='mb-8'
          >
            <div className='flex items-start relative'>
              <div className='min-w-[50px] text-center'>
                <span className='block text-lg font-medium'>Day</span>
                <span className='block text-5xl font-bold'>{day.dayNumber}</span>
              </div>
              <div className={`flex-grow ml-4 pl-20 border-l-8 ${getBorderLineColorClass(day.dayNumber)}
              grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {day.activities.map((activity, activityIndex) => (
                  <div key={`day-${day.dayNumber}-${activityIndex}`} className='flex flex-col items-center'>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-sky-100 dark:bg-zinc-900 
                    object-cover object-center w-full h-auto shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                      <div>
                        <p className={cn("font-thin text-lg leading-[40px] h-[var(--gs)] tracking-[0.2px] text-gray-600 underline underline-offset-4", activityCardFont.className)}>
                          {activity.time}
                        </p>
                        <p className={cn("text-base sm:text-xl text-black mb-5 dark:text-neutral-200 font-medium", activityCardFont.className)}>
                          {activity.name}
                        </p>
                      </div>
                      {/* <div className='relative w-[200px] h-[200px]'> */}
                      <Image
                        src={activity.image}
                        alt=""
                        // layout='fill'
                        width={400}
                        height={400}
                        className="w-[200px] h-[200px] object-cover object-center rounded-lg shadow-lg"
                      />
                      {/* </div> */}
                    </BackgroundGradient>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/*  */}
      <motion.div
        className='space-y-10'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        }}
      >
        <motion.div
          className="pl-20 flex items-center py-8 px-4 bg-gradient-to-r from-gray-100 to-teal-200 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center mt-2 flex space-x-5 items-center">
            <p className="text-gray-600 font-medium">How would you rate this itinerary?</p>
            <Rating rating={currentRating} onRate={handleRate} />
          </div>
        </motion.div>
        <CommentSection tripId={params.id} />
      </motion.div>
    </div>
  );
};

export default ItineraryPage;
