import {service} from "../util/request";

export function fetchAllFilterData(city,long,lat,min,max,sort,food) {
    console.log('inside,,,,,',city);
    return service({
        url: `HomeFilter`,
        // url: `Home?cityName=${city}&longitude=${long}&latitude=${lat}&min=${min}&max=${max}&sort=${sort}&food=${food}`,
        method: 'get',
    })
}
export function fetchAllData() {
    return service({
        url: `Home`,
        method: 'get',
    })
}
export function fetchNewIOpenRestaurantsData(pageNumber=1,pageSize=10) {
    return service({
        url: `NewOpenRestaurant?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'get',
    })
}
