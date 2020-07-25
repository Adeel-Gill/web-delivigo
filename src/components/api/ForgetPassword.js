import {service} from "../util/request";

export function forgetPassword(data) {
    return service({
        url: `ForgetPassword`,
        method: 'post',
        data
    })
}