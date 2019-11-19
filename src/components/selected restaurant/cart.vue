<template>
    <div class="slected-bg">
        <div class="food-type">
            <p><span>€</span><span> €</span><span> €</span><span>€</span></p>
            <a href="#" v-for="foodType in foodTypes" :key="foodType.id" foodType="foodTypes">{{foodType.type}}</a>
        </div>
        <div class="shoping-cart">
            <div class="cart">
                <a href=""><img :src="cartImg" alt=""></a>
            </div>
            <div class="cart-hover">
                <a href=""><img :src="cartHover" alt=""></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            foodTypes:[
                {
                    id:1,
                    type: 'Burgers'
                },
                {
                    id:2,
                    type: 'pizza'
                },
                {
                    id:3,
                    type: 'Sushi'
                }
            ],
            cartImg:'images/cart.png',
            cartHover:'images/cart-hover.png'
        }
    }
    
}
</script>
<style scoped>
.slected-bg {
    position: relative;
    background-image: url(/images/resturnt-select.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 667px;
    border-radius: 0px 500px 500px 0;
    box-shadow: 37px 17px 7px 0px rgba(0, 0, 0, 0.05);
    width: 97%;
}

.food-type {
    position: absolute;
    bottom: 0;
    left: 100px;
    bottom: 100px;
}
.food-type p {
    text-align: left;
    color: white;
    font-weight: bold;
    font-size: 40px;
    margin: 0 0;
    text-shadow: 2px 2px 11px #020202;
}
.food-type a {
    text-decoration: none;
    display: inline-block;
    padding: 10px 20px;
    background: red;
    margin: 0 20px 0 5px;
    color: white;
    font-weight: bold;
    font-family: "Roboto";
    font-size: 20px;
    text-transform: uppercase;
}
.food-type p span {
    display: inline-block;
    margin: 0 25px 0 0;
}
.shoping-cart {
    background: #8ba939;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    top: 10px;
    right: 15px;
}
.shoping-cart a{
    display: inline-block;
}
.shoping-cart img {
    display: inline-block;
    vertical-align: middle;
    padding: 0px 12px;
    max-width: 70%;
}
.shoping-cart:hover .cart{
    display: none;
}
.cart-hover{
    display: none;
}
.shoping-cart:hover .cart-hover{
    display: block;
}
</style>