import website from "/icons/website.svg";
import discord from "/icons/discord.svg";
import github from "/icons/github.svg";
import x from "/icons/x.svg";

import { ProjectType } from "../types/Project";
import { stake } from "../utils/stake";
import { ConnectButton, useActiveAddress } from "arweave-wallet-kit";
import { useStakeLoader } from "../utils/hooks";

export default function ProjectFull({ project }: { project: ProjectType }) {
  const address = useActiveAddress();
  const { start, stop, projectConfirmedStake, receivedAoETH: recievedAoETH, rewardsSent } = useStakeLoader(project, address);
  if (!address) return <div>Connect Wallet</div>;

  console.log({ projectConfirmedStake, recievedAoETH, rewardsSent });
  if (rewardsSent) {
    stop();
    return <div className="text-white">Stake Successful</div>;
  }

  return (
    <div className=" overflow-hidden">
      <div className="h-48 bg-gray-300 relative">
        <div className="absolute inset-x-0 top-full -mt-10 flex justify-center">
          <div className="h-20 w-20 bg-gray-400 rounded-full"></div>
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
                  <img src={founderData.photo} alt={founderData.name} className="h-16 w-16 rounded-full" />
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ex perspiciatis assumenda suscipit soluta voluptate id fugiat totam vitae veritatis cumque nam eligendi
            ipsam voluptatum, ratione error mollitia, saepe architecto.
          </p>
          {address ? (
            <button
              onClick={async () => {
                const startDate = new Date();
                await stake(project, address);
                start(startDate);
              }}
              className="bg-[#40959D] rounded-md px-[24px] py-[3px] w-fit"
            >
              Stake
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
}
