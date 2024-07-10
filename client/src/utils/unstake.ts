import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { PLATFORM_PID } from "./constants";
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
    process: PLATFORM_PID,
    message: res,
  });
  if (postResult.Error) {
    throw new Error(postResult.Error);
  }

  console.log({ postResult });

  await new Promise((r) => setTimeout(r, 500));

  //   while (postResult.Messages.length < 4) {
  //     postResult = await result({
  //       process: PLATFORM_PID,
  //       message: res,
  //     });
  //     if (postResult.Error) {
  //       throw new Error(postResult.Error);
  //     }
  //     console.log("waiting for confirmation", postResult);
  //     // sleep for 500 ms
  //     await new Promise((r) => setTimeout(r, 500));
  //   }
};
