import {service} from "../util/request";

export function saveAddress(data) {
    return service({
        url: 'AddressInfo',
        method: 'post',
        data
    })
}

export function setDefaultAddress(cusID, addID) {
    return service ({
        url: 'MarkAsDefaultCustomerAddress?customerId=' + cusID + '&addressId=' + addID,
        method: 'get'
    })
}

export function getAllCustomerAddresses(cusID) {
    return service ({
        url: 'AllAddressesCustomer?customerId=' + cusID,
        method: 'get'
    })
}
export function deleteAddress(addressID) {
    return service ({
        url: 'DeleteCustomerAddress?addressId=' + addressID,
        method: 'get'
    })
}
