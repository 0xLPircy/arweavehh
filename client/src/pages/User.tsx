import { ConnectButton, useActiveAddress } from "arweave-wallet-kit";
import { useEffect } from "react";
import { UserProjectCard } from "../components";
import { useProjects, useUserAoETH, useUserData } from "../utils/hooks";

const User = () => {
  const address = useActiveAddress();
  // const { connected } = useConnection();
  const { stakedAmounts, refresh: refreshUserTxns } = useUserData(address);
  const { aoeth: aoethBalance, refresh: refreshAoethBalance } = useUserAoETH(address);
  useEffect(() => {
    window.arweaveWallet.connect;
  }, []);

  const projects = useProjects();
  if (!address)
    return (
      <div className="text-white flex justify-center items-start h-60">
        <ConnectButton />
      </div>
    );
  // if (!stakedAmounts) return;
  // return (
  //   <div className="flex items-center justify-center h-screen">
  //     <div>
  //       <div className="animate-pulse space-y-2">
  //         <div className="bg-gray-300 h-6 w-48 rounded"></div>
  //         <div className="bg-gray-300 h-6 w-32 rounded"></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const totalStaked = stakedAmounts ? Object.values(stakedAmounts).reduce((acc: number, curr) => acc + curr.aoeth, 0) : null;

  return (
    <main className="w-[100vw] flex flex-col gap-12 font-[Rale-Regular] px-20">
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-[#40959D] text-[27px] tracking-widest">$AOEth Balance:</h2>
        {aoethBalance == null ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-300 h-6 w-48 rounded"></div>
          </div>
        ) : (
          <h3 className="text-[#f1f1f1] text-[24px] font-[Rale-Medium]">{aoethBalance.toFixed(2)} $AOEth</h3>
        )}
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-[#40959D] text-[27px] tracking-widest">Total $AOEth Staked:</h2>
        {totalStaked == null ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-300 h-6 w-48 rounded"></div>
          </div>
        ) : (
          <h3 className="text-[#f1f1f1] text-[24px] font-[Rale-Medium]">{totalStaked.toFixed(2)} $AOEth</h3>
        )}
      </div>
      {stakedAmounts && Object.keys(stakedAmounts).length && (
        <div className="flex flex-col gap-[21px]">
          <h3 className="text-[#40959D] text-[27px] tracking-widest">Projects $AoEth Staked in:</h3>
          <div className="grid grid-flow-col grid-rows-2 justify-start gap-[39px]">
            {Object.keys(stakedAmounts).map((projectTicker) => {
              const data = projects.find((p) => p.ticker === projectTicker);
              if (!data) return null;
              return (
                <UserProjectCard
                  onUnstake={async () => {
                    await Promise.all([refreshUserTxns(), refreshAoethBalance()]);
                  }}
                  amountReceived={stakedAmounts[projectTicker].projectToken}
                  amountStaked={stakedAmounts[projectTicker].aoeth}
                  projectData={data}
                  key={projectTicker}
                />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default User;
