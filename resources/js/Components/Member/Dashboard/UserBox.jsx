import { useEffect, useState, useContext } from "react";
import {
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
    useAccount,
    useSwitchChain,
    useChainId,
} from "wagmi";
import { abi } from "@/Artifacts/Contracts/abi/amoy_abi.json";
import { abimainnet } from "@/Artifacts/Contracts/abi/mainnet_abi.json";
import { derc20abi } from "@/Artifacts/Contracts/abi/derc20.json";
import { usdtposabi } from "@/Artifacts/Contracts/abi/usdt_pos.json";
import toast from "react-hot-toast";
import { updateUserAfterMinting, recordTxHash } from "@/Utils/auth";
import { polygonAmoy, polygon } from "viem/chains";
import { getFirstLine } from "@/Utils/error";
import { UserContext } from "@/Layouts/AuthenticatedLayout";
import images from "@/Utils/images";

export default function UserBox({
    auth,
    userActive,
    setUserActive,
    setShowRefLink,
}) {
    // const [accountNotMatch, setAccountNotMatch] = useState(false);
    // const [chainNotMatch, setChainNotMatch] = useState(false);
    const envChainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;

    const { switchChain } = useSwitchChain();
    const chainName =
        import.meta.env.VITE_APP_ENV == "testnet" ? "Polygon Amoy" : "Polygon";
    const { isConnected, address } = useAccount();
    const activeChainId = useChainId();

    useEffect(() => {
        if (isConnected && activeChainId !== envChainId) {
            const network = async () => {
                try {
                    await switchChain({ chainId: envChainId });
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

        // if (!isConnected) {
        //     router.post(route("logout"));
        // }
    }, [isConnected, activeChainId, envChainId]);

    // console.log("connected", isConnected);

    let mintButton = "";

    const { userName } = useContext(UserContext);

    const userBgName = auth.user.profile_bg; // misal: 'avatar-2.jpg'
    const userBgPath = "../assets/img/" + userBgName;
    const userBgUrl = images[userBgPath];

    const avatarName = auth.user.avatar; // misal: 'avatar-2.jpg'
    const avatarPath = "../assets/img/" + avatarName;
    const avatarUrl = images[avatarPath];

    // const [userActive, setUserActive] = useState(Boolean(auth.user.is_mint));
    const [isMintLoading, setIsMintLoading] = useState(false);
    const [isMintStarted, setIsMintStarted] = useState(false);
    const [isApprovalLoading, setIsApprovalLoading] = useState(false);
    const [isApprovalStarted, setIsApprovalStarted] = useState(false);

    const nftScAddress =
        import.meta.env.VITE_APP_ENV == "testnet"
            ? import.meta.env.VITE_SC_NFT_ADDRESS_T
            : import.meta.env.VITE_SC_NFT_ADDRESS_M;

    const erc20ScAddress =
        import.meta.env.VITE_APP_ENV == "testnet"
            ? import.meta.env.VITE_SC_ERC20_ADDRESS_T
            : import.meta.env.VITE_SC_ERC20_ADDRESS_M;

    const { data: sendAmount } = useReadContract({
        address: nftScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
        functionName: "PROVIDER_FEE",
    });
    // const sendAmount = BigInt(feeData);

    const { data: erc20Amount } = useReadContract({
        address: nftScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
        functionName: "chargeAmountForERC20",
        args: [erc20ScAddress],
    });
    // const erc20Amount = BigInt(priceData);

    const {
        writeContract,
        data: hash,
        isPending: approvalLoading,
        isSuccess: approvalStarted,
        error,
    } = useWriteContract();

    console.log(error);

    function approve() {
        if (isConnected) {
            if (activeChainId === envChainId) {
                // console.log("erc20Amount", erc20Amount);
                if (erc20Amount !== undefined) {
                    writeContract({
                        address: erc20ScAddress,
                        abi:
                            import.meta.env.VITE_APP_ENV == "testnet"
                                ? derc20abi
                                : usdtposabi,
                        chainId: envChainId,
                        functionName: "approve",
                        args: [nftScAddress, erc20Amount],
                        account: address,
                        onError(error) {
                            toast.error(getFirstLine(error.message));
                        },
                    });
                } else {
                    toast.error(
                        "Network error occurred while reading the smart contract!\nPlease try again in a minute."
                    );
                }
            } else {
                toast.error(
                    "You are on the wrong network!\nPlease switch to the right network and try again."
                );
            }
        } else {
            toast.error(
                "You are disconnected!\nPlease re-connect and try again."
            );
        }
    }

    // console.log(error);

    useEffect(() => {
        setIsApprovalLoading(approvalLoading);
        setIsApprovalStarted(approvalStarted);
    }, [approvalLoading, approvalStarted]);

    const { isSuccess: appSuccess } = useWaitForTransactionReceipt({
        hash: hash,
    });

    const isApproved = appSuccess;

    const {
        data: mintData,
        writeContract: mint,
        isPending: isLoading,
        isSuccess: isSuccess,
    } = useWriteContract({
        address: nftScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
        chainId:
            import.meta.env.VITE_APP_ENV == "testnet"
                ? polygonAmoy.id
                : polygon.id,
        functionName: "mintToMultipleERC20",
        args: [auth.user.wallet_address, BigInt(1), erc20ScAddress],
        value: [sendAmount],
        enabled: Boolean(sendAmount),
        account: address,
        onError(error) {
            toast.error(getFirstLine(error.message));
        },
    });

    const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
        hash: mintData?.hash,
    });

    const isMinted = txSuccess;

    useEffect(() => {
        setIsApprovalStarted(false);
        setIsMintLoading(isLoading);
        setIsMintStarted(isSuccess);

        if (isMinted) {
            setIsMintStarted(false);
        }
    }, [isLoading, isSuccess, isMinted]);

    useEffect(() => {
        if (mintData?.hash) {
            (async () => {
                const txHash = await recordTxHash(mintData?.hash);
                if (txHash.status === "success") {
                    toast.success(txHash.message);
                } else if (txHash.status === "failed") {
                    toast.error(txHash.message);
                }
            })();
        }
    }, [mintData?.hash]);

    useEffect(() => {
        if (isMinted) {
            (async () => {
                const usrActivated = await updateUserAfterMinting();
                if (usrActivated.status === "success") {
                    toast.success(usrActivated.message);
                    setUserActive(true);
                } else if (usrActivated.status === "failed") {
                    toast.error(usrActivated.message);
                }
            })();
        }
    }, [isMinted]);

    useEffect(() => {
        if (isApproved) {
            document.getElementById("mintButton").click();
        }
    }, [isApproved]);

    mintButton = (
        <>
            <button id="mintButton" hidden onClick={() => mint?.()}>
                mint
            </button>
            <button
                disabled={
                    isMintLoading ||
                    isMintStarted ||
                    isApprovalLoading ||
                    isApprovalStarted
                }
                onClick={() => {
                    if (!approve) {
                        toast.error("Approval function not ready.");
                        return;
                    }
                    approve?.();
                }}
                data-mint-loading={isMintLoading || isApprovalLoading}
                data-mint-started={isMintStarted || isApprovalStarted}
                className="flex w-[60%] text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 mt-3 justify-center mx-auto leading-3 disabled:hover:bg-transparent"
            >
                {isApprovalLoading && "Waiting for approval..."}
                {isApprovalStarted && "Approving..."}
                {isMintLoading && "Waiting for approval..."}
                {isMintStarted && "Minting..."}
                {!isMintLoading &&
                    !isMintStarted &&
                    !isApprovalLoading &&
                    !isApprovalStarted &&
                    "Mint My NFT Now!"}
            </button>
        </>
    );

    // useEffect(() => {
    //     if (address !== auth.user.wallet_address) {
    //         toast.error("You connect to the wrong wallet account!");
    //     }
    // }, [address]);

    return (
        <div className="sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
            <div className="relative grid w-full h-full p-2 overflow-hidden rounded-md shadow bg-slate-800 md:gap-4 lg:gap-2 xl:gap-4 md:grid-cols-1 lg:grid-cols-4">
                <div className="self-center w-full text-center md:col-span-4 lg:col-span-4 xl:col-span-4">
                    <img
                        src={userBgUrl}
                        alt=""
                        className="w-full rounded-md h-36"
                    />
                    <img
                        src={avatarUrl}
                        alt=""
                        className="h-32 p-1 mx-auto mb-2 -mt-20 border-2 border-gray-700 rounded-full"
                    />
                    <h3 className="text-xl font-bold leading-8 text-center text-slate-100 md:text-xl lg:text-lg xl:text-xl">
                        {userName}
                    </h3>
                    <span className="mb-5 text-xs font-medium text-center text-slate-400">
                        {auth.user.wallet_address}
                    </span>
                    <div className="grid grid-cols-4 my-3 border border-dashed rounded-md border-slate-700">
                        <div className="col-span-4 border-r border-dashed border-slate-700">
                            <div className="px-2 py-3 text-base font-medium text-center text-slate-400 md:text-base lg:text-sm xl:text-base">
                                {userActive && (
                                    <>
                                        <p className="text-xs text-slate-400">
                                            Rank
                                        </p>
                                        <h6 className="text-lg font-medium text-amber-400">
                                            {auth.user.rank_str.toUpperCase()}
                                        </h6>
                                    </>
                                )}
                                {!userActive && (
                                    <>
                                        {auth.user.mint_transaction_hash ===
                                            null &&
                                            !userActive && (
                                                <p className="flex text-xs text-amber-200">
                                                    Your account is NOT active
                                                    yet, please mint your NFT to
                                                    activate your account
                                                </p>
                                            )}
                                        {mintButton}
                                        {/* {accountNotMatch && (
                                            <p className="text-xs text-red-400">
                                                You are connected to the wrong
                                                wallet address!
                                            </p>
                                        )}
                                        {chainNotMatch && (
                                            <p className="text-xs text-red-400">
                                                You are connected to the wrong
                                                chain!
                                            </p>
                                        )} */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="py-2 text-center">
                        {/* <Link
                            href={`https://testnets.opensea.io/assets/goerli/${openseaUrl}/1`}
                        >
                            Opensea
                        </Link> */}
                        {userActive && (
                            <button
                                className="px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded lg:px-4 hover:bg-blue-600"
                                onClick={() => setShowRefLink(true)}
                            >
                                Invite New Member
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
