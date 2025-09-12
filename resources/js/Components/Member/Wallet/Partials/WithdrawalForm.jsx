import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { polygonAmoy, polygon } from "viem/chains";
import { useSignMessage, useAccount, useChains, useSwitchChain } from "wagmi";
import useWallet from "@/Utils/wallet";
import { getFirstLine } from "@/Utils/error";
import { getMessage } from "@/Utils/auth";
import toast from "react-hot-toast";
import debounce from "debounce";
import "react-loading-skeleton/dist/skeleton.css";

export default function WithdrawalForm({
    wrongAccount,
    withdrawalProcess,
    setWithdrawalProcess,
    setOffset,
    myWalletBalance,
}) {
    const { auth } = usePage().props;

    const { signMessageAsync } = useSignMessage();

    const { withdrawal } = useWallet();
    const [wdValue, setWdValue] = useState(0);
    const [wdReceived, setWdReceived] = useState(0);
    const [wdAmountInvalid, setWdAmountInvalid] = useState(false);
    const { isConnected, address } = useAccount();
    const { chain } = useChains();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;
    const { switchChain } = useSwitchChain();

    function handleChange(e, el) {
        const val = Number(
            e.target.value
                .replace(/\s+/g, "-")
                .replace(/-+$/, "")
                .replace(",", ".")
        );

        const pattern = /^\d+\.{0,1}\d{0,3}$/;

        if (pattern.test(val)) {
            const wdRcv = val - 1;
            setWdValue(val);
            setWdReceived(wdRcv);
            if (val < 5) {
                setWdAmountInvalid(true);
            } else {
                setWdAmountInvalid(false);
            }
        } else {
            setWdAmountInvalid(true);
        }
    }

    async function doWithdrawal(e) {
        e.preventDefault();

        if (address !== auth.user.wallet_address) {
            toast.error("You are connected to the wrong wallet!");
            return;
        }

        if (isConnected && chain?.id !== chainId) {
            const network = async () => {
                await switchChain?.(chainId);
            };

            network();
        }

        if (
            !wdAmountInvalid &&
            address === auth.user.wallet_address &&
            isConnected &&
            chain?.id === chainId
        ) {
            setWithdrawalProcess(true);

            const msg = await getMessage(
                `request Withdrawal Wallet Balance (${wdValue})`
            );
            let signature = "";
            try {
                signature = await signMessageAsync({ message: msg.data });
            } catch (error) {
                setWithdrawalProcess(false);
                toast.error(getFirstLine(error.message));
            }

            if (signature) {
                const wd = await withdrawal(
                    signature,
                    auth.user.wallet_address,
                    msg.data,
                    wdReceived
                );

                if (wd.walletErrors) {
                    toast.error(wd.walletErrors);
                    setWithdrawalProcess(false);
                }
            }

            // setOffset(0);
        }
    }

    return (
        <div className="card relative overflow-hidden bg-[url('/assets/img/p-1.png')] bg-no-repeat bg-contain rounded-xl sm:mb-0 p-2">
            <div className="h-full card-body">
                <div className="flex h-full">
                    <div className="w-full ml-3">
                        <form onSubmit={doWithdrawal}>
                            <label
                                htmlFor="basic-url"
                                className="inline-block mb-2 text-neutral-700 dark:text-neutral-200"
                            >
                                Enjoy your benefits in ease!
                            </label>
                            <div className="relative flex flex-wrap mb-4 ">
                                <span className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]  border-neutral-600 text-neutral-400 placeholder:text-neutral-200">
                                    USDT
                                </span>
                                <input
                                    type="text"
                                    disabled={wrongAccount || withdrawalProcess}
                                    name="wd_amount"
                                    id="wd_amount"
                                    onChange={debounce(handleChange, 500)}
                                    placeholder="0"
                                    className="relative m-0 w-[1px] min-w-0 flex-auto border border-solid bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-neutral-500 focus:text-slate-200 focus:outline-none border-neutral-600 text-neutral-200 placeholder:text-slate-500"
                                />
                                <span className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-0 py-0 text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
                                    <button
                                        type="submit"
                                        disabled={
                                            wrongAccount || withdrawalProcess
                                        }
                                        className="inline-block w-full rounded-e-sm bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                    >
                                        {withdrawalProcess
                                            ? "Proccessing..."
                                            : "Withdrawal"}
                                    </button>
                                </span>
                                <span className="flex w-full mt-1 text-xs text-stone-400">
                                    You will receive :&nbsp;
                                    <span className="font-bold text-emerald-600">
                                        {"USDT "}
                                        {wdReceived}
                                    </span>
                                </span>
                                {wrongAccount && (
                                    <span className="flex w-full mt-1 text-xs text-red-400">
                                        <em>
                                            You are connected to the wrong
                                            account in your wallet!
                                        </em>
                                    </span>
                                )}
                                {wdAmountInvalid && (
                                    <span className="flex w-full mt-1 text-xs text-red-400">
                                        <em>
                                            Invalid input!
                                            <br />
                                            Withdrawal amount must be a number
                                            (decimal) with maximum 3 decimal
                                            places and must be 5 or greater.
                                        </em>
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
