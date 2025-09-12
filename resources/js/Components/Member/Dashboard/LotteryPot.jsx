import { usePage } from "@inertiajs/react";
import useLottery from "@/Utils/lottery";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tetherImg from "../../../assets/img/tether_32.webp";
import bgImg from "../../../assets/img/p-1.png";

export default function LotteryPot() {
    const { getLotteryPot } = useLottery();
    const { auth } = usePage().props;
    const [lotteryPot, setLotteryPot] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLotteryPot(await getLotteryPot(auth.user.id));
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 sm:col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-4">
            <div
                className="relative p-2 overflow-hidden bg-no-repeat bg-contain card rounded-xl sm:mb-0"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <div className="h-full card-body">
                    <div className="flex items-center h-full">
                        <div className="m-auto">
                            <h3 className="w-full my-1 text-xl font-semibold text-center sm:text-6xl">
                                <span className="text-xs font-semibold text-slate-500">
                                    <img
                                        src={tetherImg}
                                        className="inline h-10 mr-2 -mt-7"
                                    />
                                </span>
                                <br />
                                <span className="text-5xl text-gradient font-DigitalItalic">
                                    {lotteryPot || (
                                        <Skeleton
                                            baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                            highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                        />
                                    )}
                                </span>
                            </h3>
                            <p className="w-full mt-8 mb-0 text-5xl font-medium text-center text-gray-400 text-blue-gradient font-FlashBang">
                                Lottery Pot
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
