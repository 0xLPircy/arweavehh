import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useActiveAddress } from "arweave-wallet-kit";
import { AOETH_TOKEN_PID, PLATFORM_PID } from "../utils/constants";
import { ProjectType } from "../types/Project";

type StakeAoethProps = {
  projectData: ProjectType;
};

export default function StakeAoeth({ projectData }: StakeAoethProps) {
  const address = useActiveAddress();
  if (!address) return <div>Connect Wallet</div>;

  const quantity = 1100000000000;

  const stake = async () => {
    console.log("stake");
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

  return (
    <button className="bg-white" onClick={() => stake()}>
      Stake AoETH
    </button>
  );
}
