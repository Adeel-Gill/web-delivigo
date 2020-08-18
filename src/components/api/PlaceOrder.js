import {service} from "../util/request";

export function placeOrder(data) {
    return service({
        url: 'PlaceOrder',
        method: 'post',
        data
    })
}
export function reOrder(orderId,customerId) {
    return service({
        url: `ReOrder?orderId=${orderId}&customerId=${customerId}`,
        method: 'get'
    })
}
