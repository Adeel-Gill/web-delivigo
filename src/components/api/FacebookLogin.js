import service from "../util/request";

export function facebookAPILogin(data) {
    return service({
        url: 'CustomerFacebookLogin',
        method: 'post',
        data
    })
}
