import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WalletBalance({ myWalletBalance, setMyWalletBalance }) {
    const { auth } = usePage().props;

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="card-body h-full">
                <div className="flex h-full items-center">
                    <div className="ml-3">
                        <h3 className="w-full my-1 font-semibold text-xl sm:text-4xl">
                            <span className="text-slate-500 text-xs font-semibold">
                                <img
                                    src="/assets/img/tether_32.webp"
                                    className="inline h-8 md:h-10 mr-4 -mt-5 md:-mt-7"
                                />
                            </span>
                            <span className="text-gradient font-DigitalItalic text-4xl md:text-5xl">
                                {myWalletBalance || (
                                    <Skeleton
                                        baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                        highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                        width={"100px"}
                                    />
                                )}
                            </span>
                        </h3>
                        <p className="w-full  text-slate-300 text-md mb-0 font-medium">
                            N-Wallet Balance
                        </p>
                        <span className="flex text-xs text-stone-400 mt-1 w-full">
                            <em>
                                Minimum withdrawal amount is USDT 5. Each
                                withdrawal transaction is subject to an
                                administration fee of USDT 1.
                            </em>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
