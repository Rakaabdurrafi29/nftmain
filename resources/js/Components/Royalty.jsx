import banner from "../assets/img/royalty.png";

export default function Royalty() {
    return (
        <section
            id="lottery"
            className="flex flex-col-reverse py-6 mt-16 md:flex-row-reverse lg:flex-row-reverse ss:py-8"
        >
            <div className="flex flex-col items-center justify-center flex-1 px-4 md:items-start lg:items-start xl:px-0 sm:px-14">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="flex-1 font-poppins font-semibold text-[36px] sm:text-[72px] lg:text-[72px] text-white leading-[40px] sm:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                        Level <span className="text-blue-gradient"> Bonus</span>{" "}
                    </h1>
                </div>

                {/* <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[77.8px] lg:leading-[77.8px] w-full text-center md:text-start lg:text-start">
                    Upto <span className="text-gradient">60 Levels!</span>
                </h1> */}
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    Your hard work will always pay off.
                    <br />
                    You work today, level bonuses will continue to flow into
                    your wallet.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                <span className="absolute blur-[200px] w-[400px] h-[400px] rounded-full top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-200/20 to-indigo-400/50"></span>
                <figure>
                    <img
                        src={banner}
                        alt="Level Bonus Image"
                        className="w-full relative z-[5] mr-0 md:mr-10"
                    />
                    <figcaption className="text-start">
                        <span className="relative text-[6px] text-white">
                            <a
                                href="https://www.freepik.com/free-ai-image/businessman-stands-atop-skyscraper-looking-towards-sunset-generated-by-ai_41595114.htm#fromView=search&term=crypto+business+coins+fly&page=2&position=13&track=ais_ai_generated&regularType=ai&uuid=943e03cf-7c75-4f6a-8df8-5b96f6230232"
                                target="_blank"
                            >
                                Image By vecstock
                            </a>
                        </span>
                    </figcaption>
                </figure>
            </div>

            {/* <div className="flex items-center justify-center ss:hidden"></div> */}
        </section>
    );
}
