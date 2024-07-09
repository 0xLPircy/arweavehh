import { UserProjectCard } from "../components";

const User = () => {
  return (
    <main className="w-[100vw] flex flex-col gap-12 font-[Rale-Regular] px-20">
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-[#40959D] text-[27px] tracking-widest">
          Total $AOEth Staked:
        </h2>
        <h3 className="text-[#f1f1f1] text-[24px] font-[Rale-Medium]">
          {user.TotalAoEth} $AOEth
        </h3>
      </div>
      <div className="flex flex-col gap-[21px]">
        <h3 className="text-[#40959D] text-[27px] tracking-widest">
          Projects $AoEth Staked in:
        </h3>
        <div className="grid grid-flow-col grid-rows-2 justify-start gap-[39px]">
          <UserProjectCard />
          <UserProjectCard />
          <UserProjectCard />
        </div>
      </div>
    </main>
  );
};

export default User;

const user = {
  id: "",
  TotalAoEth: "5000",
};
