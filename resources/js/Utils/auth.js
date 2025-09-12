import axios from "axios";

export async function doLogin(signature, address, message) {
    const ret = {
        authErrors: "",
    };

    await axios
        .post("/web3-login-verify", {
            signature,
            address,
            // message,
        })
        .catch(function (error) {
            if (error.response) {
                ret.authErrors =
                    "Error " +
                    error.response.status +
                    ".\n" +
                    error.response.data.message;
            } else if (error.request) {
                ret.authErrors = error.request;
            } else {
                ret.authErrors = "Error!\n" + error.message;
            }
        })
        .then((response) => {
            if (response) {
                if (response.data.status === "success") {
                    window.location.href = response.data.url;
                } else {
                    ret.authErrors = response.data.message;
                }
            }
        });

    return ret;
}

export async function doRegister(sponsor, address, signature, message) {
    const ret = {
        authErrors: "",
    };

    await axios
        .post(
            route("register", {
                sponsor,
                address,
                signature,
                message,
            })
        )
        .catch(function (error) {
            if (error.response) {
                ret.authErrors =
                    "Error " +
                    error.response.status +
                    ".\n" +
                    error.response.data.message;
            } else if (error.request) {
                ret.authErrors = error.request;
            } else {
                ret.authErrors = "Error!\n" + error.message;
            }
        })
        .then((response) => {
            if (response) {
                if (response.data.status === "success") {
                    window.location.href = response.data.url;
                } else {
                    ret.authErrors = response.data.message;
                }
            }
        });

    return ret;
}

export async function getMessage(type) {
    const message = await axios.get("/web3-login-message/" + type);
    return message;
}

export async function checkUserName(username) {
    const response = await axios.get("/check-username/" + username);
    return !Object.keys(response.data).length;
}

export async function updateUserName(signature, address, message, newUsername) {
    const ret = {
        updateError: "",
    };

    await axios
        .post(
            route("update.username", {
                signature,
                address,
                message,
                newUsername,
            })
        )
        .catch(function (error) {
            if (error.response) {
                ret.updateError =
                    "Error " +
                    error.response.status +
                    ".\n" +
                    error.response.data.message;
            } else if (error.request) {
                ret.updateError = error.request;
            } else {
                ret.updateError = "Error!\n" + error.message;
            }
        })
        .then((response) => {
            if (response) {
                if (response.data.status === "success") {
                    ret.data = response.data.message;
                } else {
                    ret.updateError = response.data.message;
                }
            }
        });

    return ret;
}

export async function updateUserAfterMinting() {
    const ret = {
        status: "",
        message: "",
    };

    await axios
        .post(route("activateUser"))
        .catch(function (error) {
            ret.status = "failed";
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
        })
        .then((response) => {
            if (response) {
                ret.status = response.data.status;
                ret.message = response.data.message;
            }
        });

    return ret;
}

export async function resetUserHash() {
    const ret = {
        status: "",
        message: "",
    };

    await axios
        .post(route("reset.hash"))
        .catch(function (error) {
            ret.status = "failed";
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
        })
        .then((response) => {
            if (response) {
                ret.status = response.data.status;
                ret.message = response.data.message;
            }
        });

    return ret;
}

export async function recordTxHash(hash) {
    const ret = {
        status: "",
        message: "",
    };

    await axios
        .post(
            route("afterMinting", {
                hash,
            })
        )
        .catch(function (error) {
            ret.status = "failed";
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
        })
        .then((response) => {
            if (response) {
                ret.status = response.data.status;
                ret.message = response.data.message;
            }
        });

    return ret;
}
