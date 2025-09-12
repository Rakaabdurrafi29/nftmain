import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import "react-loading-skeleton/dist/skeleton.css";
import RoiList from "@/Components/Member/Roi/RoiList";
import RoiHeader from "@/Components/Member/Roi/RoiHeader";
import { useState } from "react";

export default function Roi({ auth }) {
    const [userName, setUsername] = useState(auth.user.username);

    return (
        <>
            <AuthenticatedLayout
                userData={auth.user}
                header={"R.O.I"}
                userName={userName}
            >
                <BreadCrumb title="R.O.I" path="R.O.I" />
                <RoiHeader />
                <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-10 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-10 gap-4 mb-4 px-2">
                    <RoiList />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
