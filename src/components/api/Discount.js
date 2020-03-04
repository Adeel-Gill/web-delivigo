import {service} from "../util/request";

export function fetchDiscountedRestaurants(num,size) {
    return service({
        url: `AllRestaurantDiscount?pageNumber=${num}&pageSize=${size}`,
        method: 'get',
    })
}
