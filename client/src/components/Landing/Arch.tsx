const Arch = () => {
  return (
    <section className="w-[100vw] text-[#eeeeee] flex flex-col justify-center items-center fadeInScroll">
      <img src="/arch/archBg.svg" className="w-full" />
      <img
        src="/arch/archPointer.svg"
        className={`w-[21px] h-[21px] absolute opacity-1 z-10 ltr`}
      />
      <img
        src="/arch/archArrowDown.svg"
        className={`w-[21px] h-[21px] absolute opacity-1 z-10 ttb `}
      />
      <img
        src="/arch/archPointerLeft.svg"
        className={`w-[21px] h-[21px] absolute opacity-1 z-10 rtl `}
      />
      {/* <img
        src="/arch/archArrow.svg"
        className={`w-[21px] h-[21px] absolute opacity-1 z-10 arr1 `}
      /> */}
    </section>
  );
};

export default Arch;
