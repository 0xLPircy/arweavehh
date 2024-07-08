// import { useApi } from "arweave-wallet-kit";
import { createTransaction } from "arweavekit";
import { PLATFORM_ADDRESS } from "./constants";

const signArTxn = async () => {
  const q = 0.01 * 1000000000000;

  const transaction = await createTransaction({
    type: "wallet",
    quantity: q.toString(),
    target: PLATFORM_ADDRESS,
    // data: "hello world",
    environment: "mainnet",
    options: {
      tags: [{ name: "Type", value: "Transfer" }],
    },
  });
  console.log(transaction);
  return transaction;
};
export default signArTxn;
