import { usePage } from "@inertiajs/react";
import useWallet from "@/Utils/wallet";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BonusReferral() {
    const { auth } = usePage().props;
    const { getMyReferralBonus } = useWallet();
    const [myReferralBonus, setMyReferralBonus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyReferralBonus(auth.user.id);
            setMyReferralBonus(data);
        };

        fetchData();
    }, []);

    return (
        <div className="card relative overflow-hidden bg-[url('../assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="h-full card-body">
                <div className="flex h-full">
                    <div className="ml-3">
                        <h3 className="w-full my-1 text-xl font-semibold sm:text-4xl">
                            <span className="text-xs font-semibold text-slate-500">
                                <img
                                    src="/assets/img/tether_32.webp"
                                    className="inline h-8 mr-4 -mt-5 md:h-10 md:-mt-7"
                                />
                            </span>
                            <span className="text-4xl text-gradient font-DigitalItalic md:text-5xl">
                                {myReferralBonus || (
                                    <Skeleton
                                        baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                        highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                        width={"100px"}
                                    />
                                )}
                            </span>
                        </h3>
                        <p className="w-full mb-0 text-xs font-medium text-gray-400">
                            Referral Bonus
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
