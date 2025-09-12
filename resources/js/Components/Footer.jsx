import Logo from "./Logo";
import { useAccount, useChainId, useSwitchChain, useSignMessage } from "wagmi";
import { polygonAmoy, polygon } from "viem/chains";

export default function Footer() {
    const erc20Address =
        import.meta.env.VITE_APP_ENV === "testnet"
            ? "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
            : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
    const erc20Symbol =
        import.meta.env.VITE_APP_ENV === "testnet" ? "DERC20" : "USDT";
    const erc20Decimals = import.meta.env.VITE_APP_ENV === "testnet" ? 18 : 6;

    const { chain_id } = useChainId();
    const { switchChain } = useSwitchChain();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;

    async function addToken() {
        try {
            if (chain_id !== chainId) {
                await switchChain?.(chainId);
                return;
            }

            // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: erc20Address, // The address of the token.
                        symbol: erc20Symbol, // A ticker symbol or shorthand, up to 5 characters.
                        decimals: erc20Decimals, // The number of decimals in the token.
                        chainId: chainId,
                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex flex-col items-center justify-center pt-8 pb-8">
            <div className="flex flex-col items-start justify-center w-full mb-1 md:flex-row">
                <div className="flex-[1] flex flex-col justify-start items-start mr-10 px-0 sm:px-4">
                    <Logo className="block w-auto fill-current h-14" />
                    <p
                        className={`font-poppins font-normal text-dimWhite text-[14px] leading-[20.8px] mt-4 max-w-1/2`}
                    >
                        NFT smart contracts are deployed on the Polygon PoS
                        Chain.
                        <br />
                        NFT purchase transactions use{" "}
                        <a
                            className="text-emerald-500 hover:text-emerald-300"
                            href="https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
                            target="_blank"
                        >
                            USDT
                        </a>
                        , and gas fees use{" "}
                        <a
                            className="text-purple-600 hover:text-purple-400"
                            href="https://polygonscan.com/token/0x0000000000000000000000000000000000001010"
                            target="_blank"
                        >
                            POL
                        </a>
                        .
                        {/* <br />
                        <button
                            className="text-white bg-transparent outline-none border border-[#eca700]/40 hover:bg-[#eca700]/80 font-sm rounded-full text-xs px-6 py-3 text-center items-center leading-3 disabled:bg-slate-400/20 disabled:border-slate-300/20 disabled:text-slate-500 disabled:hover:bg-[#eca700]/10 mt-4 mb-2"
                            onClick={() => addToken()}
                        >
                            Add USDT to Your Wallet
                        </button> */}
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-between w-full mt-3 md:flex-row">
                <div className="flex-[1] flex flex-col sm:flex-row justify-between items-start mr-10 px-0 sm:px-4">
                    <div className="font-poppins font-normal text-[14px] leading-[20.8px] text-white">
                        {/* <div className="flex flex-row my-4">
                            <a
                                href="https://twitter.com/nftlot_io"
                                target="_blank"
                            >
                                <img
                                    src="/assets/img/x.png"
                                    alt="twitter"
                                    className="w-[21px] h-[21px] object-contain cursor-pointer mr-6"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/nftlot.io/"
                                target="_blank"
                            >
                                <img
                                    src="/assets/img/instagram.png"
                                    alt="instagram"
                                    className="w-[21px] h-[21px] object-contain cursor-pointer mr-6"
                                />
                            </a>
                        </div> */}
                        Copyright Ⓒ 2025 NFTLot.io. All Rights Reserved.
                    </div>
                </div>
            </div>
        </section>
    );
}
