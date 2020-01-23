import {service} from "../util/request";

export function calculateDistance (lon1, lat1, lon2, lat2,unit) {
    return service({
        url: `CalculateDistance?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}&unit=${unit}`,
        method: 'get'
    })
}
