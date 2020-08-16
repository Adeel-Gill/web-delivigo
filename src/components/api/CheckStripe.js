import {service} from "../util/request";

export function checkIfStripeExist(id) {
    return service({
        url: `IsStripe?CustomerId=${id}`,
        method: 'get',
    })
}

export function verifyStripe(id) {
    return service({
        url: `StripeAccount/${id}`,
        method: 'get',
    })
}