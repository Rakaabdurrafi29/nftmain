import banner from "../assets/img/roi.png";

export default function Roi() {
    return (
        <section
            id="roi"
            className="flex flex-col-reverse py-6 mt-16 md:flex-row lg:flex-row ss:py-8"
        >
            <div className="flex flex-col items-center justify-center flex-1 px-4 md:items-start lg:items-start xl:px-0 sm:px-14">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="flex-1 font-poppins font-semibold text-[36px] sm:text-[72px] lg:text-[72px] text-white leading-[40px] sm:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                        <span className="text-blue-gradient">
                            Royalty &amp; SubRoyalty
                        </span>{" "}
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[42.8px] lg:leading-[42.8px] w-full text-center md:text-start lg:text-start">
                    0,05% - 0,3% <br />
                    per-8 hours <br />
                    for <span className="text-gradient">30 days</span>!
                </h1>
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    Enjoy your life, get very attractive Royalty in a very easy
                    way.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                <span className="absolute blur-[200px] w-[400px] h-[400px] rounded-full top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-200/20 to-indigo-400/50"></span>
                <figure>
                    <img
                        src={banner}
                        alt="Royalty Image"
                        className="w-full relative z-[5] ml-0 md:ml-10"
                    />
                    <figcaption className="text-end">
                        <span className="relative text-[6px] text-white">
                            <a
                                href="https://www.freepik.com/free-ai-image/close-up-new-york-fashionable-man-with-yellow-costume_72125610.htm#fromView=search&term=businessman+wealth&page=2&position=26&track=ais_ai_generated&regularType=ai&uuid=22703d7c-2c95-4276-8ef6-8b8dfa0aadd2"
                                target="_blank"
                            >
                                Image By freepik
                            </a>
                        </span>
                    </figcaption>
                </figure>
            </div>

            {/* <div className="flex items-center justify-center ss:hidden"></div> */}
        </section>
    );
}
