import { usePage } from "@inertiajs/react";
import useRoi from "@/Utils/roi";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RoiScheduleSum() {
    const { auth } = usePage().props;
    const { getMyLatestRoi } = useRoi();
    const [myLatestRoi, setMyLatestRoi] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyLatestRoi(auth.user.id);
            setMyLatestRoi(data.date_end);
        };

        fetchData();
    }, []);

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="card-body h-full">
                <div className="flex h-full">
                    <div className="ml-3">
                        <div>
                            <h3 className="w-full my-1 font-semibold text-xl sm:text-3xl">
                                <span className="text-slate-500 text-xs font-semibold">
                                    <img
                                        src="/assets/img/calendar-icon.png"
                                        className="inline h-6 md:h-8 lg:h-10 mr-4 -mt-3 md:-mt-5 lg:-mt-7"
                                    />
                                </span>
                                <span className="text-gradient font-DigitalItalic text-2xl sm:text-2xl md:text-4xl lg:text-5xl">
                                    {(myLatestRoi &&
                                        Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            timeZoneName: "shortOffset",
                                        }).format(Date.parse(myLatestRoi))) || (
                                        <Skeleton
                                            baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                            highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                            width={"100px"}
                                        />
                                    )}
                                </span>
                            </h3>
                            <p className="w-full  text-gray-400 text-xs mb-0 font-medium">
                                You will receive R.O.I (1% per-day) until this
                                date.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
