import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";

import Disclaimer from "@/Components/Auth/Disclaimer";
import Logo from "@/Components/Logo";

import { doRegister, getMessage } from "@/Utils/auth";

import toast, { Toaster } from "react-hot-toast";

import {
    useAccount,
    useBalance,
    useChains,
    useSwitchChain,
    useSignMessage,
    useContractRead,
} from "wagmi";
import { abi } from "@/Artifacts/Contracts/abi/amoy_abi.json";
import { abimainnet } from "@/Artifacts/Contracts/abi/mainnet_abi.json";
import { derc20abi } from "@/Artifacts/Contracts/abi/derc20.json";
import { usdtposabi } from "@/Artifacts/Contracts/abi/usdt_pos.json";
import { polygonAmoy, polygon } from "viem/chains";

import { isMobile } from "react-device-detect";

export default function Register() {
    const { address, isConnected } = useAccount();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;
    const { chain } = useChains();
    const { switchChain } = useSwitchChain();

    useEffect(() => {
        if (isConnected && chain?.id !== chainId) {
            const network = async () => {
                await switchChain?.(chainId);
            };

            network();
        }
    }, [isConnected, chain?.id]);

    const nftScAddress =
        import.meta.env.VITE_APP_ENV == "testnet"
            ? import.meta.env.VITE_SC_NFT_ADDRESS_T
            : import.meta.env.VITE_SC_NFT_ADDRESS_M;

    const erc20ScAddress =
        import.meta.env.VITE_APP_ENV == "testnet"
            ? import.meta.env.VITE_SC_ERC20_ADDRESS_T
            : import.meta.env.VITE_SC_ERC20_ADDRESS_M;

    const {
        data: balance,
        isError,
        isLoading,
    } = useBalance({
        address,
    });

    const { data: balanceData } = useContractRead({
        address: erc20ScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? derc20abi : usdtposabi,
        functionName: "balanceOf",
        args: [address],
    });

    const { data: erc20Amount } = useContractRead({
        address: nftScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
        functionName: "chargeAmountForERC20",
        args: [erc20ScAddress],
    });

    const [registerProcess, setRegisterProcess] = useState(false);
    const { signMessageAsync } = useSignMessage();

    async function register() {
        setRegisterProcess(true);

        if (isConnected) {
            const sponsor = window.location.pathname.split("/").at(-1);
            const msg = await getMessage("Register");

            // if (
            //     balance?.symbol === "MATIC" &&
            //     balance?.formatted >= 0.001 &&
            //     balanceData >= erc20Amount
            // ) {
            const signature = await signMessageAsync({ message: msg.data });

            if (signature) {
                const register = await doRegister(
                    sponsor,
                    address,
                    signature,
                    msg.data
                );

                if (register?.authErrors !== "") {
                    toast.error(register.authErrors);
                }

                setRegisterProcess(false);
            } else {
                toast.error("Failed to sign message.");

                setRegisterProcess(false);
            }
            // } else {
            //     toast.error("Not enough balance!");

            //     setRegisterProcess(false);
            // }
        } else {
            toast.error("Please connect your wallet first!");

            setRegisterProcess(false);
        }
    }

    // const mobileLocation =
    //     "https://metamask.app.link/dapp/nftlot.io" +
    //     window.location.pathname;

    // if (isMobile) {
    //     window.location = mobileLocation;
    // }

    return (
        <>
            <Head title="Register" />

            <Toaster position="bottom-center" reverseOrder={false} />

            <div className="w-full min-h-screen pt-6 overflow-hidden">
                <div className="px-3 sm:px-16">
                    <div className="xl:max-w-[1280px] w-full">
                        {/* <div className="fixed bottom-5 right-12 z-[6] bg-black/90 rounded-full">
                            <w3m-button />
                        </div> */}
                        <header className="sticky top-0 w-full xl:max-w-screen-lg text-slate-200">
                            <section className="flex flex-col items-center justify-between py-4 mx-auto sm:px-14 xl:px-1 sm:py-6 ss:flex-row">
                                <Link href={route("welcome")}>
                                    <Logo className="block w-auto fill-current h-14" />
                                </Link>
                                <div className="flex flex-col gap-2 mt-8 ss:flex-row ss:mt-0">
                                    <w3m-button
                                        label="Connect Wallet"
                                        loadingLabel="Connecting..."
                                        size="md"
                                        balance="show"
                                    />
                                </div>
                            </section>
                        </header>
                        <Disclaimer />
                        <div className="flex items-start justify-center px-1 mt-4 mb-16 sm:px-14">
                            <div className="xl:max-w-[1080px] w-full">
                                <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                    <div className="card sm:p-6 !bg-gray-800/30 border border-slate-800 mt-6">
                                        {/* <div className="card-header">
                            <h4 className="card-title">Registration Form</h4>
                        </div> */}
                                        <div className="card-body">
                                            <div className="flex items-center justify-center px-1 sm:px-10">
                                                <div className="xl:max-w-[1280px] w-full justify-center items-center text-center mt-[30px] mb-[30px]">
                                                    <button
                                                        onClick={() =>
                                                            register()
                                                        }
                                                        className="text-white bg-transparent outline-none border border-[#eca700] hover:bg-[#eca700]/50 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-3"
                                                        disabled={
                                                            registerProcess
                                                        }
                                                    >
                                                        <span className="text-2xl">
                                                            {registerProcess
                                                                ? "Registering..."
                                                                : "REGISTER"}
                                                        </span>
                                                    </button>
                                                    <div className="mt-3 card">
                                                        <div className="card-body">
                                                            <span className="text-sm text-slate-400">
                                                                Please make sure
                                                                you have enough
                                                                balance in your
                                                                wallet.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
