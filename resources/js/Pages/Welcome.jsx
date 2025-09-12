import { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { polygonAmoy, polygon } from "viem/chains";
import Logo from "@/Components/Logo";
import Hero from "@/Components/Hero";
import { doLogin, getMessage } from "@/Utils/auth";
import toast, { Toaster } from "react-hot-toast";
import { useAccount, useChainId, useSwitchChain, useSignMessage } from "wagmi";
import { getFirstLine } from "@/Utils/error";
import Lottery from "@/Components/Lottery";
import Roi from "@/Components/Roi";
import Royalty from "@/Components/Royalty";
import Trusted from "@/Components/Trusted";
// import NftsBatch from "@/Components/NftsBatch";
// import Adds from "@/Components/Adds";
import Footer from "@/Components/Footer";

export default function Welcome({ auth }) {
    const { switchChain } = useSwitchChain();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;
    const chainName =
        import.meta.env.VITE_APP_ENV == "testnet" ? "Polygon Amoy" : "Polygon";
    const { isConnected, address } = useAccount();
    const activeChainId = useChainId();

    useEffect(() => {
        if (isConnected && activeChainId !== chainId) {
            const network = async () => {
                try {
                    await switchChain({ chainId: chainId });
                    toast.error(
                        "You are switch to the wrong network, we've switch your network back to: " +
                            chainName
                    );
                } catch (error) {
                    console.error("Switch failed:", error);
                }
            };
            network();
        }
    }, [isConnected, activeChainId, chainId]);

    const [loginProcess, setLoginProcess] = useState(false);
    const { signMessageAsync } = useSignMessage();

    async function login() {
        setLoginProcess(true);

        if (activeChainId !== chainId) {
            try {
                await switchChain({ chainId: chainId });
                toast.error(
                    "You are on the wrong network, we've switch your network back to: " +
                        chainName
                );
            } catch (error) {
                console.error("Switch failed:", error);
            }
        }

        const msg = await getMessage("Login");
        let signature = "";
        try {
            signature = await signMessageAsync({ message: msg.data });
        } catch (error) {
            setLoginProcess(false);
            toast.error(getFirstLine(error.message));
        }

        if (signature) {
            const login = await doLogin(signature, address, msg.data);

            if (login.authErrors) {
                setLoginProcess(false);
                toast.error(login.authErrors);
            }
        }
    }

    let loginButton = null;
    let dashboardButton = null;

    if (isConnected && auth.user === null) {
        loginButton = (
            <button
                onClick={() => login()}
                className="text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 text-center items-center leading-3 disabled:bg-slate-400/20 disabled:border-slate-300/20 disabled:text-slate-500 disabled:hover:bg-[#eca700]/10"
                disabled={loginProcess}
            >
                {loginProcess ? "LOGGING IN..." : "LOGIN"}
            </button>
        );
    }

    if (isConnected && auth.user !== null) {
        dashboardButton = (
            <Link
                href={route("dashboard")}
                className="text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 text-center items-center leading-3"
            >
                DASHBOARD
            </Link>
        );
    }

    return (
        <>
            <Head title="Welcome" />

            <Toaster position="bottom-center" reverseOrder={false} />

            <div className="w-full min-h-screen pt-6 overflow-hidden z-100">
                <div className="flex items-start justify-center px-6 mt-3 sm:px-16 sm:mt-1">
                    <div className="xl:max-w-[1280px] w-full xl:px-0">
                        <header className="sticky top-0 w-full text-slate-200">
                            <section className="flex flex-col items-center justify-between mx-auto ss:flex-row">
                                <Link href={route("welcome")}>
                                    <Logo className="block w-auto fill-current h-14" />
                                </Link>
                                <div className="flex flex-col gap-2 mt-8 ss:flex-row ss:mt-0">
                                    <div className="flex flex-row items-end bg-slate-900 rounded-3xl">
                                        <w3m-button
                                            label="Connect Wallet"
                                            loadingLabel="Connecting..."
                                            size="md"
                                        />
                                    </div>
                                    {loginButton}
                                    {dashboardButton}
                                </div>
                            </section>
                        </header>
                    </div>
                </div>

                <div className="flex items-start justify-center px-6 -mt-6 sm:px-16 sm:-mt-0">
                    <div className="xl:max-w-[1280px] w-full">
                        <Hero />
                        <Lottery />
                        <Roi />
                        <Royalty />
                        <Trusted />
                        {/* <NftsBatch /> */}
                        {/* <Adds /> */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
