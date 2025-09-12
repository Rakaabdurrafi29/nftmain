import banner from "../assets/img/lottery2.png";

export default function Lottery() {
    return (
        <section
            id="lottery"
            className="flex flex-col-reverse py-6 mt-16 md:flex-row-reverse lg:flex-row-reverse ss:py-8"
        >
            <div className="flex flex-col items-center justify-center flex-1 px-4 md:items-start lg:items-start xl:px-0 sm:px-14">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="flex-1 font-poppins font-semibold text-[36px] sm:text-[72px] lg:text-[72px] text-white leading-[40px] sm:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                        WIN <span className="text-blue-gradient">Lottery</span>
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[77.8px] lg:leading-[77.8px] w-full text-center md:text-start lg:text-start">
                    Draw <span className="text-gradient">Monthly</span>
                </h1>
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    Everyone is <span className="text-blue-gradient">100%</span>{" "}
                    guaranteed to{" "}
                    <span className="text-blue-gradient">WIN</span> the lottery.
                    <br />
                    The lottery code you have will be included in every draw
                    <span className="text-gradient"> until you WIN</span>.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                <span className="absolute blur-[200px] w-[400px] h-[400px] rounded-full top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-200/20 to-indigo-400/50"></span>
                <figure>
                    <img
                        src={banner}
                        alt="lottery image"
                        className="w-full relative z-[5] mr-0 md:mr-10"
                    />
                    <figcaption className="text-start">
                        <span className="relative text-[6px] text-white">
                            <a
                                href="https://www.freepik.com/free-ai-image/medium-shot-kid-with-smartphone-indoors_74770015.htm#fromView=search&term=lottery+win&page=1&position=25&track=ais_ai_generated&regularType=ai&uuid=8eddc1c0-d5cf-409c-9fe5-c82dcbf1bdae"
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
