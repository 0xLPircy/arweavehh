import website from "/icons/website.svg";
import discord from "/icons/discord.svg";
import github from "/icons/github.svg";
import x from "/icons/x.svg";

import { ProjectType } from "../types/Project";
import { stake } from "../utils/stake";
import { ConnectButton, useActiveAddress } from "arweave-wallet-kit";
import { useState } from "react";
import { useStakeLoader, useUserAoETH } from "../utils/hooks";
import Loader from "./Loader";
import { humanizeDuration } from "../utils/helpers";

export default function ProjectFull({ project }: { project: ProjectType }) {
  const address = useActiveAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState("0");
  const [amount, setAmount] = useState("");
  const [stakeLoading, setStakeLoading] = useState(false);

  const { start, stop, projectConfirmedStake, receivedAoETH: recievedAoETH, rewardsSent } = useStakeLoader(project, address);
  if (step == "2" && rewardsSent) {
    stop();
  }

  console.log({ project });

  const availableAOEth = useUserAoETH(address).aoeth ?? 0;

  const handleMaxClick = () => {
    setAmount(availableAOEth.toString());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "" || Number(newValue) < 0) {
      setAmount("");
      return;
    }
    if (Number(newValue) > availableAOEth) {
      setAmount(availableAOEth.toString());
      return;
    }
    setAmount(event.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setStep("1");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStakeLoading(false);
    setAmount("");
    setStep("0");
  };

  return (
    <div className=" overflow-hidden">
      <div className="h-48 bg-gray-400 relative">
        <div className="absolute inset-x-0 top-full -mt-10 flex justify-center">
          <img src={project.logo} className="h-20, w-20" />
        </div>
      </div>
      <div className="px-20 flex flex-col gap-[30px] pt-[30px]">
        <div className="flex flex-col">
          <div className="flex flex-row justify-start items-center gap-[12px]">
            <h2 className="text-[45px] text-[#40959D] font-[Rale-Bold]">{project.name}</h2>
            <div className="rounded-sm px-[12px] flex flex-row items-center font-[Rale-SemiBold] py-[3px] bg-[#393939] h-fit text-[#f1f1f1]">${project.ticker}</div>
          </div>
          <div className="text-[#f1f1f1] text-[15px]">{project.description}</div>
        </div>
        <div className="flex flex-col gap-[18px]">
          <h3 className=" text-[#40959D] text-[33px] font-[Rale-SemiBold]">Founders</h3>
          <div className=" flex flex-row gap-[21px]">
            {project.founders.map((founderData) => {
              return (
                <div className="flex flex-col items-center gap-[6px]">
                  <img src={founderData.photo} alt={founderData.name} className="h-16 w-16 rounded-full object-scale-down" />
                  <p className="text-[#40959D] font-[Rale-Bold]">{founderData.name}</p>
                  <p className="text-[#f1f1f1]">{founderData.designation}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-[18px]">
          <h3 className="text-[33px] text-[#40959D] font-[Rale-SemiBold]">Socials</h3>
          <div className="flex flex-col gap-4 items-start justify-start text-[#f1f1f1] underline">
            {project.socials.website && (
              <a href={project.socials.website} className="flex flex-row gap-[15px]">
                <img alt="website link" src={website} className=" h-[30px] w-[30px] text-customBlue rounded-full"></img> <h6>{project.socials.website}</h6>
              </a>
            )}
            {project.socials.github && (
              <a href={project.socials.github} className="flex flex-row gap-[15px]">
                <img alt="github link" src={github} className=" h-[30px] w-[30px] text-customBlue rounded-full"></img> <h6>{project.socials.github}</h6>
              </a>
            )}
            {project.socials.x && (
              <a href={project.socials.x} className="flex flex-row gap-[15px]">
                <img alt="x link" src={x} className=" h-[30px] w-[30px] text-customBlue rounded-full"></img> <h6>{project.socials.x}</h6>
              </a>
            )}
            {project.socials.discord && (
              <a href={project.socials.discord} className="flex flex-row gap-[15px]">
                <img alt="discord link" src={discord} className=" h-[30px] w-[30px] text-customBlue rounded-full"></img> <h6>{project.socials.discord}</h6>
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[18px]">
          <h3 className="text-[30px] text-[#40959D] font-[Rale-SemiBold]">Stake Details</h3>
          <p className="text-[#f1f1f1] text-[15px]">
            Cooldown Period : <span className="text-[#40959D]">{humanizeDuration(project.cooldownPeriod)}</span>
            <br />
            Reward:{" "}
            <span className="text-[#40959D]">
              1 $AOEth = {project.aoethRewardRate} ${project.ticker}
            </span>
          </p>
          {address ? (
            <button
              onClick={async () => {
                openModal();
              }}
              className="bg-[#40959D] rounded-md px-[24px] py-[3px] w-fit"
            >
              Stake
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[#626262] bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-fit max-w-[450px] bg-[#111111] p-8 rounded-lg ">
              <button onClick={closeModal} className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-gray-600">
                &times;
              </button>
              {step == "1" && (
                <>
                  <h2 className="text-[30px] font-semibold text-[#f1f1f1]">
                    <span className="text-[#40959D]">Stake </span>$AOEth, <span className="text-[#40959D]"> Get </span>${project.ticker}{" "}
                    {/* <span className="text-[#40959D]">in return</span> */}
                  </h2>
                  <div className="mb-6">
                    <div className="text-[#40959D]">
                      Available $AOEth: <span className="font-semibold text-[#f1f1f1] lining-figures">{availableAOEth}</span>
                    </div>
                    <h4 className="text-[#8D8D8D] font-[Rale-SemiBold] text-[13.5px]">Enter quantity of $AOEth to be staked</h4>
                    <div
                      className="flex items-center justify-between rounded bg-[#1A1A1A] text-[#f1f1f1]
                pl-2"
                    >
                      <input
                        disabled={stakeLoading}
                        type="number"
                        value={amount}
                        onChange={handleChange}
                        title="$AOEth to be staked"
                        className="bg-[#00000000] p-2 w-full h-full"
                      />
                      <div className="h-full min-w-fit">
                        <button onClick={handleMaxClick} className="bg-[#111111] border-[2px] border-[#121212] text-white px-3 py-2 rounded min-w-fit m-2">
                          GO MAX
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded mb-6 max-w-[100%]">
                    <p className="text-[#8D8D8D] text-[12px]">{`On staking $AOEth you will receive ${amount ? parseFloat(amount) * project.aoethRewardRate : "-"} of $${
                      project.ticker
                    }. There is a cool down period of ${humanizeDuration(project.cooldownPeriod)} for unstaking your $AOEth.`}</p>
                  </div>
                  <button
                    onClick={async () => {
                      setStakeLoading(true);
                      const startDate = new Date();
                      await stake(project, parseFloat(amount), address);
                      start(startDate);
                      setStep("2");
                      setStakeLoading(false);
                    }}
                    disabled={amount === "" || parseFloat(amount) <= 0 || parseFloat(amount) > availableAOEth || stakeLoading}
                    className={`flex gap-4 w-fit ${stakeLoading ? "bg-gray-400" : "bg-[#205156]"} text-[#f1f1f1] py-[6px] px-[18px] rounded`}
                  >
                    {stakeLoading ? <Loader /> : ""}
                    Stake $AOEth
                  </button>
                </>
              )}
              {step == "2" && (
                <div className="relative">
                  <div className="absolute h-0 inset-0 flex mt-2 ml-2">
                    <div className="w-1 h-[100px] bg-teal-300"></div>
                  </div>
                  <div className="relative z-10 flex flex-col space-y-6">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-teal-600 ${recievedAoETH ? "bg-teal-600" : "bg-gray-800"}  text-white`}>✓</div>
                      <div className={`ml-4 ${recievedAoETH ? "text-teal-300" : "text-white"} text-lg`}>
                        {amount} $AOEth staked on {project.name}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-teal-600 ${projectConfirmedStake ? "bg-teal-600" : "bg-gray-800"} text-white`}>
                        ✓
                      </div>
                      <div className={`ml-4 ${projectConfirmedStake ? "text-teal-300" : "text-white"} text-lg`}>{project.name} confirmed deposit</div>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-teal-600 ${rewardsSent ? "bg-teal-600" : "bg-gray-800"} text-white`}>✓</div>

                      <div className={`ml-4 ${rewardsSent ? "text-teal-300" : "text-white"} text-lg`}>${project.ticker} reward sent to your wallet</div>
                    </div>
                  </div>
                  <button
                    disabled={!rewardsSent}
                    onClick={() => (window.location.href = "/profile")}
                    className={`${!rewardsSent ? "bg-gray-400" : "bg-[#205156]"} text-[#f1f1f1] py-[6px] px-[18px] rounded m-4`}
                  >
                    {rewardsSent ? (
                      "See Your Profile"
                    ) : (
                      <div className="flex gap-4">
                        <Loader />
                        Confirming Transaction
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
