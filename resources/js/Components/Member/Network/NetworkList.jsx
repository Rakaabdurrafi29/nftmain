import { useState, useEffect, Fragment } from "react";
import useMembers from "@/Utils/members";
import MemberCard from "@/Components/Member/Network/Partials/MemberCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";

export default function NetworkList({ auth }) {
    const { getMyNetwork } = useMembers();
    const [myNetworkObject, setMyNetworkObject] = useState(null);
    const [myNetwork, setMyNetwork] = useState([]);

    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };

    const fetchData = async (offset) => {
        const data = await getMyNetwork(offset);

        setMyNetworkObject(data?.data);
        setMyNetwork(Object.entries(data?.data.data));
        setPageCount(data.data.last_page);
    };

    useEffect(() => {
        fetchData(offset);
    }, [offset]);

    return (
        <>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pagination"}
                activeClassName={"active"}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
            />

            {(myNetwork &&
                myNetwork?.map((item, index) => (
                    <Fragment key={index}>
                        <div className="col-span-full mt-2 mb-0 border-b border-dashed border-gray-200 dark:border-gray-700 flex flex-wrap justify-between">
                            <h1 className="inline-block py-2 px-2 text-sm font-semibold text-center rounded-t-lg border-b-2 text-slate-400 hover:text-slate-300 border-slate-500">
                                Level{" "}
                                <span className="text-slate-200">
                                    #{item[0]}
                                </span>
                            </h1>
                        </div>

                        {item[1]?.map((member, i) => (
                            <MemberCard
                                auth={auth}
                                key={member.username}
                                username={member.username}
                                rank={member.rank_str}
                                rank_id={member.rank_id}
                                avatar={member.avatar}
                                is_leader={member.is_leader}
                            />
                        ))}
                    </Fragment>
                ))) || (
                <Fragment key="1">
                    <div className="col-span-full mt-2 mb-0 border-b border-dashed border-gray-200 dark:border-gray-700 flex flex-wrap justify-between">
                        <h1 className="inline-block py-2 px-2 text-sm font-semibold text-center rounded-t-lg border-b-2 text-slate-400 hover:text-slate-300 border-slate-500">
                            <Skeleton
                                baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                                highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                                width={"90px"}
                                height={"20px"}
                                border-borderRadius={"2%"}
                            />
                        </h1>
                    </div>
                    <Skeleton
                        baseColor="rgb(40 56 84 / var(--tw-bg-opacity))"
                        highlightColor="rgb(53 71 101 / var(--tw-bg-opacity))"
                        width={"260px"}
                        height={"80px"}
                        border-borderRadius={"2%"}
                    />
                </Fragment>
            )}
        </>
    );
}
