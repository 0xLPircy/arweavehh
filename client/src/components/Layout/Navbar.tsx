import { ConnectButton } from "arweave-wallet-kit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-[60px] pt-[21px] fadeIn">
      <a href="/">
        <img alt="Home" src="/logo.svg" className="h-[30px] w-[150px]" />
      </a>
      <div className="flex gap-[120px] text-[#eeeeee] text-[18px] tracking-wider">
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
