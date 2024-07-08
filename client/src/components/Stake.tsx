import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import { getBalance, postTransaction, signTransaction } from "arweavekit";
import { PLATFORM_ADDRESS, arweave } from "../utils/constants";

export default function Stake() {
  const address = useActiveAddress();
  const { connected } = useConnection();

  const sendArHandler = async () => {
    if (!connected) return;
    console.log("send ar", address);
    // const bal = await arweave.wallets.getBalance("6fpt98wMlpt1Q1C6-xdNI0qqOGbbjhLt5zl0NFNsSHE");

    const bal = await getBalance({
      address: address!,
      environment: "mainnet",
    });
    console.log(bal);

    const tnx = await arweave.createTransaction({
      target: PLATFORM_ADDRESS,
      quantity: arweave.ar.arToWinston("0.01"),
    });

    const signedTxn = await signTransaction({ createdTransaction: tnx, environment: "mainnet" });

    // @ts-expect-error types wrong but it works
    const posted = await postTransaction({ transaction: signedTxn, environment: "mainnet" });
    console.log(signedTxn, posted);

    // const transaction = await signArTxn();
    // if (!api) return;
    // const done = await api?.sign(transaction);
    // console.log(done);
  };

  return (
    <button
      onClick={() => {
        sendArHandler();
      }}
    >
      Stake
    </button>
  );
}
