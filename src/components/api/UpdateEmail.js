import {service} from "../util/request";

export function updateEmail(id,email) {
    return service({
        url: `CustomerEmailUpdate?CustomerId=${id}&Email=${email}`,
        method: 'get',
    })
}