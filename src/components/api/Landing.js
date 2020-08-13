
import {service} from "../util/request";

export function fetchResturantsData() {
    return service({
        url: 'Landing',
        method: 'get',

    })
}

export function fetchCitiesData() {
    return service({
        url: 'CityById?countryId=4',
        method: 'get',

    })
}
