import axios from "axios";

export default function useWallet() {
    const ret = {
        walletErrors: "",
        myWallet: [],
    };

    const groupBy = (data, key) => {
        return data.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const getMyWalletList = async (page = 1) => {
        const response = await axios.get(route("wallet.list", { page: page }));
        return response.data;
    };

    const getMyWalletBalance = async (id) => {
        const myWalletBalance = await axios.get(
            route("wallet.balance", { id: id })
        );
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }).format(myWalletBalance.data);
    };

    const getMyBonus = async (id) => {
        const myBonus = await axios.get(route("bonus.balance", { id: id }));
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }).format(myBonus.data);
    };

    const getMyReferralBonus = async (id) => {
        const myBonus = await axios.get(
            route("bonus.referral.balance", { id: id })
        );
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }).format(myBonus.data);
    };

    const getMyRoyaltyBonus = async (id) => {
        const myBonus = await axios.get(
            route("bonus.royalty.balance", { id: id })
        );
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }).format(myBonus.data);
    };

    const getMyBonusList = async (page = 1) => {
        const response = await axios.get(route("bonus.list", { page: page }));
        return response.data;
    };

    const getMyRoi = async (id) => {
        const myRoi = await axios.get(route("my-roi", { id: id }));
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }).format(myRoi.data);
    };

    const getMyRoiList = async (page = 1) => {
        const response = await axios.get(route("roi.list", { page: page }));
        return response.data;
    };

    const withdrawal = async (signature, address, message, wdValue) => {
        await axios
            .post("withdrawal", { signature, address, message, wdValue })
            .catch(function (error) {
                if (error.response) {
                    ret.walletErrors =
                        "Error " +
                        error.response.status +
                        ".\n" +
                        error.response.data.message;
                } else if (error.request) {
                    ret.walletErrors = error.request;
                } else {
                    ret.walletErrors = "Error!\n" + error.message;
                }
            })
            .then((response) => {
                if (response) {
                    if (response.data.status === "success") {
                        ret.myWallet.data = response.data.message;
                    } else {
                        ret.walletErrors = response.data.message;
                    }
                }
            });

        return ret;
    };

    return {
        ret,
        getMyWalletList,
        getMyWalletBalance,
        getMyBonus,
        getMyRoi,
        getMyReferralBonus,
        getMyRoyaltyBonus,
        getMyBonusList,
        getMyRoiList,
        withdrawal,
    };
}
