import Link from "next/link";
import Slider from "@components/Slider";
import ScrollButton from "@components/ui/button/ScrollButton";

const Home = () => {
  return (
    <>
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-shadow"
        style={{ backgroundImage: "url('/assets/images/mountain.png')" }}
      >
        <h1 className="text-6xl mb-5">Discover story-worthy travel moments</h1>
        <p className="text-2xl mb-5">Plan Your Trip - Travel Like a Pro</p>
        <Link
          href="/auth/login"
          className="mt-5 py-3 px-6 text-lg bg-purple-700 rounded-full hover:bg-purple-800 transition-colors cursor-pointer"
        >
          START
        </Link>
      </div>
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-shadow"
        style={{ backgroundImage: "url('/assets/images/plane.png')" }}
      >
        <h1 className="text-6xl">Share your experience with the world</h1>
        <Link
          href="/auth/login"
          className="mt-5 py-3 px-6 text-lg bg-purple-700 rounded-full hover:bg-purple-800 transition-colors cursor-pointer"
        >
          SHARE
        </Link>
        {/*<ScrollButton scrollTo={2 * window.innerHeight} />*/}
      </div>
      <hr className="my-8 max-w-xl mx-auto" />
      <Slider />
    </>
  );
};

export default Home;
