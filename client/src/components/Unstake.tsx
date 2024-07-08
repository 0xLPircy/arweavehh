import { useActiveAddress } from "arweave-wallet-kit";
import axios from "axios";

export default function Unstake() {
  const address = useActiveAddress();

  const unstakeNow = async () => {
    // Call the backend API to unstake the tokens
    console.log("unstake now");
    const txn = await axios.post("http://localhost:3000/unstake", {
      address: address,
    });
    console.log("done", txn);
  };

  return <button onClick={() => unstakeNow()}>Unstake</button>;
}
