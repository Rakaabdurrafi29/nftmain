import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import UserBox from "@/Components/Member/Dashboard/UserBox";
import UserBox2 from "@/Components/Member/Dashboard/UserBox2";
import Statistics from "@/Components/Member/Dashboard/Statistics";
import LotteryPot from "@/Components/Member/Dashboard/LotteryPot";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [userActive, setUserActive] = useState(Boolean(auth.user.is_mint));
    const [userTxHash, setUserTxHash] = useState(true);
    const [showRefLink, setShowRefLink] = useState(false);

    useEffect(() => {
        if (auth.user.mint_transaction_hash === null) {
            setUserTxHash(false);
        } else {
            setUserTxHash(true);
        }
    }, []);

    const [linkCopied, setLinkCopied] = useState(false);

    async function copyRefLink() {
        var copyText = document.getElementById("username");

        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(copyText.value);
                setLinkCopied(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function closeModal() {
        setShowRefLink(false);
        setLinkCopied(false);
    }

    return (
        <>
            <AuthenticatedLayout userData={auth.user} header={"Dashboard"}>
                <BreadCrumb title="Dashboard" path="Dashboard" />
                <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-12">
                    {!userActive && !userTxHash && (
                        <UserBox
                            auth={auth}
                            userActive={userActive}
                            setUserActive={setUserActive}
                            // showRefLink={showRefLink}
                            setShowRefLink={setShowRefLink}
                        />
                    )}
                    {!userActive && userTxHash && (
                        <UserBox2
                            auth={auth}
                            // wrongAccount={wrongAccount}
                            userActive={userActive}
                            setUserActive={setUserActive}
                            setUserTxHash={setUserTxHash}
                            // showRefLink={showRefLink}
                            setShowRefLink={setShowRefLink}
                        />
                    )}
                    {userActive && (
                        <UserBox2
                            auth={auth}
                            // wrongAccount={wrongAccount}
                            userActive={userActive}
                            setUserActive={setUserActive}
                            setUserTxHash={setUserTxHash}
                            // showRefLink={showRefLink}
                            setShowRefLink={setShowRefLink}
                        />
                    )}
                    <Statistics />
                    <LotteryPot />
                </div>
                {/* <div className="grid grid-cols-1 p-4 mb-2 md:grid-cols-2">
                    <div className="col-span-12">
                        <div className="relative w-full"></div>
                    </div>
                </div> */}

                {showRefLink && (
                    <div
                        id="default-modal"
                        className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900/90"
                    >
                        <div className="flex items-center justify-center h-screen m-auto">
                            <div className="relative w-11/12 bg-gray-700 rounded-lg shadow sm:w-1/3">
                                <div className="flex items-center justify-between p-4 border-b border-gray-600 rounded-t md:p-5">
                                    <h3 className="text-xl font-semibold text-white">
                                        Your Referral Link
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => closeModal()}
                                        className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg ms-auto hover:bg-gray-600 hover:text-white"
                                        data-modal-hide="default-modal"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                </div>
                                <div className="p-4 space-y-4 md:p-5">
                                    <div className="relative flex flex-wrap mb-4 group ">
                                        <button
                                            onClick={() => copyRefLink()}
                                            className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]  border-neutral-600 text-neutral-400 placeholder:text-neutral-200 tooltip"
                                        >
                                            {linkCopied ? (
                                                <svg
                                                    className="w-5 h-5 fill-emerald-300"
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
                                                            d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
                                                            stroke="#cccccc"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                        <path
                                                            d="M9 13.4L10.7143 15L15 11"
                                                            stroke="#cccccc"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>{" "}
                                                        <path
                                                            d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                                                            stroke="#cccccc"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                    </g>
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5"
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
                                                            d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                                            stroke="#cccccc"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                        <path
                                                            opacity="0.5"
                                                            d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                                            stroke="#cccccc"
                                                            strokeWidth="1.5"
                                                        ></path>{" "}
                                                    </g>
                                                </svg>
                                            )}
                                        </button>
                                        <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded -top-10 group-hover:scale-100">
                                            {linkCopied
                                                ? "Referral Link Copied!"
                                                : "Copy Referral Link"}
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={`https://nftlot.io/register/${auth.user.username}`}
                                            className="relative m-0 w-[1px] min-w-0 flex-auto border border-solid bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-neutral-500 focus:text-slate-200 focus:outline-none border-neutral-600 text-neutral-200 placeholder:text-slate-500 rounded-r-lg"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {/* <div className="flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
                                    <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        onClick={() => setShowRefLink(false)}
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        Close
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}
