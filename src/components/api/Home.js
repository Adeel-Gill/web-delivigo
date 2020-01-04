import {service} from "../util/request";

export function fetchAllData() {
    return service({
        url: 'Home',
        method: 'get',
    })
}
export function fetchNewIOpenRestaurantsData(pageNumber=1,pageSize=10) {
    return service({
        url: `NewOpenRestaurant?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'get',
    })
}
