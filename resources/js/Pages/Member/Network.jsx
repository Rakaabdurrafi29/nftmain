import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrumb from "@/Components/Member/BreadCrumb";
import NetworkHeader from "@/Components/Member/Network/NetworkHeader";
import NetworkList from "@/Components/Member/Network/NetworkList";
import { useState } from "react";

export default function Network({ auth }) {
    const [userName, setUsername] = useState(auth.user.username);

    return (
        <>
            <AuthenticatedLayout
                userData={auth.user}
                header={"Network"}
                userName={userName}
            >
                <BreadCrumb title="Network" path="Network" />
                <NetworkHeader />
                <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-10 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-10 gap-4 mb-4 px-2">
                    <NetworkList auth={auth} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
