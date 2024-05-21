import React from 'react'
import { BackgroundGradient } from './BackgroundGradient'
import { dummyDays } from '@utils/dummydays'
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import { cn } from '@lib/utils';

const borderLineColorClasses = [
    'border-blue-500', 'border-red-500', 'border-green-500',
    'border-yellow-500', 'border-purple-500', 'border-pink-500',
];
const getBorderLineColorClass = (dayNumber: number) => {
    return borderLineColorClasses[(dayNumber - 1) % borderLineColorClasses.length];
};
const attractionCardFont = Oswald({
    subsets: ["latin"],
    weight: ["500"],
});

const formatTime = (dateString: string): string => {
    const dateObject = new Date(dateString);
  
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    const amPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
  
    return `${formattedHours}:${minutes} ${amPm}`;
  }

const DaysViewer = ({ tripDays }: { tripDays: any[] }) => {
    return (
        <div className='relative p-10 font-bold mt-10'

        >

            {tripDays.map((day, index) => (
                <div
                    key={index}
                    className='mb-8'
                >
                    <div className='flex items-start relative'>
                        <div className='min-w-[50px] text-center'>
                            <span className='block text-lg font-medium'>Day</span>
                            <span className='block text-5xl font-bold'>{index+1}</span>
                        </div>
                        <div className={`flex-grow ml-4 pl-20 border-l-8 ${getBorderLineColorClass(index+1)}
          grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                            {day.map((attraction: any, attractionIndex: any) => (
                                <div key={`day-${index}-${attractionIndex}`} className='flex flex-col items-center'>
                                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-sky-100 dark:bg-zinc-900 
                object-cover object-center w-full h-auto shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                                        <div>
                                            <p className={cn("font-thin text-lg leading-[40px] h-[var(--gs)] tracking-[0.2px] text-gray-600 underline underline-offset-4", attractionCardFont.className)}>
                                                {formatTime(attraction.day)}
                                            </p>
                                            <p className={cn("text-base sm:text-xl text-black mb-5 dark:text-neutral-200 font-medium", attractionCardFont.className)}>
                                                {attraction.attractionId.title}
                                            </p>
                                        </div>
                                        {/* <div className='relative w-[200px] h-[200px]'> */}
                                        <Image
                                            src={attraction.attractionId.image}
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
        </div>
    )
}

export default DaysViewer