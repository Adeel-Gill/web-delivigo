import service from "../util/request";

export function fetchRestaurantReviews(id) {
    return service({
        url: 'AllRestaurantReviews?restaurantId='+id,
        method: 'get'
    })
}
