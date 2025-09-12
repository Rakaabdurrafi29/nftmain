export default function NftsBatch() {
    return (
        <section
            id="lottery"
            className="flex flex-col-reverse py-6 mt-16 md:flex-row-reverse lg:flex-row-reverse ss:py-8"
        >
            <div className="flex flex-col items-center justify-center flex-1 px-4 md:items-start lg:items-start xl:px-0 sm:px-14">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="flex-1 font-poppins font-semibold text-[36px] sm:text-[62px] lg:text-[62px] text-white leading-[40px] sm:leading-[77.8px] lg:leading-[77.8px] text-center md:text-start lg:text-start">
                        Cutes &amp;{" "}
                        <span className="text-blue-gradient">Adorable</span>
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold text-[30px] ss:text-[42px] lg:text-[42px] text-white leading-[40px] ss:leading-[77.8px] lg:leading-[77.8px] w-full text-center md:text-start lg:text-start">
                    Egg Characters NFTs
                </h1>
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    <span className="text-gradient">NFTLot.io</span> tries to
                    recreate Eggs. Eggs from different time and space,
                    experimenting with materials and various emotional
                    expressions. Like you, each person is unique. Generated from
                    nothing, they come to life as a single being, made from a
                    fusion of advanced technology, art and happiness.
                </p>
                <p className="font-poppins font-normal text-dimWhite text-[14px] ss:text-[18px] lg:text-[18px] leading-[20.8px] ss:leading-[30.8px] lg:leading-[30.8px] max-w-1/2 mt-5 text-center md:text-start lg:text-start">
                    You can immediately list your NFT for sale on your favorite
                    NFT marketplace such as{" "}
                    <span className="text-blue-400">OpenSea.io</span>,{" "}
                    <span className="text-yellow-400">Rarible.com</span>, and so
                    on.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full px-8 my-10 md:w-1/2 md:my-0">
                <span className="absolute blur-[200px] w-[400px] h-[400px] rounded-full top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-yellow-200/20 to-indigo-400/50"></span>
                <figure>
                    <img
                        src="/assets/img/eggs.png"
                        alt="billing"
                        className="w-full relative z-[5] mr-10"
                    />
                    <figcaption className="text-start">
                        <span className="relative text-[6px] text-white">
                            Images by NFTLot.io Creative team
                        </span>
                    </figcaption>
                </figure>
            </div>

            {/* <div className="flex items-center justify-center ss:hidden"></div> */}
        </section>
    );
}
