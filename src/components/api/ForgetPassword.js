import {service} from "../util/request";

export function forgetPassword(data) {
    return service({
        url: `CustomerForgetPassword`,
        method: 'post',
        data
    })
}