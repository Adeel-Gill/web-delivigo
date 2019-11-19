<template>
    <div class="restaurnt-dishes">
        <div class="show-dish-details" id="display-dish">
            <div class="dish-detail-image">
                <img src="/images/clicked-image1.png" alt="">
            </div>
            <div class="dish-detail-about">
                <div class="dish-name-descp">
                    <h4>Hyashi wakame</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div class="extra-order">
                    <h6>GLI EXTRA - FACOLTATING</h6>
                    <div class="extra-checkbox">
                        <div>
                            <span class="float-left">Bacchette</span>
                            <span class="float-right"><input type="checkbox" name="extra" value="Bacchette" v-model="selected"></span>
                        <div class="clear"></div>
                        </div>
                        <div>
                            <span class="float-left">Salsa di sola</span>
                            <span class="float-right">
                                <input type="checkbox" name="extra" value="Salsa di sola" checked="checked" v-model="selected">
                            </span>
                        <div class="clear"></div>
                        </div>
                    </div>
                    <h6>GLI EXTRA - FACOLTATING</h6>
                    <div class="extra-checkbox">
                        <div>
                            <span class="float-left">Coca Cola 33d</span>
                            <span class="float-right">(+ €3.00)</span>
                        <div class="clear"></div>
                        </div>
                        <div>
                            <span class="float-left">Coca Cola Zero 33cl</span>
                            <span class="float-right">(+ €3.00)</span>
                        <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div class="quantity-toggle">
                    <button @click="decrement()">&mdash;</button>
                    <input type="text" :value="quantity" readonly>
                    <button @click="increment()">&#xff0b;</button>
                </div>
                <div class="add-item-btn">
                    <a href="#">Add item -  € 4.00</a>
                </div>
            </div>
        </div>
        <div class="dishes" v-for="select in selects" :select="select" :key="select.id">

            <div class="dish-selection" @click="displayDish()">
                <div class="dish-image">
                    <img :src="select.dishImage" alt="">
                </div>
                <div class="about-dish">
                    <div class="descp-about" :class="select.class">
                        <p>{{select.description}}</p>
                        <div class="price-dish">
                            <p>{{select.price}}</p>
                        </div>
                        <div class="buy-btn">
                            <a href="#" v-if="select.btn">{{select.btn}}</a>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Selects from './select.js';
export default {
    props:['select'],
    data(){
        return{
            selects: Selects,
            quantity: 1,
            selected: [], // Must be an array reference!
        }
    },
    methods: {
        increment () {
            this.quantity++
        },
        decrement () {
            if(this.quantity === 1) {
                alert('Negative quantity not allowed')
            } else {
            this.quantity--
            }
        },
        displayDish(){
            document.getElementById("display-dish").style.display = "block"
        }
    }
}
</script>
<style scoped>
#display-dish{
    display: none;
}
.show-dish-details {
    box-shadow: 0px 0px 7px 7px rgba(0, 0, 0, 0.1);
    margin-bottom: 80px;
    padding: 30px;
}
.dish-detail-image{
    width: 100%;
    margin-bottom: 30px;
}
.dish-detail-image img{
    width: 100%;
}
.extra-checkbox {
    margin: 35px 0;
}
.extra-order h6 {
    font-family: "Roboto";
    font-size: 22px;
    font-weight: normal;
    position: relative;
    padding-bottom: 16px;
    margin: 0;
}
.extra-order h6::after {
    content: '';
    width: 532px;
    height: 2px;
    background: #e3e3e3;
    position: absolute;
    left: -20px;
    bottom: 0;
    right: 0;
}
.extra-checkbox span {
    margin: 10px 0 0px 0;
    font-family: "Roboto";
    font-size: 20px;
}
.dish-name-descp h4 {
    font-family: "Roboto";
    font-weight: normal;
    font-size: 30px;
}

.dish-name-descp p {
    color: #787878;
    font-family: "Roboto";
    font-weight: normal;
    font-size: 15px;
    margin-bottom: 22px;
}
.quantity-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 45px;
}
.quantity-toggle button {
    border: 4px solid #8ba939;
    border-radius: 50%;
    padding: 0;
    margin: 0;
    width: 36px;
    height: 36px;
    font-weight: 900;
    color: #8ba939;
    font-size: 19px;
    font-family: "Roboto";
}
.quantity-toggle input {
    width: 95px;
    text-align: center;
    font-family: "Roboto";
    font-weight: 600;
    font-size: 23px;
}
.add-item-btn{
    text-align: center;
}
.add-item-btn a {
    background: #8ba939;
    display: inline-block;
    padding: 20px 68px;
    border-radius: 60px;
    color: white;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 22px;
    text-decoration: none;
}
.bg-gray{
    background: #d6d6d6;
}
.bg-pink{
    background: #ecd8d0;
}
.bg-green{
    background: #c2dddf;
}
.bg-yellow{
    background: #ffe8c7;
}
.dishes {
    margin: 0px 0 50px;
}
.dish-selection {
    position: relative;
}
.dish-image {
    max-width: 200px;
    float: left;
    margin: 8px 0;
    position: absolute;
    left: 0;
}
.dish-image img {
    width: 100%;
    border-radius: 10px;
    height: 133px;
}
.about-dish {
    float: right;
    z-index: -2;
}
.descp-about{
    min-width: 380px;
    min-height: 149px;
    border-radius: 10px;
}
.descp-about p {
    color: #787878;
    font-family: "Roboto";
    font-size: 19px;
    margin: 0 auto;
    line-height: 20px;
    text-align: left;
    max-width: 250px;
    padding: 30px 0 0 0;
}
.price-dish {
    float: left;
    margin: 0 65px;
}
.price-dish p {
    padding: 20px 0 !important;
    color: #4c37eb !important;
    font-weight: 500;
    font-size: 17px !important;
}
.buy-btn {
    float: right;
    padding: 15px 0;
    margin: 0 47px;
}
.buy-btn a {
    display: inline-block;
    border: 2px solid #4c37eb;
    color: #4c37eb;
    font-family: "Roboto";
    font-weight: 600;
    font-size: 17px;
    padding: 0px 20px;
    border-radius: 30px;
}
.buy-btn a:hover{
    background: #4c37eb;
    color: white;
    text-decoration: none;
}
</style>