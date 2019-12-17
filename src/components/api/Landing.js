
import {service} from "../util/request";

export function fetchResturantsData() {
    return service({
        url: 'Landing',
        method: 'get'
    })
}
