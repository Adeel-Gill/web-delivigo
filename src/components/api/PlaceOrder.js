import {service} from "../util/request";

export function placeOrder(data) {
    return service({
        url: 'PlaceOrder',
        method: 'post',
        data
    })
}
export function reOrder(id) {
    return service({
        url: `ReOrder?orderId=${id}`,
        method: 'get'
    })
}
