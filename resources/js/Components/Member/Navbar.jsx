import { Link } from "@inertiajs/react";
import Logo from "../Logo";
import { useState, useContext } from "react";
import { UserContext } from "@/Layouts/AuthenticatedLayout";
import icon from "../../assets/img/icon.png";
import images from "@/Utils/images";

export default function Navbar({
    user,
    showUserNameForm,
    setShowUserNameForm,
}) {
    const { userName } = useContext(UserContext);

    const [mobileMenu, setMobileMenu] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleToggleMenu = () => {
        setMobileMenu((current) => !current);
    };

    const handleLogout = () => {
        setLoggingOut((current) => !current);
    };

    const path = window.location.pathname;

    const avatarName = user.avatar; // misal: 'avatar-2.jpg'
    const avatarPath = "../assets/img/" + avatarName;
    const avatarUrl = images[avatarPath] || "/fallback-avatar.jpg";

    return (
        <>
            <nav className="block py-4 bg-gray-900 border-gray-200 shadow-md dark:bg-slate-800 print:hidden">
                <div className="container xl:max-w-[1280px] mx-auto flex flex-wrap items-center text-white px-4">
                    <div className="flex items-center">
                        <a href="#" className="flex items-center outline-none">
                            <img
                                src={icon}
                                alt=""
                                className="block h-8 sm:hidden"
                            />
                            <Logo className="hidden w-auto h-10 ml-2 mr-4 text-gray-800 fill-current dark:text-gray-200 sm:block" />
                        </a>
                    </div>

                    <section
                        className="items-center justify-between order-2 hidden w-full mt-0 sm:order-1 md:ml-5 lg:block sm:w-auto active"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 ml-6 space-x-0 text-base font-medium font-body sm:mt-0 sm:flex-row sm:font-medium sm:space-x-4 lg:space-x-6 xl:space-x-8 navbar">
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/dashboard" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </li>
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/network" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("network")}>Network</Link>
                            </li>
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/bonus" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("bonus")}>Bonus</Link>
                            </li>
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/roi" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("roi")}>R.O.I</Link>
                            </li>
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/wallet" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("wallet")}>N-Wallet</Link>
                            </li>
                            <li
                                className={`hover:text-amber-400 ${
                                    path === "/lottery" && "text-amber-400"
                                }`}
                            >
                                <Link href={route("lottery")}>Lottery</Link>
                            </li>
                            <li className="hover:text-amber-400 active:text-amber-400">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    disabled={loggingOut}
                                    onClick={handleLogout}
                                >
                                    {loggingOut && "Logging out..."}
                                    {!loggingOut && "Logout"}
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <section
                        id="mobile-menu"
                        className={`absolute top-0 left-0 bg-black/90 p-4 w-full text-xl flex-col justify-content-center origin-top animate-open-menu z-20 ${
                            mobileMenu ? "flex" : "hidden"
                        }`}
                    >
                        <button
                            className="self-end px-6 text-4xl text-white"
                            onClick={handleToggleMenu}
                        >
                            &times;
                        </button>

                        <ul className="flex flex-col items-center min-h-screen py-4">
                            <li className="mb-4">
                                <div className="mr-2 lg:mr-0">
                                    <button
                                        type="button"
                                        className="flex items-center text-sm rounded-full dropdown-toggle focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
                                        id="user-profile"
                                        aria-expanded="false"
                                        data-dropdown-toggle="navUserdata"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={avatarUrl}
                                            alt="user photo"
                                        />
                                        <span className="ml-2 text-xl text-left xl:block">
                                            <span className="block font-medium text-gray-400">
                                                {userName}
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="mt-4">
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </li>
                            <li className="mt-4">
                                <Link href={route("network")}>Network</Link>
                            </li>
                            <li className="mt-4">
                                <Link href={route("bonus")}>Bonus</Link>
                            </li>
                            <li className="mt-4">
                                <Link href={route("roi")}>R.O.I</Link>
                            </li>
                            <li className="mt-4">
                                <Link href={route("wallet")}>N-Wallet</Link>
                            </li>
                            <li className="mt-4">
                                <Link href={route("lottery")}>Lottery</Link>
                            </li>
                            <li className="mt-4">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    disabled={loggingOut}
                                    onClick={handleLogout}
                                >
                                    {loggingOut && "Logging out..."}
                                    {!loggingOut && "Logout"}
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="flex items-center order-1 ml-auto md:order-2">
                        <div className="relative flex flex-row mr-2 lg:mr-0 dropdown">
                            <button
                                type="button"
                                className="flex items-center text-sm rounded-full dropdown-toggle focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
                                id="user-profile"
                                onClick={() => setShowUserNameForm(true)}
                            >
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={avatarUrl}
                                    alt="user photo"
                                />
                                <span className="ml-2 text-left xl:block">
                                    <span className="block font-medium text-gray-400">
                                        {userName}
                                    </span>
                                </span>
                            </button>
                        </div>
                        <button
                            className="ml-4 text-3xl cursor-pointer lg:hidden"
                            onClick={handleToggleMenu}
                        >
                            &#9776;
                        </button>
                    </div>
                </div>
            </nav>
            {/* {showUserNameForm && (
                <div
                    id="default-modal"
                    className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900/90"
                >
                    aa
                    <div className="flex items-center justify-center h-screen m-auto">
                        <div className="relative w-11/12 bg-white rounded-lg shadow dark:bg-gray-700 sm:w-1/3">
                            <form onSubmit={doUpdateUsername}>
                                <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Change Username
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowUserNameForm(false)
                                        }
                                        className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
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
                                        className="inline-block mb-2 text-neutral-700 dark:text-neutral-200"
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
                                        <span className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-0 py-0 text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"></span>
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
                                <div className="flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
                                    <button
                                        data-modal-hide="default-modal"
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Save
                                    </button>
                                    <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        onClick={() =>
                                            setShowUserNameForm(false)
                                        }
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}
