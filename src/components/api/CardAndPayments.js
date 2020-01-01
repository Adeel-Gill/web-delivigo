import Stripe from 'stripe-client';
import {EventBus} from "../../main";

const stripe = Stripe('sk_test_d1RRXVQTQ2bxUPoXsJlKe4na');

export function createCardToken(cardObj) {
    EventBus.$emit('StartOverlay', true);
    stripe.createToken({

        card: {
            "number": '4242424242424242',
            "exp_month": 12,
            "exp_year": 2020,
            "cvc": '123'
        },
        customer: 'cus_GT1hihViyDG0M2'
    }).then(response => {
        EventBus.$emit('StartOverlay', false);
        console.log('cardREsponse',response)
        if(response) {
            return response;
        } else {
            console.log(response);
        }
    },error=>{
        console.log('error',error)
    }).catch(err => {
        EventBus.$emit('StartOverlay', false);
        console.log('error',err)
    })
}

export function retrieveCard(cusID,cardID) {
    EventBus.$emit('StartOverlay', true);
    stripe.customers.retrieveSource({
        cusID,
        cardID,
    }).then(response => {
        EventBus.$emit('StartOverlay', false);
        if(response) {
            return response;
        } else {
            console.log(response);
        }
    }).catch(err => {
        EventBus.$emit('StartOverlay', false);
        console.log('error',err);
    })
}
