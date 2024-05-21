import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { AnimatedTooltip } from './AnimatedToolTip'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import HeartInteraction from './HeartInteraction'

export interface TripCoverUserProfile {
    id: number
    name: string
    designation: string
    image: string
}

const TripCover = ({ tripName, tripImage, numberOfDays, tripRating, tripProfile, tripCreatedAt, tripCountry }: 
    { tripName: string, tripImage: string, numberOfDays: number, tripRating: string, tripProfile: TripCoverUserProfile, tripCreatedAt:string,
      tripCountry: string,
     }) => {
  return (
    <div className='relative w-full h-[500px] max-w-8xl mx-auto'>
    <Image
      src={tripImage}
      alt=""
      priority
      quality={100}
      className="z-0 brightness-50 object-cover"
      fill
    />
    <div className='z-10 relative flex flex-col justify-end min-h-[26rem] pt-15  text-4xl text-white 
     px-20'>
      <h1 className='font-bold text-[var(--fs-400)] leading-[calc(2.25*var(--gs))] tracking-tighter'>
        {tripName}
      </h1>
      <div>
        <div className='text-xl'>
          <span className='items-center inline-flex pt-2'>
            <Star
              size={25}
              fill="yellow"
              strokeWidth={0}
            />
            <span className='font-bold'>{tripRating}</span>
          </span>
        </div>
        <div className='pt-5 text-[#e2e2e2] text-xl'>
          <div className='items-center'>
            <span className='font-bold'>{`${numberOfDays} days`}</span><span> in </span><span className='font-bold'>{tripCountry}</span>
          </div>
          <span>
            {`Created at ${tripCreatedAt} - by`}
          </span>
          <div className="flex items-center space-x-5 mt-3">
            <AnimatedTooltip items={[tripProfile]} />
            <span className='font-semibold text-orange-300 italic pl-3'>{tripProfile.name}</span>
          </div>
        </div>
        {/* <div className="">
          {types.map((type, index) => (
            <Badge
              key={index}
              className="transform transition-transform hover:scale-105 cursor-pointer mr-2"
              variant="secondary"
            >
              {type}
            </Badge>
          ))}
        </div> */}
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
  )
}

export default TripCover