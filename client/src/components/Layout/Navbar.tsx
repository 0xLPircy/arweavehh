import { ConnectButton } from "arweave-wallet-kit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-20 pt-[21px]">
      <a href="/">
        <h1 className="text-[#eeeeee] uppercase text-[24px] font-bold">logo</h1>
      </a>
      <div className="flex gap-[66px] text-[#eeeeee]">
        <a href="/about" className="hover:text-[#40959D] hover:underline underline-offset-[3px]">
          About Us
        </a>
        <a className="hover:text-[#40959D] hover:underline underline-offset-[3px]" href="/profile">
          Your Profile
        </a>{" "}
        {/* <a
          className="hover:text-[#40959D] hover:underline underline-offset-[3px]"
          href="/profile"
        >
          Your Profile
        </a> */}
      </div>
      <ConnectButton />
    </nav>
  );
}
