import {service} from "../util/request";

export function saveCardData(data) {
    console.log('inFunctionCardData',data);
    return service({
        url: 'CustomerCard',
        method: 'post',
        data
    })
}
export function markDefaultCard(data) {
    return service({
        url: 'MarkDefaultCard',
        method: 'post',
        data
    })
}
export function retrieveCustomerAllCards(id) {
    return service({
        url: 'AllCustomerCard?customerId='+id,
        method: 'get'
    })
}
export function deleteCustomerCard(id) {
    return service({
        url: 'DeleteCustomerCard?customerCardId='+id,
        method: 'get'
    })
}

// import {EventBus} from "../../main";
// import ProxyAgent from 'http-proxy-agent';
// const stripe =  Stripe('sk_test_...', {
//     apiVersion: '2019-08-08',
//     maxNetworkRetries: 1,
//     httpAgent: new ProxyAgent(process.env.http_proxy),
//     timeout: 1000,
//     host: 'api.stripe.com',
//     port: 8080,
//     telemetry: true,
// });
// import stripe from 'stripe'
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-type':'text/html'});
//     res.end('<h1>Hello NodeJS</h1>');
// }).listen(8080, '192.168.18.65');

// server.listen(8080,() => console.log('Server running on port 10.133.16.227:8080'));
// const stripe = require("stripe")("sk_******************");
// export function createCardToken(cardObj) {
//     EventBus.$emit('StartOverlay', true);
//      stripe.createToken({
//          card: {
//              "number": '4242424242424242',
//              "exp_month": 12,
//              "exp_year": 2020,
//              "cvc": '123'
//          },
//         customer: 'cus_GT1hihViyDG0M2'})
//          .then(token => {
//             if(token) {
//                 EventBus.$emit('StartOverlay', false);
//                 console.log('cardREsponse',token)
//                 return token;
//             } else {
//                 EventBus.$emit('StartOverlay', false);
//             }
//      })
//     // }).then(response => {
//     //     EventBus.$emit('StartOverlay', false);
//     //     console.log('cardREsponse',response)
//     //     if(response) {
//     //         return response;
//     //     } else {
//     //         console.log(response);
//     //     }
//     // },error=>{
//     //     console.log('error',error)
//     // }).catch(err => {
//     //     EventBus.$emit('StartOverlay', false);
//     //     console.log('error',err)
//     // })
// }
//
// export function retrieveCard(cusID,cardID) {
//     EventBus.$emit('StartOverlay', true);
//     stripe.customers.retrieveSource({
//         cusID,
//         cardID,
//     }).then(response => {
//         EventBus.$emit('StartOverlay', false);
//         if(response) {
//             return response;
//         } else {
//             console.log(response);
//         }
//     }).catch(err => {
//         EventBus.$emit('StartOverlay', false);
//         console.log('error',err);
//     })
// }
