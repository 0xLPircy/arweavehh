import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { AOETH_TOKEN_PID, PLATFORM_PID } from "./constants";
import { ProjectType } from "../types/Project";

export const unstake = async (projectData: ProjectType) => {
  console.log("unstake");
  // Call the backend API to stake the tokens
  const res = await message({
    process: PLATFORM_PID,
    tags: [
      { name: "Action", value: "Unstake" },
      { name: "Ticker", value: projectData.ticker },
    ],
    data: undefined,
    signer: createDataItemSigner(window.arweaveWallet),
  });

  console.log("Post result", res);

  const postResult = await result({
    process: AOETH_TOKEN_PID,
    message: res,
  });

  console.log({ postResult });
  if (postResult.Error) {
    throw new Error(postResult.Error);
  }
};
