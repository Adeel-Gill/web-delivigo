import {service} from "../util/request";

export function fetchMealById(id) {
    return service({
        url: 'CustomMeal?mealId='+ id,
        method: 'get',
    })
}
