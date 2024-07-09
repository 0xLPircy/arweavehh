import HeroStats from "./HeroStats";

const Hero = () => {
  return (
    <section className="w-[100vw] text-[#eeeeee] flex flex-col justify-center items-center px-20 pt-[90px] pb-[210px]">
      <div className=" flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-between items-center w-fit gap-28">
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
        </div>
        <h1 className="text-[39px]  text-center font-[Rale-SemiBold] mx-[-100px] w-fit">
          Explore the{" "}
          <span className=" text-[#40959D] block">
            Permissonless Ecosystem Funding
          </span>{" "}
          platform on AO
        </h1>
        <div className="flex flex-col justify-between items-center w-fit gap-28">
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
          <HeroStats stat="50%" text=" Projects Built on Arweave" />
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <button className="hover:bg-[#40959d36] hover:tracking-wider rounded-md w-[180px] py-[9px] border-[1px] border-[#40959D]">
          Add your project
        </button>
        <button className="hover:bg-[#40959ddf] hover:tracking-wider rounded-md w-[180px] py-[9px] bg-[#40959D]">
          Explore Projects
        </button>
      </div>
    </section>
  );
};

export default Hero;
