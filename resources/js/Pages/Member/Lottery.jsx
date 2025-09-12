import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import "react-loading-skeleton/dist/skeleton.css";
import LotteryHeader from "@/Components/Member/Lottery/LotteryHeader";
import LotteryCodeList from "@/Components/Member/Lottery/LotteryCodeList";
import { useState } from "react";

export default function Lottery({ auth }) {
    const [userName, setUsername] = useState(auth.user.username);

    return (
        <>
            <AuthenticatedLayout
                userData={auth.user}
                header={"Lottery"}
                userName={userName}
            >
                <BreadCrumb title="Lottery" path="Lottery" />
                <LotteryHeader />
                <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-10 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-10 gap-4 mb-4 px-2">
                    <LotteryCodeList />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
