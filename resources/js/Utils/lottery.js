import axios from "axios";

export default function useLottery() {
    const ret = {
        lotteryErrors: "",
    };

    const getLotteryPot = async () => {
        const response = await axios.get(route("lottery.pot"));
        return new Intl.NumberFormat("en-US").format(response.data);
    };

    const getLotteryPotSchedule = async () => {
        const response = await axios.get(route("lottery.pot.schedule"));
        return response.data;
    };

    const getLotteryPotPrevious = async () => {
        const response = await axios.get(route("lottery.pot.previous"));
        return new Intl.NumberFormat("en-US").format(response.data);
    };

    const getMyLotteryCodeList = async () => {
        const response = await axios.get(route("lottery.code"));
        return response.data;
    };

    return {
        ret,
        getLotteryPot,
        getLotteryPotSchedule,
        getLotteryPotPrevious,
        getMyLotteryCodeList,
    };
}
