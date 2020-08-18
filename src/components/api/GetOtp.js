import {service} from "../util/request";

export function getOtp(data) {
    return service({
        url: `CustomerResendOtp`,
        method: 'post',
        data
    })
}