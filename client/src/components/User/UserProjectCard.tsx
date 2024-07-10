import { useState } from "react";
import { ProjectType } from "../../types/Project";
import { unstake } from "../../utils/unstake";
import Loader from "../Loader";

type UserProjectCardProps = {
  projectData: ProjectType;
  amountStaked: number;
  amountReceived: number;
  onUnstake: () => void;
};

const UserProjectCard = ({ projectData, amountStaked, amountReceived, onUnstake }: UserProjectCardProps) => {
  const [unstakeLoading, setUnstakeLoading] = useState(false);

  return (
    <div
      className="border-[1px] border-[#40959D] rounded-xl py-[21px] px-[21px]
    flex flex-col gap-6 w-fit bg-[#141414] min-w-[450px]"
    >
      <div className="flex flex-row gap-6 justify-start items-center gap-[9px]">
        <img src="" alt="" className="rounded-full border-[3px] border-[#40959D] h-[75px] w-[75px]" />
        <div className="flex flex-col justify-center gap-[3px] items-start">
          <h2 className="text-[30px] text-[#f1f1f1]">{projectData.name}</h2>
          <div className="rounded-sm px-[6px] flex flex-row py-[3px] bg-[#40959D] text-[#000000] font-[Rale-SemiBold]">${projectData.ticker}</div>
        </div>
      </div>
      <div className="flex flex-row gap-[24px]">
        <div className="flex flex-col gap-[0px] items-start">
          <h5 className="text-[#40959D] text-[15px]">Amount Staked</h5>
          <h4 className="text-[15px] text-[#f1f1f1]">{amountStaked.toFixed(2)} $AoEth</h4>
        </div>
        <div className="flex flex-col gap-[0px] items-start">
          <h5 className="text-[#40959D] text-[15px]">Token Recieved</h5>
          <h4 className="text-[15px] text-[#f1f1f1]">
            {amountReceived.toFixed(2)} ${projectData.ticker}
          </h4>
        </div>
      </div>
      <div className="flex flex-row gap-[12px]">
        <button
          onClick={async () => {
            setUnstakeLoading(true);
            await unstake(projectData);
            await onUnstake();
            setUnstakeLoading(false);
          }}
          className={`rounded-md w-[120px] py-[3px] ${unstakeLoading ? "bg-gray-400" : "bg-[#40959D]"}`}
        >
          {unstakeLoading ? <Loader /> : "Unstake"}
        </button>
        {/* <button className="text-[#40959D] rounded-md w-[120px] py-[3px] border-[1px] border-[#40959D]">Stake More</button> */}
      </div>
    </div>
  );
};

export default UserProjectCard;
