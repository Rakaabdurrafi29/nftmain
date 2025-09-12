import { usePage } from "@inertiajs/react";
import useMembers from "@/Utils/members";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Referrer() {
    const { getMyReferrer } = useMembers();
    const { auth } = usePage().props;
    const [myReferrer, setMyReferrer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyReferrer(auth.user.id);
            setMyReferrer(data);
        };

        fetchData();
    }, []);

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="h-full card-body">
                <div className="flex">
                    <div className="self-center flex-shrink w-full ml-2">
                        <span className="text-xs font-semibold text-slate-500">
                            {myReferrer && (
                                <img
                                    src={`/assets/img/${
                                        myReferrer.data.avatar === undefined
                                            ? "nftlottery.png"
                                            : myReferrer.data.avatar
                                    }`}
                                    className="inline h-16 mb-2 ml-2 mr-4 -mt-3 rounded-full"
                                />
                            )}
                        </span>
                        <span className="text-xl text-gradient">
                            <code>
                                {myReferrer &&
                                myReferrer.data.username !== undefined
                                    ? myReferrer.data.username
                                    : "NFTLot.io"}
                            </code>
                        </span>
                        <span className="block text-sm font-medium text-slate-400">
                            My Referrer
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
