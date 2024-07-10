const Footer = () => {
  return (
    <footer className="flex flex-row justify-between items-center px-20 py-[24px]">
      <a href="/">
        <img src="/logo.svg" className="h-[30px] w-[150px]" />
      </a>
      <div className="flex flex-row gap-[39px] text-[#40959D] text-[18px] font-[Rale-Medium]">
        <h4 className="hover:opacity-90 hover:underline underline-offset-[3px] hover:cursor-pointer">
          About Us
        </h4>
        <h4 className="hover:opacity-90 hover:underline underline-offset-[3px] hover:cursor-pointer">
          Team
        </h4>
        <h4 className="hover:opacity-90 hover:underline underline-offset-[3px] hover:cursor-pointer">
          LOREM
        </h4>
      </div>
      <div className="flex flex-row gap-[12px]">
        <a href="https://github.com/0xLPircy/arweavehh" target="_blank">
          <img src="/icons/github.svg" className="h-[21px] w-[21px]" />
        </a>
        <a
          href="https://x.com/0xLPircy?t=_DmrN3T1GWBKqycYR6BINA&s=09"
          target="_blank"
        >
          <img src="/icons/x.svg" className="h-[21px] w-[21px]" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
