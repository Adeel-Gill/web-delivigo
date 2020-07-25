import {service} from "../util/request";

export function confirmOtp(data) {
    return service({
        url: `CustomerOtpConfirm`,
        method: 'post',
        data
    })
}