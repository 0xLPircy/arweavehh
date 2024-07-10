// import HeroStats from "./HeroStats";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-[100vw] text-[#eeeeee] flex flex-col justify-center items-center px-20 pt-[15px] pb-[90px]">
      <div className="relative flex flex-row justify-between items-center w-full">
        {/* <div className="flex flex-col justify-between items-center w-fit gap-28">
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
        </div> */}
        <div className="w-fit ltrAnim">
          <img src="/HeroCircle.svg" className="w-[390px] h-[390px]" />
        </div>
        <div className="w-fit absolute inset-0 mx-auto rotate-[-90deg] z-0">
          <img src="/HeroCircle.svg" className="w-[390px] h-[390px]" />
        </div>
        <h1 className="text-[39px] ttbAnim text-center font-[Rale-SemiBold] z-10 w-fit mx-[-120px]">
          Explore the{" "}
          <span className=" text-[#40959D] block">
            Permissonless Ecosystem Funding
          </span>{" "}
          platform on AO
        </h1>
        <div className="w-fit rtlAnim">
          <img
            src="/HeroCircle.svg"
            className="w-[390px] h-[390px] rotate-180"
          />
        </div>
        {/* <div className="flex flex-col justify-between items-center w-fit gap-28">
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
        </div> */}
      </div>
      <div className="flex flex-row gap-6 fadeIn pt-9">
        <Link to="/addProject">
          <button className="hover:bg-[#40959d36] hover:tracking-wider rounded-md w-[180px] py-[9px] border-[1px] border-[#40959D]">
            Add your project
          </button>
        </Link>
        <a href="https://github.com/0xLPircy/arweavehh">
          <button className="hover:bg-[#40959ddf] hover:tracking-wider rounded-md w-[180px] py-[9px] bg-[#40959D]">
            Explore
          </button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
