import axios from "axios";

export async function getActiveAddress() {
    const ret = {
        status: "",
        message: "",
        address: "",
        price: 0,
    };

    await axios
        .get(route("smart_contract.get_active_address"))
        .catch(function (error) {
            if (error.response) {
                ret.message =
                    "Error " +
                    error.response.status +
                    ".\n" +
                    error.response.data.message;
            } else if (error.request) {
                ret.message = error.request;
            } else {
                ret.message = "Error!\n" + error.message;
            }
            ret.status = "failed";
            ret.address = null;
            ret.price = 0;
        })
        .then((response) => {
            ret.status = "success";
            ret.message = "address acquired successfully";
            ret.address = response.data.address;
            ret.price = response.data.mint_price;
        });

    return ret;
}
