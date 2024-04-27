"use client"
export const MenuBackground = () => {
    return (
      <div className="relative bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="flex justify-center items-center h-screen">
          {/* Overlay with a slight dark tint to make content pop */}
          <div className="absolute inset-0 bg-black opacity-25"></div>
          
          {/* Decorative elements suggesting travel, like paths and compass */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 border-4 border-dashed border-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-solid border-white rounded-full"></div>
          
          {/* Simulating a journey with dashed lines */}
          <svg className="absolute w-full h-full" viewBox="0 0 800 600">
            <path d="M 100 100 Q 400 300 700 100" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 100 500 Q 400 300 700 500" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>
    );
  };