import service from "../util/request";

export function changePassword(data) {
    return service({
        url: 'ChangePassword',
        method: 'post',
        data
    })
}
