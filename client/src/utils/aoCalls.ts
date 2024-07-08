// import { useApi } from "arweave-wallet-kit";
import { createTransaction } from "arweavekit";

const signArSend = async () => {
  console.log("insign ar");
  const transaction = await createTransaction({
    type: "wallet",
    quantity: "2",
    target: "-KJHePyRcph5m9PwT6cEtHFb97WxWKfs_JcKELJb4lY",
    environment: "mainnet",
    //   options: {
    //     tags: [{ name: "key_name", value: "some_value" }],
    //   },
  });
  //   console.log(transaction, typeof transaction);
  console.log("before api");
  const api = useApi();
  await api.sign(transaction);
  console.log("done");
};
export default signArSend;
