import { useApi } from "arweave-wallet-kit";
import { createTransaction } from "arweavekit";

const transaction = await createTransaction({
  type: "wallet",

  quantity: "1000000",

  target: "TARGET_WALLET_ADDRESS",

  environment: "mainnet",

  options: {
    tags: [{ name: "key_name", value: "some_value" }],
  },
});

const api = useApi();

// sign
await api.sign(transaction);
