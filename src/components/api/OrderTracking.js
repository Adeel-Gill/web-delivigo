import {service} from "../util/request";

export function getOrderTracking(cusId, orderId) {
    return service({
        url: `OrderTrackById?customerId=${cusId}&orderId=${orderId}`,
        method: 'get'
    })
}
