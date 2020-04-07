import {service} from "../util/request";

export function checkIfStripeExist(id) {
    return service({
        url: `IsStripeExist/${id}`,
        method: 'get',
    })
}