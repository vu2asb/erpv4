import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col item-center lg:mt-5">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Are your software development challenges
        <br></br>
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Keeping you awake?
        </span>
        <br />
      </h1>
      <br />
      <h1 className="text-base mt-8 text-center tracking-wide text-neutral-400">
        If you are a software development company grappling with operational
        challenges. If you have the urgency, unwavering commitment, and
        resources to conquer these obstacles to propel your business towards
        growth, then my consulting services are tailored precisely for you.{" "}
        <br /> <br />I specialize in assisting companies like yours in
        navigating and overcoming complex delivery hurdles.
        <br />
        <br />
        If you\'re ready to seize this opportunity for transformation and
        progress, I am here to support you every step of the way.
        <br />
        <br />
        Let\'s work together to unlock your organization's full potential.
      </h1>
      <div className="sm: mt-6 flex flex-col space-y-2 text-center justify-center md:flex-row gap-2">
        <a href="services" className="sm: w-full bg-slate-100 text-black px-3 py-2 border-solid md:w-[30%] mt-2 lg:w-[25%]">Services</a>
        <a href="" className="sm: w-full  bg-primary text-white  px-3 py-2 border-solid md:w-[30%] mt-2 lg:w-[25%]">Free Consultation</a>
      </div>
    </div>
  );
};

export default HeroSection;
