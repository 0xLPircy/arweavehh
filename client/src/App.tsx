import { ConnectButton, useConnection } from "arweave-wallet-kit";
import "./App.css";
import signArSend from "./utils/aoCalls";

function App() {
  const { connected } = useConnection();
  const sendArHandler = async () => {
    await signArSend();
  };
  return (
    <main>
      <ConnectButton />
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
