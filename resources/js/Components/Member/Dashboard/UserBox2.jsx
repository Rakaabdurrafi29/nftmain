import { useContext, useEffect, useState } from "react";
import {
    useTransaction,
    useAccount,
    useChains,
    useSwitchChain,
    useReadContract,
} from "wagmi";
import { polygonAmoy, polygon } from "viem/chains";
import toast from "react-hot-toast";
import { resetUserHash, updateUserAfterMinting } from "@/Utils/auth";
import { abi } from "@/Artifacts/Contracts/abi/amoy_abi.json";
import { abimainnet } from "@/Artifacts/Contracts/abi/mainnet_abi.json";
import { UserContext } from "@/Layouts/AuthenticatedLayout";
import truncateEthAddress from "truncate-eth-address";
import openseaImg from "../../../assets/img/opensea.png";
import raribleImg from "../../../assets/img/rarible.png";
import images from "@/Utils/images";

export default function UserBox2({
    auth,
    userActive,
    setUserActive,
    setUserTxHash,
    setShowRefLink,
}) {
    let text;
    if (auth.user.rank_id === 1) text = "text-stone-400";
    if (auth.user.rank_id === 2) text = "text-amber-700";
    if (auth.user.rank_id === 3) text = "text-zinc-400";
    if (auth.user.rank_id === 4) text = "text-amber-400";
    if (auth.user.rank_id === 5) text = "text-lime-400";
    if (auth.user.rank_id === 6) text = "text-cyan-400";
    if (auth.user.rank_id === 7) text = "text-indigo-400";

    const [nftAddressCopied, setNftAddressCopied] = useState(false);
    const [tokenIdCopied, setTokenIdCopied] = useState(false);

    const { userName } = useContext(UserContext);

    const userBgName = auth.user.profile_bg; // misal: 'avatar-2.jpg'
    const userBgPath = "../assets/img/" + userBgName;
    const userBgUrl = images[userBgPath];

    const avatarName = auth.user.avatar; // misal: 'avatar-2.jpg'
    const avatarPath = "../assets/img/" + avatarName;
    const avatarUrl = images[avatarPath];

    const nftScAddress =
        import.meta.env.VITE_APP_ENV == "testnet"
            ? import.meta.env.VITE_SC_NFT_ADDRESS_T
            : import.meta.env.VITE_SC_NFT_ADDRESS_M;

    let mintButton = "";

    const transaction = useTransaction({
        hash: auth.user.mint_transaction_hash,
        chainId:
            import.meta.env.VITE_APP_ENV == "testnet"
                ? polygonAmoy.id
                : polygon.id,
        onError: (e) =>
            e.name === "InvalidParamsRpcError" && !userActive
                ? toast.error("Error: Invalid transaction hash.")
                : console.log("bump"),
    });

    let tokenId = "";

    const { data: tId } = useReadContract({
        address: nftScAddress,
        abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
        functionName: "tokenOfOwnerByIndex",
        args: [auth.user.wallet_address, 0],
    });

    tokenId = tId;

    if (tokenId === undefined) {
        const { data: tId } = useReadContract({
            address: nftScAddress,
            abi: import.meta.env.VITE_APP_ENV == "testnet" ? abi : abimainnet,
            functionName: "currentTokenId",
        });
        tokenId = tId;
    }

    const { chain } = useChains();
    const { switchChain } = useSwitchChain();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;

    async function addNft() {
        try {
            if (chain?.id !== chainId) {
                await switchChain?.(chainId);
                return;
            }

            // console.log(nftScAddress);
            // console.log(tokenId);

            // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
            const wasNftAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC721",
                    options: {
                        address: nftScAddress, // The address of the token.
                        tokenId: tokenId?.toString(),
                    },
                },
            });

            if (wasNftAdded) {
                console.log("NFT Added to wallet!");
            } else {
                console.log("User Reject to add NFT to wallet!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function checkTxHash() {
        if (transaction.data.blockNumber !== null) {
            if (
                transaction.data.from.toLowerCase() ===
                auth.user.wallet_address.toLowerCase()
            ) {
                if (transaction.data.value !== BigInt(0)) {
                    (async () => {
                        const usrActivated = await updateUserAfterMinting();
                        if (usrActivated.status === "success") {
                            toast.success(usrActivated.message);
                            setUserActive(true);
                        } else if (usrActivated.status === "failed") {
                            toast.error(usrActivated.message);
                        }
                    })();
                } else {
                    setUserActive(false);
                    (async () => {
                        const resetHash = await resetUserHash();
                        if (resetHash.status === "success") {
                            toast.success(resetHash.message);
                            setUserTxHash(false);
                        } else if (resetHash.status === "failed") {
                            toast.error(resetHash.message);
                        }
                    })();
                }
            } else {
                toast.error(
                    "Transaction hash is not belong to you!\nContact Admin to resolve this problem."
                );
            }
        } else {
            toast.error("Transaction status is still Pending.");
        }
    }

    async function copyNftAddress() {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(nftScAddress);
                setNftAddressCopied(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function copyTokenId() {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(tokenId);
                setTokenIdCopied(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    mintButton = (
        <button
            onClick={() => checkTxHash()}
            className="flex w-[60%] text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 mt-3 justify-center mx-auto leading-3"
        >
            Check Tx Status
        </button>
    );

    return (
        <div className="sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
            <div className="relative grid w-full h-full p-4 overflow-hidden rounded-md shadow bg-slate-800 md:gap-4 lg:gap-2 xl:gap-4 md:grid-cols-1 lg:grid-cols-4">
                <div className="self-center md:col-span-4 lg:col-span-4 xl:col-span-4">
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
                    <p className="mb-5 text-xs font-medium text-center text-slate-400">
                        <code>
                            Wallet address:{" "}
                            {truncateEthAddress(auth.user.wallet_address)}
                        </code>
                    </p>
                    <div className="grid grid-cols-4 my-3 border border-dashed rounded-md border-slate-700">
                        <div className="col-span-4 border-r border-dashed border-slate-700">
                            <div className="items-center px-2 py-3 text-base font-medium text-center text-slate-400 md:text-base lg:text-sm xl:text-base">
                                {userActive && (
                                    <>
                                        <p className="text-xs text-slate-400">
                                            Rank
                                        </p>
                                        <div className="grid items-center grid-cols-1 mx-auto">
                                            {auth.user.is_leader === 1 && (
                                                <svg
                                                    className="mx-auto"
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        id="SVGRepo_bgCarrier"
                                                        strokeWidth="0"
                                                    ></g>
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <path
                                                            opacity="0.5"
                                                            d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z"
                                                            stroke="#fbbf24"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                        <path
                                                            d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z"
                                                            stroke="#fbbf24"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                        <path
                                                            opacity="0.5"
                                                            d="M7.35111 15L6.71424 17.323C6.0859 19.6148 5.77173 20.7607 6.19097 21.3881C6.3379 21.6079 6.535 21.7844 6.76372 21.9008C7.41635 22.2331 8.42401 21.7081 10.4393 20.658C11.1099 20.3086 11.4452 20.1339 11.8014 20.0959C11.9335 20.0818 12.0665 20.0818 12.1986 20.0959C12.5548 20.1339 12.8901 20.3086 13.5607 20.658C15.576 21.7081 16.5837 22.2331 17.2363 21.9008C17.465 21.7844 17.6621 21.6079 17.809 21.3881C18.2283 20.7607 17.9141 19.6148 17.2858 17.323L16.6489 15"
                                                            stroke="#fbbf24"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        ></path>{" "}
                                                    </g>
                                                </svg>
                                            )}
                                        </div>
                                        <h6
                                            className={`text-lg font-medium ${text}`}
                                        >
                                            {auth.user.rank_str.toUpperCase()}
                                        </h6>
                                    </>
                                )}
                                {!userActive && (
                                    <>
                                        {auth.user.mint_transaction_hash !==
                                            null &&
                                            !userActive && (
                                                <p className="flex text-xs text-amber-200">
                                                    You left this page while
                                                    minting transaction status
                                                    still pending.
                                                </p>
                                            )}
                                        {mintButton}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {userActive && (
                        <div className="grid grid-cols-4 my-3 border border-dashed rounded-md border-slate-700">
                            <div className="col-span-4 border-r border-dashed border-slate-700">
                                <div className="px-2 pt-5 pb-2 text-base font-medium text-center text-slate-400 md:text-base lg:text-sm xl:text-base">
                                    <p className="mb-4 -mt-2 text-xs text-slate-200">
                                        My NFT
                                    </p>
                                    <a
                                        target="_blank"
                                        href={`https://opensea.io/assets/matic/${nftScAddress}/${tokenId}`}
                                        className="px-3 py-2 mx-2 mb-3 text-sm font-semibold rounded lg:px-4 bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-blue-600"
                                    >
                                        <img
                                            src={openseaImg}
                                            className="inline h-5 mr-2 -mt-1"
                                        />{" "}
                                        OpenSea
                                    </a>
                                    <a
                                        target="_blank"
                                        href={`https://rarible.com/token/polygon/${nftScAddress}:${tokenId}`}
                                        className="px-3 py-2 mx-2 mb-3 text-sm font-semibold text-white rounded lg:px-4 bg-slate-800 hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <img
                                            src={raribleImg}
                                            className="inline h-5 mr-2 -mt-1"
                                        />{" "}
                                        Rarible
                                    </a>
                                    <button
                                        className="text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 text-center items-center leading-3 disabled:bg-slate-400/20 disabled:border-slate-300/20 disabled:text-slate-500 disabled:hover:bg-[#eca700]/10 mt-4 mb-2"
                                        onClick={() => addNft()}
                                    >
                                        Add NFT to Your Wallet
                                    </button>
                                    <div className="text-xs font-medium text-center text-slate-400">
                                        <span className="text-slate-200">
                                            <code>NFT Info:</code>
                                        </span>
                                        <div className="relative flex items-center justify-center gap-2 py-1 group">
                                            <code>
                                                Address:{" "}
                                                {truncateEthAddress(
                                                    nftScAddress
                                                )}
                                            </code>

                                            <button
                                                className="flex whitespace-nowrap tooltip"
                                                onClick={() => copyNftAddress()}
                                            >
                                                {nftAddressCopied ? (
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            id="SVGRepo_bgCarrier"
                                                            strokeWidth="0"
                                                        ></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <path
                                                                d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M6.08008 15L8.03008 16.95L11.9201 13.05"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            id="SVGRepo_bgCarrier"
                                                            strokeWidth="0"
                                                        ></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <path
                                                                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                            <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-black rounded -top-10 group-hover:scale-100">
                                                {nftAddressCopied
                                                    ? "NFT Address Copied!"
                                                    : "Copy NFT Address"}
                                            </span>
                                        </div>
                                        <div className="relative flex items-center justify-center gap-2 group">
                                            <code>
                                                Token ID: {tokenId?.toString()}
                                            </code>
                                            <button
                                                className="flex whitespace-nowrap tooltip"
                                                onClick={() => copyTokenId()}
                                            >
                                                {tokenIdCopied ? (
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            id="SVGRepo_bgCarrier"
                                                            strokeWidth="0"
                                                        ></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <path
                                                                d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M6.08008 15L8.03008 16.95L11.9201 13.05"
                                                                stroke="#65B741"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            id="SVGRepo_bgCarrier"
                                                            strokeWidth="0"
                                                        ></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <path
                                                                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                            <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-black rounded -top-10 group-hover:scale-100">
                                                {tokenIdCopied
                                                    ? "NFT TokenID Copied!"
                                                    : "Copy NFT TokenID"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}{" "}
                    <div className="py-2 text-center">
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
