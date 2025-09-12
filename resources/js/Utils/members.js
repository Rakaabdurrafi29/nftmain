import axios from "axios";

export default function useMembers() {
    const ret = {
        memberErrors: "",
        data: [],
    };

    const getNewMembers = async () => {
        const newMember = await axios.get(route("member.new"));
        return newMember.data;
    };

    const getMyNetwork = async (page = 1) => {
        const response = await axios.get(
            route("member.network", { page: page })
        );
        ret.data = response.data;
        ret.data.data = groupBy(response.data.data, "depth");

        return ret;
    };

    const groupBy = (data, key) => {
        return data.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const getMinMaxLevel = (data) => {
        if (data.length === 0) return 0;
        const min = data.reduce((a, b) =>
            Number(a.depth) < Number(b.depth) ? a : b
        ).depth;
        const max = data.reduce((a, b) =>
            Number(a.depth) > Number(b.depth) ? a : b
        ).depth;
        return { min, max };
    };

    const getMyNetworkCount = async (id) => {
        const myNetworkCount = await axios.get(
            route("member.network.count", { id: id })
        );
        return new Intl.NumberFormat().format(myNetworkCount.data);
    };

    const getMyNetworkTurnover = async (id) => {
        const myNetworkTurnover = await axios.get(
            route("member.group.turnover", { id: id })
        );
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(myNetworkTurnover.data);
    };

    const getMyTurnover = async (id) => {
        const myTurnover = await axios.get(
            route("member.turnover", { id: id })
        );
        return new Intl.NumberFormat("EN-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(myTurnover.data);
    };

    const getMyReferral = async (id) => {
        const response = await axios.get(route("member.referral", { id: id }));
        ret.data = response.data;

        return ret;
    };

    const getMyReferrer = async (id) => {
        const response = await axios.get(route("member.referrer", { id: id }));
        ret.data = response.data;

        return ret;
    };

    const getMyDescendants = async (id) => {
        const response = await axios.get(
            route("member.descendants", { id: id })
        );
        ret.data = response.data;

        return ret;
    };

    return {
        ret,
        getNewMembers,
        getMyNetwork,
        getMinMaxLevel,
        getMyNetworkCount,
        getMyNetworkTurnover,
        getMyTurnover,
        getMyReferral,
        getMyDescendants,
        getMyReferrer,
    };
}
