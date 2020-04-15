import service from "../util/request";

export function fetchUserProfile(id) {
    return service({
        url: 'Profile?customerId='+id,
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
export function updateProfileImage(data) {
    console.log(data);
    return service({
        url: 'CustomerImage/MediaUpload',
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