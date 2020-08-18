import service from "../util/request";

export function fetchUserProfile(id) {
    return service({
        url: 'Customer/'+id,
        method: 'get'
    })
}
export function checkCredentials(data) {
    return service({
        url: 'CustomerLogin',
        method: 'post',
        data
    })
}
export function registerUser(data) {
    console.log(data);
    return service({
        url: 'CustomerSignup',
        method: 'post',
        data
    })
}
export function updateProfileImage(data) {
    console.log(data);
    return service({
        url: 'CustomerUpdateProfileImage',
        method: 'post',
        data
    })
}
export function updateProfile(data) {
    console.log(data);
    return service({
        url: 'UpdateCustomer',
        method: 'post',
        data
    })
}