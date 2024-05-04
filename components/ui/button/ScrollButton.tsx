"use client";
const ScrollButton = ({ scrollTo }: { scrollTo: number }) => {
  const handleClick = () => {
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-4xl"
      onClick={handleClick}
    >
      &#x2193;
    </button>
  );
};

export default ScrollButton;
