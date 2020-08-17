import service from "../util/request";

export function changePassword(data) {
    return service({
        url: 'CustomerChangePassword',
        method: 'post',
        data
    })
}
