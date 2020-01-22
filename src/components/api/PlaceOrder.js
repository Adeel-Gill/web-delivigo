import {service} from "../util/request";

export function placeOrder(data) {
    return service({
        url: 'PlaceOrder',
        method: 'post',
        data
    })
}
