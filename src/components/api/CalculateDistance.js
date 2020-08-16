import {service} from "../util/request";

export function calculateDistance (lon1, lat1, lon2, lat2) {
    return service({
        url: `CalculateDistince?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`,
        method: 'get'
    })
}
