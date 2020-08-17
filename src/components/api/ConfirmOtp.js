import {service} from "../util/request";

export function confirmOtp(data) {
    return service({
        url: `CustomerConfirmOtp`,
        method: 'post',
        data
    })
}

export function resendOtp(data) {
    return service({
        url: `CustomerResendOtp`,
        method: 'post',
        data
    })
}