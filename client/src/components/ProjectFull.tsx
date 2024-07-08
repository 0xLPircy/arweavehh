import website from "/icons/website.svg";
import discord from "/icons/discord.svg";
import github from "/icons/github.svg";
import x from "/icons/x.svg";

import { ProjectType } from "../types/Project";

export default function ProjectFull({ project }: { project: ProjectType }) {
  return (
    <div className=" mx-auto overflow-hidden">
      <div className="h-48 bg-gray-300 relative">
        <div className="absolute inset-x-0 top-full -mt-10 flex justify-center">
          <div className="h-20 w-20 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl text-customBlue font-bold">{project.name}</h2>
        <div className="mt-4 text-[#D8D4D4] space-y-2">{project.description}</div>
        <div className="mt-6">
          <div className="bg-gray-300 rounded-full px-4 py-1 text-xs font-medium text-gray-700 inline-block">{project.ticker}</div>
        </div>
        <h3 className="mt-8 text-customBlue text-lg font-semibold">Founders</h3>

        <div className="mt-4 flex space-x-4">
          {project.founders.map((founderData) => {
            return (
              <div className="flex flex-col items-center">
                <div>{<img src={founderData.photo} alt={founderData.name} className="h-16 w-16 rounded-full" />}</div>
                <p className="text-customBlue font-bold">{founderData.name}</p>
                <p className="text-white">{founderData.designation}</p>
              </div>
            );
          })}
        </div>

        <h3 className="mt-8 text-lg text-customBlue font-semibold">Socials</h3>
        <div className="mt-4 flex-col gap-4 items-center">
          {project.socials.website && (
            <a href={project.socials.website}>
              <img alt="website link" src={website} className="h-6 text-customBlue w-6 rounded-full"></img>
            </a>
          )}
          {project.socials.github && (
            <a href={project.socials.github}>
              <img alt="github link" src={github} className="h-6 w-6 rounded-full"></img>
            </a>
          )}
          {project.socials.x && (
            <a href={project.socials.x}>
              <img alt="x link" src={x} className="h-6 w-6 rounded-full"></img>
            </a>
          )}
          {project.socials.discord && (
            <a href={project.socials.discord}>
              <img alt="discord link" src={discord} className="h-8 w-8 rounded-full"></img>
            </a>
          )}
        </div>

        <h3 className="mt-8 text-lg font-semibold">Stake</h3>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="bg-gray-300 rounded-full px-4 py-1 text-xs font-medium text-gray-700 inline-block"></div>
        </div>
      </div>
    </div>
  );
}
