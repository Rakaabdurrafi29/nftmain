import { usePage } from "@inertiajs/react";
import useMembers from "@/Utils/members";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NetworkAll() {
    const { getMyDescendants } = useMembers();
    const { auth } = usePage().props;
    const [myDescendants, setMyDescendants] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyDescendants(auth.user.id);
            setMyDescendants(data);
        };

        fetchData();
    }, []);

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="card-body h-full">
                <div className="flex flex-col colspan-12">
                    <div className="flex-shrink self-center ml-2 w-full">
                        <span className="text-slate-500 text-xs font-semibold">
                            <img
                                src="/assets/img/network.png"
                                className="inline h-8 md:h-10 mr-4 -mt-5 md:-mt-7"
                            />
                        </span>
                        <span className="text-4xl md:text-5xl text-gradient self-center font-DigitalItalic">
                            {(myDescendants &&
                                Intl.NumberFormat("en-US").format(
                                    myDescendants?.data.length
                                )) || (
                                <Skeleton
                                    baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                    highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                    width={"60px"}
                                    height={"30px"}
                                    borderRadius={"3%"}
                                />
                            )}
                        </span>
                        <span className="text-xs text-slate-400 font-medium block">
                            Total Members in Group
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
