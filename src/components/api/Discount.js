import {service} from "../util/request";

export function fetchDiscountedRestaurants(num,size) {
    return service({
        // url: `AllRestaurant?cityId=10&pageNumber=${num}&pageSize=${size}`,
       url: `AllowedDiscountRestaurants`, 
       method: 'get',
    })
}
