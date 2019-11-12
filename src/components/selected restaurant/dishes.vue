<template>
    <div class="restaurnt-dishes">
        <div class="dishes" v-for="select in selects" :select="select" :key="select.id">
            <div class="dish-selection">
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
        }
    }
}
</script>
<style scoped>
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