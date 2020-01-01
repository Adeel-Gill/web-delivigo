import service from "../util/request";

export function fetchUserProfile() {
    return service({
        url: 'Profile?customerId=1',
        method: 'get'
    })
}
export function checkCredentials(data) {
    return service({
        url: 'Login',
        method: 'post',
        data
    })
}
export function registerUser(data) {
    console.log(data);
    return service({
        url: 'Customer',
        method: 'post',
        data
    })
}
