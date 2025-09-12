import Navbar from "@/Components/Member/Navbar";
import { Head } from "@inertiajs/react";
import { toast, Toaster } from "react-hot-toast";

import { useEffect, useState, createContext } from "react";
import debounce from "debounce";
import { checkUserName, updateUserName, getMessage } from "@/Utils/auth";
import { polygonAmoy, polygon } from "viem/chains";
import { useSignMessage, useAccount, useChainId, useSwitchChain } from "wagmi";
import Footer from "@/Components/Footer";

export const UserContext = createContext({
    userName: "",
    setUsername: () => {},
});

export default function Authenticated({ userData, header, children }) {
    const [userName, setUsername] = useState(userData.username);
    const [showUserNameForm, setShowUserNameForm] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [usernameEmpty, setUsernameEmpty] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const { signMessageAsync } = useSignMessage();
    const { isConnected, address } = useAccount();
    const { chain_id } = useChainId();

    const { connector: activeConnector } = useAccount();
    const { switchChain } = useSwitchChain();
    const chainId =
        import.meta.env.VITE_APP_ENV == "testnet" ? polygonAmoy.id : polygon.id;

    // useEffect(() => {c6c5bd
    //     const handleConnectorUpdate = ({ account, chain }) => {
    //         if (account) {
    //             if (account !== userData.wallet_address) {
    //                 toast.error("You are connected to the wrong account!");
    //             } else {
    //                 toast.success("You are connected to the right account!");
    //             }
    //         } else if (chain_id) {
    //             if (chain_id !== chainId) {
    //                 toast.error("You are connected to the wrong network!");
    //                 const network = async () => {
    //                     await switchChain?.(chainId);
    //                 };
    //                 network();
    //             }
    //         }
    //     };

    //     if (activeConnector) {
    //         activeConnector.on("change", handleConnectorUpdate);
    //     }

    //     return () => activeConnector?.off("change", handleConnectorUpdate);
    // }, [activeConnector]);

    async function handleChange(e) {
        if (e.target.value === "") {
            setUsernameEmpty(true);
        } else {
            setUsernameEmpty(false);
            const available = await checkUserName(e.target.value);
            setUsernameAvailable(available);
            setNewUsername(e.target.value);
        }
    }

    async function doUpdateUsername(e) {
        e.preventDefault();

        if (address !== userData.wallet_address) {
            toast.error("You are connected to the wrong wallet!");
            return;
        }

        if (isConnected && chain?.id !== chainId) {
            const network = async () => {
                await switchNetwork?.(chainId);
            };

            network();
        }

        if (usernameAvailable && isConnected && chain?.id === chainId) {
            const msg = await getMessage("request update username");
            let signature = "";
            try {
                signature = await signMessageAsync({ message: msg.data });
            } catch (error) {
                toast.error(getFirstLine(error.message));
            }

            if (signature) {
                const updateUsername = await updateUserName(
                    signature,
                    address,
                    msg.data,
                    newUsername
                );

                if (updateUsername.updateError) {
                    setUsernameEmpty(true);
                    toast.error(updateUsername.updateError);
                } else {
                    setUsernameEmpty(true);
                    setUsername(newUsername);
                    toast.success("Username updated successfully.");
                }
            }
        } else if (!usernameAvailable) {
            toast.error("Username " + newUsername + " already taken.");
        }
        setShowUserNameForm(false);
    }

    return (
        <UserContext.Provider
            value={{ userName: userName, setUsername: setUsername }}
        >
            <Head title={header} />

            <Toaster position="bottom-center" reverseOrder={false} />

            <div className={`bg-gray-900 `}>
                <div className={`flex flex-col`}>
                    <header className="fixed top-0 left-0 z-20 w-full">
                        <Navbar
                            user={userData}
                            showUserNameForm={showUserNameForm}
                            setShowUserNameForm={setShowUserNameForm}
                        />
                    </header>
                    <div className="container xl:max-w-[1280px] flex-grow mx-auto px-4 relative mt-3">
                        {children}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="container xl:max-w-[1280px] flex-grow mx-auto px-4 relative mt-3">
                        <Footer />
                        <div className="fixed bottom-4 right-4">
                            {/* <div className="items-center p-1 bg-slate-900 rounded-3xl"> */}
                            <w3m-button />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {showUserNameForm && (
                <div
                    id="default-modal"
                    className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900/90"
                >
                    aa
                    <div className="flex items-center justify-center h-screen m-auto">
                        <div className="relative w-11/12 bg-gray-700 rounded-lg shadow sm:w-1/3">
                            <form onSubmit={doUpdateUsername}>
                                <div className="flex items-center justify-between p-4 border-b border-gray-600 rounded-t md:p-5">
                                    <h3 className="text-xl font-semibold text-white">
                                        Change Username
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowUserNameForm(false)
                                        }
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
                                    <label
                                        htmlFor="basic-url"
                                        className="inline-block mb-2 text-neutral-200"
                                    >
                                        Choose your new Username
                                    </label>
                                    <div className="relative flex flex-wrap mb-4 ">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            onChange={debounce(
                                                handleChange,
                                                500
                                            )}
                                            placeholder="New username"
                                            className="relative m-0 w-full flex-auto border border-solid bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-neutral-500 focus:text-slate-200 focus:outline-none border-neutral-600 text-neutral-200 placeholder:text-slate-500"
                                        />
                                        <span className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid px-0 py-0 text-center text-base font-normal leading-[1.6] border-neutral-600 text-neutral-200 placeholder:text-neutral-200"></span>
                                        {usernameEmpty && (
                                            <span className="flex w-full mt-1 text-sm text-red-400">
                                                Username can not empty!
                                            </span>
                                        )}
                                        {usernameAvailable &&
                                            !usernameEmpty && (
                                                <span className="flex w-full mt-1 text-sm text-green-400">
                                                    Username &nbsp;
                                                    <strong>
                                                        {newUsername}
                                                    </strong>
                                                    &nbsp; available 👋🏼
                                                </span>
                                            )}
                                        {!usernameAvailable &&
                                            !usernameEmpty && (
                                                <span className="flex w-full mt-1 text-sm text-red-400">
                                                    Username &nbsp;
                                                    <strong>
                                                        {newUsername}
                                                    </strong>
                                                    &nbsp; already taken 😭
                                                </span>
                                            )}
                                    </div>
                                </div>
                                <div className="flex items-center p-4 border-t border-gray-600 rounded-b md:p-5">
                                    <button
                                        data-modal-hide="default-modal"
                                        type="submit"
                                        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    >
                                        Save
                                    </button>
                                    <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        onClick={() =>
                                            setShowUserNameForm(false)
                                        }
                                        className="ms-3 focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </UserContext.Provider>
    );
}
