import { ConnectButton } from "arweave-wallet-kit";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between my-2 mx-2 align-middle items-center">
        <a href="/">
          <div>logo</div>
        </a>
        <div className="flex gap-8">
          <a href="/about">About Us</a>
          <a href="/profile">Your Profile</a>
        </div>
        <ConnectButton />
      </nav>
      {/* horizontal line, bold */}
      <hr className="my-4 border-t-2 border-black" />
    </>
  );
}
