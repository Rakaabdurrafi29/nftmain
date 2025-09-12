import { useState, useEffect, Fragment } from "react";
import useLottery from "@/Utils/lottery";
import ReactPaginate from "react-paginate";
// import dayjs from "dayjs";

export default function LotteryCodeList({ auth }) {
    const { getMyLotteryCodeList } = useLottery();
    const [myLotteryCodeObject, setMyLotteryCodeObject] = useState(null);
    const [myLotteryCode, setMyLotteryCode] = useState([]);

    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };

    const fetchData = async (offset) => {
        const data = await getMyLotteryCodeList(offset);

        setMyLotteryCodeObject(data);
        setMyLotteryCode(data.data);
        setPageCount(data.last_page);
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
            <div className="col-span-full mt-2 mb-0 border-b border-dashed border-gray-700 flex flex-wrap justify-between">
                <div className="flex w-full h-full overflow-x-auto">
                    <table className="border-collapse table-fixed w-full text-lg">
                        <thead>
                            <tr>
                                <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left w-48">
                                    Date
                                </th>
                                <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left w-36">
                                    <span>Code</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {myLotteryCode &&
                                myLotteryCode?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-slate-800 p-4 pl-8 text-slate-400 text-sm">
                                            {Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                timeZoneName: "shortOffset",
                                            }).format(
                                                Date.parse(item.created_at)
                                            )}
                                        </td>
                                        <td className="border-b border-slate-800 p-4 pl-8 text-emerald-400 text-sm">
                                            <code className="font-bold">
                                                {item.code}
                                            </code>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
