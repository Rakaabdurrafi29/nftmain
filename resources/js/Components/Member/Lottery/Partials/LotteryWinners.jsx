import { usePage } from "@inertiajs/react";
import useLottery from "@/Utils/lottery";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LotteryWinners() {
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
                    <h1 className="flex items-center font-FlashBang text-3xl text-blue-gradient mr-5">
                        The Winners
                    </h1>
                    {/* <img
                        src={`/assets/img/avatar-1.jpg`}
                        alt=""
                        className="h-14 w-14 rounded-full mr-4"
                    /> */}
                </div>
                <div></div>
            </div>
        </div>
    );
}
