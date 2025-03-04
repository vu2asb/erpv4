import { Button } from "./ui/button";

const AboutSection = () => {
  return (
    <div className="flex flex-col item-center mt-2 lg:mt-2">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        ABOUT ME
        <br></br>
        <span className="text-2xl bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
          Differentiated Value -thru- Differentiated Capability
        </span>
        <br />
      </h1>
      <br />
      <h1 className="text-[20px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-left tracking-wide">
        Experience
      </h1>
      <h2 className="text-base mt-1 text-justify tracking-wide text-neutral-400">
        I am a software delivery professional with over thirty years of
        experience across a wide range of industries, technologies and
        geographies. In the early part of my career I held leadership positions
        with industry leaders like Dell Services, Perot Systems, HPS and CMC
        Ltd. (now Tata Consultancy Services) where I performed a variety of
        operational, strategic, and general management roles like setting up
        delivery centers in China, Ireland and Mexico.
      </h2>
      <h1 className="text-[20px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-left tracking-wide">
        Unique Expertise
      </h1>
      <h2 className="text-base mt-1 text-justify tracking-wide text-neutral-400">
        My forte is delivery management; I spent a significant part of my career
        in turning projects around and gained deep insights into root causes
        leading to project failure. I identified the best practices, leading
        indicators, checks and balances and ways to set up lean governance to
        provide early warning that triggers preemptive actions to avoid adverse
        outcomes.
      </h2>
      <h1 className="text-[20px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-left tracking-wide">
        Proof of the pudding -- Empowering Small and Medium-Sized Organizations
      </h1>
      <h2 className="text-base mt-1 text-justify tracking-wide text-neutral-400">
        I have successfully applied this body of knowledge to organizations in
        the small to medium sized organizations to help them improve their
        business performance metrics like gross margin, effectively deal with
        their software delivery operational challenges like quality, cost and
        schedule variance, customer satisfaction and help them achieve their
        full potential by coaching, mentoring, guiding, and training them.
      </h2>
      <h1 className="text-[20px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-left tracking-wide">
        Supporting Startups
      </h1>
      <h2 className="text-base mt-1 text-justify tracking-wide text-neutral-400">
        The service or product offerings of most startups, whether they are
        Non-Tech or Tech, heavily rely on technology platforms as an enabler,
        and they are intimately intertwined. Often, startup founders lack the
        time, resources, and experience to plan and build the necessary
        technology or to outsource it. That&apos;s where I come in to assist
        startups.
      </h2>
      <div>
        {/* <Button className="mt-6 text-[20px] ">Free Consultation</Button> */}
        <div className="sm: mt-6 flex flex-col space-y-2 text-center justify-center md:flex-row gap-2">
          {/* <a
            href=""
            className="sm: w-full bg-slate-100 text-black px-3 py-2 border-solid md:w-[30%] mt-2 lg:w-[25%]"
          >
            Read More
          </a> */}
          <a
            href="http://www.linkedin.com/in/ashok-k-singh
"
            className="sm: w-full  bg-primary text-white  px-3 py-2 border-solid md:w-[30%] mt-2 lg:w-[25%]"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
