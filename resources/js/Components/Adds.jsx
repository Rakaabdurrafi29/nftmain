import { Link } from "@inertiajs/react";

export default function Adds() {
    return (
        <section className="flex justify-center items-center sm:my-16 my-6 sm:px-16 px-0 sm:pt-12 sm:pb-0 pt-4 pb-0 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow">
            <figure>
                <img
                    src="/assets/img/windsor.png"
                    alt="billing"
                    className="w-full relative z-[5] mr-10"
                />
            </figure>
            <div className="flex-1 flex mb-12 flex-col">
                <div className="flex-1 flex flex-col mb-12 pl-10">
                    <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[50.8px]">
                        Trade smarter, trade faster
                    </h2>
                    <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]  mt-5">
                        Skip the technicalities and tap into global markets in a
                        few simple steps by copying the moves of the strategy
                        providers.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start sm:ml-10 ml-0 sm:mt-0 mt-10">
                    <a
                        href="https://sc.myuserhub.com/?pt=88180"
                        className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none"
                        target="_blank"
                    >
                        Join Now{" "}
                        <span className="text-emerald-700">(Asia)</span>
                    </a>
                    <a
                        href="http://sc.myuserhub.com/?pt=88193"
                        className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none"
                        target="_blank"
                    >
                        Join Now{" "}
                        <span className="text-indigo-700">(Non Asia)</span>
                    </a>{" "}
                </div>
                <span className="flex w-full justify-end items-baseline text-dimWhite pt-24 pe-10 md:pe-0">
                    Ads
                </span>
            </div>
        </section>
    );
}
