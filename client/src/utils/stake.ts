import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { AOETH_TOKEN_PID, PLATFORM_PID } from "./constants";
import { ProjectType } from "../types/Project";

// const quantity = 1100000000000;

export const stake = async (projectData: ProjectType, tokenAmt: number, address?: string) => {
  if (!address) return;
  console.log("stake");
  const quantity = tokenAmt * 10 ** 12;
  // Call the backend API to stake the tokens
  const res = await message({
    process: AOETH_TOKEN_PID,
    tags: [
      { name: "Action", value: "Transfer" },
      { name: "Recipient", value: PLATFORM_PID },
      { name: "Quantity", value: quantity.toString() },
      { name: "X-Quantity", value: quantity.toString() },
      { name: "X-Ticker", value: projectData.ticker },
      { name: "X-User", value: address },
      { name: "X-Action", value: "User-to-Platform" },
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
