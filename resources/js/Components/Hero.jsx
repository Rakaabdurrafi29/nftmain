import banner from "../assets/img/banner-bg-7.png";

export default function Hero() {
    return (
        <>
            <section
                id="home"
                className="flex flex-col-reverse py-6 mt-10 md:flex-row lg:flex-row ss:py-8"
            >
                <div className="flex flex-col items-center justify-center w-full px-4 md:w-1/2 xl:px-0 sm:px-14">
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="flex-1 font-poppins font-semibold text-[36px] ss:text-[72px] lg:text-[72px] text-white leading-[40px] ss:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                            The Next <br className="hidden sm:block" />
                            <span className="text-gradient">Generation</span>
                        </h1>
                    </div>

                    <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[77.8px] lg:leading-[77.8px] w-full text-center md:text-start lg:text-start">
                        NFT Community
                    </h1>
                    <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                        NFTLottery is an NFT project that was specifically
                        created to provide prosperity and happiness for all its
                        members.
                        <br />
                        <br />
                        <span className="font-poppins text-white text-[18px] leading-loose">
                            It isn't just an NFT -- it's your gateway to
                            unlimited opportunities!
                        </span>
                    </p>
                </div>

                <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                    <span className="absolute blur-[200px] w-[400px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full top-1/2 start-1/5 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tl from-red-600/20 to-violet-600/40 z-1"></span>
                    <img
                        src={banner}
                        alt="hero image"
                        className="w-1/2 md:w-full relative z-[5]"
                    />
                </div>

                {/* <div className="flex items-center justify-center ss:hidden"></div> */}
            </section>
        </>
    );
}
