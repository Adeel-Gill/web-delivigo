import service from "../util/request";

export function fetchRestaurantReviews(id) {
    return service({
        url: 'AllCustomerReviewsByRestaurantId?restaurantId='+id,
        method: 'get'
    })
}
export function submitReview(data) {
    return service({
        url: 'CustomerReview',
        method: 'post',
        data
    })
}
export function updateReview(data) {
    return service({
        url: 'UpdateReview',
        method: 'post',
        data
    })
}
