import { useActiveAddress } from "arweave-wallet-kit";
import Navbar from "../components/Navbar";
import { useUserAoETH, useUserData } from "../utils/hooks";
import StakeAoeth from "../components/StakeAoeth";
import { dummyProject } from "../utils/constants";

export default function Profile() {
  // const projects = useAppStore((state) => state.projects);
  const address = useActiveAddress();
  const userData = useUserData(address);
  const aoeth = useUserAoETH(address);
  console.log("userData", userData, aoeth);

  if (!address)
    return (
      <>
        <Navbar />
        <div>Connect Wallet</div>
      </>
    );
  return (
    <>
      <Navbar />
      <div>Profile</div>
      <div className="text-white">
        {"aoeth balance: "}
        {aoeth}
      </div>
      <StakeAoeth projectData={dummyProject} />
    </>
  );
}
