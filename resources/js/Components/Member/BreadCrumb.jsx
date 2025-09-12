export default function BreadCrumb(props) {
    return (
        <div className="container  mx-auto px-2 mt-16">
            <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                    <div className="w-full">
                        <div className="">
                            <div className="flex flex-wrap justify-between">
                                <div className="items-center ">
                                    <h1 className="font-semibold text-xl mb-0 block text-slate-100">
                                        {props.title}
                                    </h1>
                                    {/* <ol className="list-reset flex text-sm">
                                        <li>
                                            <a
                                                href="#"
                                                className="text-gray-500"
                                            >
                                                NFTLottery
                                            </a>
                                        </li>
                                        <li>
                                            <span className="text-gray-500 mx-2">
                                                /
                                            </span>
                                        </li>
                                        <li className="text-amber-600 hover:text-amber-700">
                                            {props.path}
                                        </li>
                                    </ol> */}
                                </div>
                                <div className="flex items-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
