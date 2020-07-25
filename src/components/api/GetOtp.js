import {service} from "../util/request";

export function getOtp(data) {
    return service({
        url: `CustomerOtp`,
        method: 'post',
        data
    })
}