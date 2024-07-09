const HeroStats = ({ stat, text }: any) => {
  return (
    <div className="flex flex-col justify-center text-center items-center ">
      <h3 className="text-[33px] font-[Rale-SemiBold] lining-figures">
        {stat}
      </h3>
      <h6 className="text-[15px] font-[Rale-Light]">{text}</h6>
    </div>
  );
};

export default HeroStats;
