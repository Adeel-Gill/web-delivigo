
import {service} from "../util/request";

export function fetchRestaurantsByCategory(name) {
    return service({
        url: 'RestaurantByCategoryName?categoryName='+ name,
        method: 'get',
    })
}

export function fetchRestaurantById(Id) {
    return service({
        url: 'Restaurant/'+ Id,
        method: 'get',
    })
}
