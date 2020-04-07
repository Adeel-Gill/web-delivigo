import service from "../util/request";

export function facebookAPILogin(data) {
    return service({
        url: 'FacebookLogin',
        method: 'post',
        data
    })
}
