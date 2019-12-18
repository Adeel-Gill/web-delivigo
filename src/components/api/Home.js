import {service} from "../util/request";

export function fetchAllData() {
    return service({
        url: 'Home',
        method: 'get'
    })
}
