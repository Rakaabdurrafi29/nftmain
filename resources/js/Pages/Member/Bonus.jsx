import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import "react-loading-skeleton/dist/skeleton.css";
import BonusHeader from "@/Components/Member/Bonus/BonusHeader";
import BonusList from "@/Components/Member/Bonus/BonusList";
import { useState } from "react";

export default function Bonus({ auth }) {
    const [userName, setUsername] = useState(auth.user.username);

    return (
        <>
            <AuthenticatedLayout
                userData={auth.user}
                header={"Bonus"}
                userName={userName}
            >
                <BreadCrumb title="Bonus" path="Bonus" />
                <BonusHeader />
                <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-10 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-10 gap-4 mb-4 px-2">
                    <BonusList />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
