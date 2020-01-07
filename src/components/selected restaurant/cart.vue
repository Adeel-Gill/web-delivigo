<template>
    <div>
        <div class="slected-bg" :style="{'background-image': 'url('+image+')'}">
           <div class="food-type">
                <p><span>€</span><span> €</span><span> €</span><span>€</span></p>
                <button
                        v-for="foodType in foodTypes.slice(0,6)"
                        style="margin-top: 5px"
                        :key="foodType"
                        @click="navigateTo(foodType.Id)" >{{foodType.Name}}</button>
            </div>
 <!--            <div class="shoping-cart">-->
            <!--                <div class="cart">-->
            <!--                    <a href=""><img :src="cartImg" alt=""></a>-->
            <!--                </div>-->
            <!--                <div class="cart-hover">-->
            <!--                    <a href=""><img :src="cartHover" alt=""></a>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
        <vue-drawer-layout
                ref="drawer"
                drawer-position="right"
                reverse="true"
                drawer-width="100"
                drawer-height="100"
                @mask-click="handleMaskClick">
            <div class="drawer" slot="drawer">
                <div @click = "handleToggleDrawer" >
                    <fab style="margin-top: 60px; margin-right: 50px"
                         position="top-right"
                         position-type="absolute"
                         ripple-show="true"
                         ripple-color="dark"
                         bg-color="#8ba939"
                         main-tooltip="Cart"
                         main-icon="shopping_cart"
                         enable-rotation="false"
                    ></fab>
                </div>
                <div class="text"  style=" margin-top: 50px"> drawer ashdashjd asdjhasdsjhdg ajsdhasgd text </div>
            </div>
        </vue-drawer-layout>
    </div>

</template>
<script>
    import {baseAddress} from "../../main";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import fab from 'vue-fab';
    export default {
    data(){
        return{
            foodTypes:[],
            cartImg:'../images/cart.png',
            cartHover:'../images/cart-hover.png',
            baseUrl: baseAddress,
            restaurant: {},
            image: '',
            fabActions: [{
                name: 'cache',
                icon: 'cached'
            }],
            allImages: [],
            restaurantImages: [],
            resID: null,
            mealID: null
        }
    },
        components: {
        fab,
        },
    mounted() {
        this.$root.$on('mealMenu', response => {
            this.foodTypes = response;
        });
        this.$root.$on('restaurantImages', response => {
            this.restaurantImages = response;
            this.restaurantImages.forEach(image => {
                this.allImages.push(this.baseUrl+image.ImageUrl);
                console.log('allImages',this.allImages);
            })
        });
        this.$root.$on('restaurant', response => {
            this.restaurant = response;
            this.image = this.baseUrl+this.restaurant.ImageUrl;
        })
    },
    methods: {
        handleToggleDrawer() {
            console.log('insideToggle',this.$refs.drawer);
            this.$refs.drawer.toggle();
        },
        handleMaskClick() {
            console.info('mask-click');
            this.$refs.drawer.toggle(false);
        },
            navigateTo(id) {
                console.log('insideNavigateMethod', id);
                if(id) {
                    this.$router.push({path:'/restaurant/'+this.$route.params.id,query:{mealID:id}});
                    this.fetchRestaurantMealById(this.$route.params.id,id);
                } else {
                    alert('Please select menu other than popular!');
                }
            },
        async fetchRestaurantMealById(resId, mealId) {
                console.log('bothIDs'+resId+mealId);
            fetchRestaurantMealsById(resId, mealId).then(response => {
                this.$root.$emit('popularFood',response.Meals);
                this.$root.$emit('isCustomMeal', true);
            })
        }
    }

}
</script>
<style scoped>
.slected-bg {
    position: relative;
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
.food-type button {
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
.drawer{
    background-color: #f8f8f8;
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
.new-cart{
    top: 10px;
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
