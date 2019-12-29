import service from "../util/request";

export function fetchUserProfile() {
    return service({
        url: 'Profile?customerId=1',
        method: 'get'
    })
}
