import LotteryPot from "./Partials/LotteryPot";
import LotteryPotPrevious from "./Partials/LotteryPotPrevious";
import LotteryWinners from "./Partials/LotteryWinners";

export default function LotteryHeader() {
    return (
        <>
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                <LotteryPot />
                <LotteryPotPrevious />
            </div>
            <div className="col-span-12 grid grid-cols-1 gap-4 px-2 mt-4">
                <LotteryWinners />
            </div>
        </>
    );
}
