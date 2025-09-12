import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import "react-loading-skeleton/dist/skeleton.css";
import WalletHeader from "@/Components/Member/Wallet/WalletHeader";
import WalletList from "@/Components/Member/Wallet/WalletList";
import { useEffect, useState } from "react";
// import { useAccount, useSwitchNetwork } from "wagmi";
// import { polygonAmoy, polygon } from "viem/chains";
import toast from "react-hot-toast";
import useWallet from "@/Utils/wallet";

export default function Wallet({ auth }) {
    const [userName, setUsername] = useState(auth.user.username);

    const [myWalletObject, setMyWalletObject] = useState(null);
    const [myWallet, setMyWallet] = useState([]);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const [userActive, setUserActive] = useState(Boolean(auth.user.is_mint));
    const [wrongAccount, setWrongAccount] = useState(false);

    const [withdrawalProcess, setWithdrawalProcess] = useState(false);
    const [myWalletBalance, setMyWalletBalance] = useState(null);

    const { getMyWalletBalance } = useWallet();

    // const { connector: activeConnector } = useAccount();
    // const { switchNetwork } = useSwitchNetwork();
    // const chainId =
    //     import.meta.env.VITE_APP_ENV == "testnet"
    //         ? polygonAmoy.id
    //         : polygon.id;

    // useEffect(() => {
    //     const handleConnectorUpdate = ({ account, chain }) => {
    //         if (account) {
    //             if (account !== auth.user.wallet_address) {
    //                 setWrongAccount(true);
    //                 toast.error("You are connected to the wrong account!");
    //             } else {
    //                 setWrongAccount(false);
    //                 toast.success("You are connected to the right account!");
    //             }
    //         } else if (chain) {
    //             if (chain.id !== chainId) {
    //                 toast.error("You are connected to the wrong network!");
    //                 const network = async () => {
    //                     await switchNetwork?.(chainId);
    //                 };
    //                 network();
    //             }
    //         }
    //     };

    //     if (activeConnector) {
    //         activeConnector.on("change", handleConnectorUpdate);
    //     }

    //     // return () => activeConnector.off("change", handleConnectorUpdate);
    // }, [activeConnector]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyWalletBalance(auth.user.id);
            setMyWalletBalance(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        Echo.private(`withdrawal.${auth.user.id}`).listen(
            "WithdrawalSubmitted",
            (e) => {
                if (e.user.id === auth.user.id) {
                    if (e.wallet.status === "FAILED") {
                        toast.error("Error: " + e.wallet.notes);
                    } else {
                        toast.success(
                            "Your request submitted to blockchain successfully."
                        );
                    }
                    setOffset(0);
                    setWithdrawalProcess(false);
                }
            }
        );
        Echo.private(`withdrawal.${auth.user.id}`).listen(
            "WithdrawalSent",
            (e) => {
                if (e.user.id === auth.user.id) {
                    if (e.wallet.status === "DONE") {
                        toast.success("Your request transferred successfully.");
                        setOffset(1);
                        setWithdrawalProcess(false);

                        const fetchData = async () => {
                            const data = await getMyWalletBalance(auth.user.id);
                            setMyWalletBalance(data);
                        };

                        fetchData();
                    }
                }
            }
        );
    }, []);

    return (
        <>
            <AuthenticatedLayout
                userData={auth.user}
                header={"N-Wallet"}
                userName={userName}
            >
                <BreadCrumb title="N-Wallet" path="N-Wallet" />
                <WalletHeader
                    wrongAccount={wrongAccount}
                    offset={offset}
                    setOffset={setOffset}
                    myWalletBalance={myWalletBalance}
                    setMyWalletBalance={setMyWalletBalance}
                    withdrawalProcess={withdrawalProcess}
                    setWithdrawalProcess={setWithdrawalProcess}
                />
                <div className="grid grid-cols-1 gap-4 px-2 mb-4 ss:grid-cols-2 sm:grid-cols-10 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-10">
                    <WalletList
                        auth={auth}
                        myWallet={myWallet}
                        setMyWallet={setMyWallet}
                        myWalletObject={myWalletObject}
                        setMyWalletObject={setMyWalletObject}
                        offset={offset}
                        setOffset={setOffset}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        withdrawalProcess={withdrawalProcess}
                        setWithdrawalProcess={setWithdrawalProcess}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
