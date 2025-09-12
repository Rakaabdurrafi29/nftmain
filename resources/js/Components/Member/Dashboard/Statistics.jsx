import Turnover from "./Partials/Turnover";
import Bonus from "./Partials/Bonus";
import Network from "./Partials/Network";
import Wallet from "./Partials/Wallet";
import MyTurnover from "./Partials/MyTurnover";
import Roi from "./Partials/Roi";

export default function Statistics() {
    return (
        <div className="sm:col-span-6 md:col-span-8 lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-4">
            <Turnover />
            <MyTurnover />
            <Bonus />
            <Roi />
            <Wallet />
            <Network />
        </div>
    );
}
