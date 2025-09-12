import { usePage } from "@inertiajs/react";
import useLottery from "@/Utils/lottery";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LotteryPot() {
    const { getLotteryPotSchedule } = useLottery();
    const { auth } = usePage().props;
    const [lotteryPot, setLotteryPot] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLotteryPot(await getLotteryPotSchedule(auth.user.id));
        };

        fetchData();
    }, []);

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="card-body h-full">
                <div className="flex h-full">
                    <div className="ml-3">
                        <h3 className="w-full my-1 font-semibold text-xl sm:text-4xl">
                            <span className="text-slate-500 text-xs font-semibold">
                                <img
                                    src="/assets/img/tether_32.webp"
                                    className="inline h-8 md:h-10 mr-4 -mt-5 md:-mt-7"
                                />
                            </span>
                            <span className="text-gradient font-DigitalItalic text-4xl md:text-5xl">
                                {(lotteryPot &&
                                    Intl.NumberFormat("EN-US", {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3,
                                    }).format(lotteryPot)) || (
                                    <Skeleton
                                        baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                        highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                        width={"100px"}
                                    />
                                )}
                            </span>
                        </h3>
                        <div className="w-full  text-gray-400 text-xs mb-0 font-medium">
                            Current Lottery Pot
                            <br />
                            <div>
                                {/* Draw at{" "} */}
                                <span className="text-lime-300">
                                    {/* {lotteryPot.date_end &&
                                        Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            timeZoneName: "shortOffset",
                                        }).format(
                                            Date.parse(lotteryPot.date_end)
                                        )} */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
