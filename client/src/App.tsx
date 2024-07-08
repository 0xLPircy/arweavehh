import { ConnectButton, useActiveAddress, useApi, useConnection } from "arweave-wallet-kit";
import "./App.css";
import Unstake from "./components/Unstake";
import { PLATFORM_ADDRESS, arweave } from "./utils/constants";
import { getBalance, postTransaction, signTransaction } from "arweavekit";
import signArTxn from "./utils/aoCalls";

function App() {
  const { connected } = useConnection();
  const address = useActiveAddress();
  const api = useApi();

  const sendArHandler = async () => {
    console.log("send ar", address);
    // const bal = await arweave.wallets.getBalance("6fpt98wMlpt1Q1C6-xdNI0qqOGbbjhLt5zl0NFNsSHE");

    const bal = await getBalance({
      address: address!,
      environment: "mainnet",
    });
    console.log(bal);

    // const tnx = await arweave.createTransaction({
    //   target: PLATFORM_ADDRESS,
    //   quantity: arweave.ar.arToWinston("0.01"),
    // });

    // const signedTxn = await signTransaction({ createdTransaction: tnx, environment: "mainnet" });

    // // ts ignore
    // // @ts-expect-error types wrong but it works
    // const posted = await postTransaction({ transaction: signedTxn, environment: "mainnet" });
    // console.log(signedTxn, posted);

    const transaction = await signArTxn();
    // if (!api) return;
    const done = await api?.sign(transaction);
    console.log(done);
  };

  return (
    <main>
      <ConnectButton />
      <Unstake />
      {connected ? (
        <div
          onClick={() => {
            sendArHandler();
          }}
          className="hover:cursor-pointer bg-[#000000] text-[#eeeeee] rounded-md px-[12px] py-[4px] w-fit"
        >
          Sign
        </div>
      ) : (
        "connect"
      )}
    </main>
  );
}

export default App;
