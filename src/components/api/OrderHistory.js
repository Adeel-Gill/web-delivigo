import {service} from "../util/request";


export function getOrderHistory(id) {
    return service({
        url: `CustomerOrderHistory?customerId=${id}`,
        method: 'get'
    })
}
