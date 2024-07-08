import { ConnectButton } from "arweave-wallet-kit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-20 pt-[12px]">
      <a href="/">
        <h1 className="text-[#eeeeee] uppercase text-[24px] font-bold">logo</h1>
      </a>
      <div className="flex gap-9 text-[#eeeeee]">
        <a href="/about">About Us</a>
        <a href="/profile">Your Profile</a>
      </div>
      <ConnectButton />
    </nav>
  );
}
