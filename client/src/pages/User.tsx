import { useActiveAddress } from "arweave-wallet-kit";
import { UserProjectCard } from "../components";
import { useProjects, useUserAoETH, useUserData } from "../utils/hooks";

const User = () => {
  const address = useActiveAddress();
  const { stakedAmounts } = useUserData(address);
  const aoethBalance = useUserAoETH(address) ?? 0;

  const projects = useProjects();
  if (!address) return <div className="text-white">Connect Wallet</div>;
  if (!stakedAmounts) return <div className="text-white">Loading...</div>;
  const totalStaked = stakedAmounts ? Object.values(stakedAmounts).reduce((acc: number, curr) => acc + curr.aoeth, 0) : 0;

  return (
    <main className="w-[100vw] flex flex-col gap-12 font-[Rale-Regular] px-20">
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-[#40959D] text-[27px] tracking-widest">$AOEth Balance:</h2>
        <h3 className="text-[#f1f1f1] text-[24px] font-[Rale-Medium]">{aoethBalance.toFixed(2)} $AOEth</h3>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-[#40959D] text-[27px] tracking-widest">Total $AOEth Staked:</h2>
        <h3 className="text-[#f1f1f1] text-[24px] font-[Rale-Medium]">{totalStaked.toFixed(2)} $AOEth</h3>
      </div>
      <div className="flex flex-col gap-[21px]">
        <h3 className="text-[#40959D] text-[27px] tracking-widest">Projects $AoEth Staked in:</h3>
        <div className="grid grid-flow-col grid-rows-2 justify-start gap-[39px]">
          {Object.keys(stakedAmounts).map((projectTicker) => {
            const data = projects.find((p) => p.ticker === projectTicker);
            if (!data) return null;
            return (
              <UserProjectCard
                amountReceived={stakedAmounts[projectTicker].projectToken}
                amountStaked={stakedAmounts[projectTicker].aoeth}
                projectData={data}
                key={projectTicker}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default User;
