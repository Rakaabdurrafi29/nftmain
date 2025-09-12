import banner from "../assets/img/trusted.png";

export default function Trusted() {
    return (
        <section
            id="roi"
            className="flex flex-col-reverse py-6 mt-16 md:flex-row lg:flex-row ss:py-8"
        >
            <div className="flex flex-col items-center justify-center flex-1 px-4 md:items-start lg:items-start xl:px-0 sm:px-14">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="flex-1 font-poppins font-semibold text-[36px] sm:text-[72px] lg:text-[72px] text-white leading-[40px] sm:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                        <span className="text-blue-gradient">Anti</span> Scam
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[42.8px] lg:leading-[42.8px] w-full text-center md:text-start lg:text-start">
                    100% <span className="text-gradient">Guarantee!</span>
                </h1>
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    All transactions are recorded openly on the blockchain. No
                    one can cheat the system, and it is impossible for the
                    management team to commit fraud.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                <span className="absolute blur-[200px] w-[400px] h-[400px] rounded-full top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-200/20 to-indigo-400/50"></span>
                <figure>
                    <img
                        src={banner}
                        alt="Anti-scam Image"
                        className="w-full relative z-[5] ml-0 md:ml-10"
                    />
                    <figcaption className="text-end">
                        <span className="relative text-[6px] text-white">
                            <a
                                href="https://www.freepik.com/free-ai-image/view-3d-businessman_59999132.htm#fromView=search&term=trusted+people+crypto&page=1&position=0&track=ais_ai_generated&regularType=ai&uuid=7b4ddc2f-6a9e-4437-9e4f-27e9577f58d8"
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
