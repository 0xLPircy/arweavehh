import { useEffect, useState } from "react";
import { addProject } from "../utils/hooks";
import { useConnection } from "arweave-wallet-kit";

const AddProject = () => {
  const { connected } = useConnection();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tokenName, setTokenName] = useState("");
  //   const [founders, setFounders] = useState([]);
  const [projectProcess, setProjectProcess] = useState("");
  const [founderName, setFounderName] = useState("");
  const [founderDesignation, setFounderDesignation] = useState("");
  const [founderDescription, setFounderDescription] = useState("");
  const [tokenProcess, setTokenProcess] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [coolDown, setCoolDown] = useState("");
  const [conversion, setConversion] = useState("");
  useEffect(() => {
    console.log("projectName:", projectName);
    console.log("projectDescription:", projectDescription);
    console.log("tokenName:", tokenName);
    console.log("founderName:", founderName);
    console.log("founderDesignation:", founderDesignation);
    console.log("founderDescription:", founderDescription);
    console.log("tokenProcess:", tokenProcess);
    console.log("websiteLink:", websiteLink);
    console.log("githubLink:", githubLink);
    console.log("twitterLink:", twitterLink);
    console.log("discordLink:", discordLink);
    console.log("coolDown:", coolDown);
    console.log("conversion:", conversion);
  }, [
    projectName,
    projectDescription,
    tokenName,
    founderName,
    founderDesignation,
    founderDescription,
    tokenProcess,
    websiteLink,
    githubLink,
    twitterLink,
    discordLink,
    coolDown,
    conversion,
  ]);
  //   const [agreed, setAgreed] = useState(false);
  const resetStates = () => {
    setProjectName("");
    setProjectDescription("");
    setTokenName("");
    setProjectProcess("");
    setFounderName("");
    setFounderDesignation("");
    setFounderDescription("");
    setTokenProcess("");
    setWebsiteLink("");
    setGithubLink("");
    setTwitterLink("");
    setDiscordLink("");
    setCoolDown("");
    setConversion("");
  };
  const addProjectHandler = () => {
    addProject({
      projectName,
      projectProcess,
      projectDescription,
      tokenName,
      founderName,
      founderDesignation,
      founderDescription,
      tokenProcess,
      websiteLink,
      githubLink,
      twitterLink,
      discordLink,
      coolDown,
      conversion,
    });
    resetStates();
  };
  return (
    <main className="w-full px-20">
      <div className="mb-4">
        <label className="text-[24px] text-[#40959D] font-[Rale-SemiBold]">
          Project Name
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 rounded bg-[#202020] text-white"
        />
        <input
          type="text"
          value={projectProcess}
          onChange={(e) => setProjectProcess(e.target.value)}
          placeholder="Enter your Projects Process Id"
          className="w-full p-2 rounded bg-[#202020] text-white mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#40959D] mb-2">
          Add Project Description
        </label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-2 rounded bg-[#202020] text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#40959D] mb-2">Add your token</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="Name"
            className="flex-grow p-2 rounded bg-[#202020] text-white"
          />
          {/* <button className="bg-[#40959D] text-white px-3 py-2 rounded">
            Upload Image
          </button> */}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[#40959D] mb-2">Add Founder Details</label>
        <div className="flex flex-col space-y-2">
          {/* <button className="self-start bg-[#202020] text-white px-3 py-2 rounded">
            Add Image
          </button> */}
          <input
            type="text"
            value={founderName}
            onChange={(e) => setFounderName(e.target.value)}
            placeholder="Name"
            className="p-2 rounded bg-[#202020] text-white"
          />
          <input
            type="text"
            value={founderDesignation}
            onChange={(e) => setFounderDesignation(e.target.value)}
            placeholder="Designation"
            className="p-2 rounded bg-[#202020] text-white"
          />
          <textarea
            value={founderDescription}
            onChange={(e) => setFounderDescription(e.target.value)}
            placeholder="Description"
            className="p-2 rounded bg-[#202020] text-white"
          />
        </div>
        {/* <button className="mt-2 bg-[#40959D] text-white px-3 py-2 rounded">
          Add another founder
        </button> */}
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label className="block text-[#40959D] mb-2">Add Stake Details</label>
        <input
          type="text"
          value={tokenProcess}
          onChange={(e) => setTokenProcess(e.target.value)}
          placeholder="Token Process Id"
          className="w-full p-2 rounded bg-[#202020] text-white"
        />
        <input
          type="text"
          value={coolDown}
          onChange={(e) => setCoolDown(e.target.value)}
          placeholder="How often does user recieve reward?"
          className="w-full p-2 rounded bg-[#202020] text-white"
        />
        <input
          type="text"
          value={conversion}
          onChange={(e) => setConversion(e.target.value)}
          placeholder="Amount of Project Token(s) user recieves per aoEth Staked?"
          className="w-full p-2 rounded bg-[#202020] text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#40959D] mb-2">Add Socials</label>
        <div className="flex flex-col gap-3">
          <div className="min-w-[600px]">
            <label className="block text-[#8d8d8d] text-[12px]">
              Website Link
            </label>
            <input
              type="text"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="p-2 rounded bg-[#202020] text-white w-full"
            />
          </div>
          <div className="min-w-[600px]">
            <label className="block text-[#8d8d8d] text-[12px]">
              Github Link
            </label>
            <input
              type="text"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="p-2 rounded bg-[#202020] text-white w-full"
            />
          </div>
          <div className="min-w-[600px]">
            <label className="block text-[#8d8d8d] text-[12px]">
              Twitter or X Link
            </label>
            <input
              type="text"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
              className="p-2 rounded bg-[#202020] text-white w-full"
            />
          </div>
          <div className="min-w-[600px]">
            <label className="block text-[#8d8d8d] text-[12px]">
              Discord Link
            </label>
            <input
              type="text"
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              className="p-2 rounded bg-[#202020] text-white w-full"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          addProjectHandler();
        }}
        disabled={!connected}
        className={`w-full bg-[#40959D] text-white py-3 rounded ${
          !connected ? "hover:cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Post my project
      </button>
    </main>
  );
};

export default AddProject;
