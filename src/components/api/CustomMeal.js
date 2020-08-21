import {service} from "../util/request";

export function fetchMealById(id) {
    return service({
        url: 'CustomMeal?mealId='+ id,
        method: 'get',
    })
}

export function fetchRestaurantMealsById(resID, mealMenuID) {
    return service({
        url: 'RestaurantMeal?restaurantId='+ resID+ '&mealMainId='+ mealMenuID,
        method: 'get'
    })
}
