import Slider from "@components/Slider";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        {" "}
        Trips and Attractions
      </span>
    </h1>
    <p className="desc text-center">
      TripWise is an open-source tool for discovering and sharing trips and
      attractions.
    </p>
    <hr className="my-8 max-w-xl mx-auto" />
    {<Slider />}
  </section>
);

export default Home;
