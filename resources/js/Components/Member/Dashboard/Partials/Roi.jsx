import { usePage } from "@inertiajs/react";
import useWallet from "@/Utils/wallet";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tetherImg from "../../../../assets/img/tether_32.webp";
import bgImg from "../../../../assets/img/p-1.png";

export default function Roi() {
    const { getMyRoi } = useWallet();
    const { auth } = usePage().props;
    const [myRoi, setMyRoi] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setMyRoi(await getMyRoi(auth.user.id));
        };

        fetchData();
    }, []);
    return (
        <div
            className="relative p-2 overflow-hidden bg-no-repeat bg-contain card rounded-xl sm:mb-0"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="h-full card-body">
                <div className="flex items-center h-full">
                    <div className="m-auto">
                        <h3 className="w-full my-1 text-xl font-semibold text-center sm:text-3xl">
                            <span className="text-xs font-semibold text-slate-500">
                                <img
                                    src={tetherImg}
                                    className="inline h-5 mr-2 -mt-3"
                                />
                            </span>
                            <span className="text-slate-100 font-DigitalItalic">
                                {myRoi || (
                                    <Skeleton
                                        baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                        highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                        width={"100px"}
                                    />
                                )}
                            </span>
                        </h3>
                        <p className="w-full mb-0 text-sm font-medium text-center text-gray-500">
                            R.O.I
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
