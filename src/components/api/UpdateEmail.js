import {service} from "../util/request";

export function updateEmail(id,email) {
    return service({
        url: `UpdateEmail/${id}?email=${email}`,
        method: 'get',
    })
}