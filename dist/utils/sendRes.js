"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRes = (resData) => {
    const { res, message, data } = resData;
    let isData;
    const isArray = Array.isArray(data);
    if (isArray) {
        isData = data.length > 0 ? true : false;
    }
    else {
        isData = Object.keys(data).length > 0 ? true : false;
    }
    const statusCode = isData ? 200 : 404;
    // console.log('from response', isData, "data", data);
    return res.status(statusCode).json(Object.assign(Object.assign({ success: isData ? true : false, statusCode, message: isData ? message : "No data found" }, (resData.token && { toekn: resData.token })), (resData.data && { data: resData.data })));
};
exports.default = sendRes;
