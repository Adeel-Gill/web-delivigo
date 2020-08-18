import {service} from "../util/request";

export function postCartItem(data) {
    console.log('Cart',data);
    return service({
        url: 'Cart',
        method: 'post',
        data
    })
}

export function getCart(customerId) {
    // console.log('Cart',data);
    return service({
        url: `Cart?customerId=${customerId}`,
        method: 'get'
    })
}

export function deleteCartItem(customerId,cartId, cartItemId) {
    // console.log('Cart',data);
    return service({
        url: `DeleteCartItem?customerId=${customerId}&cartId=${cartId}&cartItemId=${cartItemId}`,
        method: 'get'
    })
}

export function emptyCart(cartId) {
    // console.log('Cart',data);
    return service({
        url: `EmptyCart?cartId=${cartId}`,
        method: 'get'
    })
}