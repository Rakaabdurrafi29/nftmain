import axios from "axios";

export default function useRoi() {
    const ret = {
        roiErrors: "",
        myRoi: [],
    };

    const getMyLatestRoi = async () => {
        const response = await axios.get(route("roi.schedule"));
        return response.data;
    };

    return {
        ret,
        getMyLatestRoi,
    };
}
