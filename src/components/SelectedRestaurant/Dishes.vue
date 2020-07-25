<template>
    <div class="restaurnt-dishes">
        <div class="show-dish-details" id="display-dish" >
            <a  class="close" @click="hideDish"></a>
            <div class="dish-detail-image" style="margin-top: 25px">
                <img :src="`${getImage(dishDetail.ImageUrl)}`" @error="getImage('')">
            </div>
            <div class="dish-detail-about">
                <div class="dish-name-descp">
                    <h4>{{dishDetail.Name}}</h4>
                    <p>{{dishDetail.Description}}</p>
                </div>
                <div class="extra-order">
                    <h6>{{newLang.gliExtraOptions}}</h6>
                    <div class="extra-checkbox" v-for="(customOption, customIndex)  in customOptions" v-bind:key="customOption">
                        <div>

                            <h5 class="float-left">{{customOption.Name}}</h5>
                            <div style="margin-right: 30px; margin-left: 30px" v-for="(option,index) in customOption.Options" :key="option.Id">
                                <div class="clear"></div>

                                <span class="float-left">{{option.Name}}</span>
                                <span class="float-right"><input type="checkbox" @change="setCustomOptions(customIndex,index)" :checked="option.IsSelected"
                                                                 name="extra" :value="option.Name" ></span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <h6>{{newLang.gliExtraAddOn}}</h6>
                    <div class="extra-checkbox" v-for="(addon, index) in addOns" v-bind:key="addon">
                        <div>
                            <span class="float-left">{{addon.Name}}</span>
                            <span class="float-left">&nbsp (+ €{{addon.Price}}.00)</span>
                            <span class="float-right"><input type="checkbox" @change="setAddOnOption(index,addon.Id)"
                                                             name="extra" ref="addOn"  ></span>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <h6>{{newLang.gliExtraScale}}</h6>
                    <div class="extra-checkbox" v-for="(scale, scaleIndex) in scales" v-bind:key="scale.Id">
                        <div>
                            <span class="float-left">{{scale.Name}} </span>
                            <span class="float-right">€{{scale.UnitPrice}}.00 {{newLang.perScale}}</span>
                            <div style="margin-right: 30px; margin-left: 30px" v-for="(option, index) in scale.Options" :key="option.Id">
                                <div class="clear"></div>
                                <span class="float-left">{{option.Name}} - €{{option.Value}}</span>
                                <span class="float-right"><input type="radio" @change="setScaleOptions(scaleIndex, index, scale.UnitPrice, option.Value)"
                                                                 name="extra" :value="option.Name" ></span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div class="quantity-toggle">
                    <button class="btn" @click="decrement(dishDetail.Price)">&mdash;</button>
                    <input type="text" :value="getQuantity" readonly>
                    <button class="btn" @click="increment(dishDetail.Price)">&#xff0b;</button>
                </div>
                <div class="add-item-btn">
                    <button class="btn" @click="saveToCart()" >{{newLang.addItem}} -  € {{getTotalPrice}}.00</button>
                </div>
            </div>
        </div>
        <div class="dishes"  v-for="select in selected" :key="select.Id" @click="displayDish(select.Id)">
            <div class="dish-selection" >
                <div class="dish-image">
                    <img :src="`https://www.foodizza.com/` + select.ImageUrl">
                </div>
                <div class="about-dish">
                    <div class="descp-about" >
                        <h3 style="padding:4px 0 0 0">{{select.Name}}</h3>
                        <p style="padding:0px">{{select.Description}}</p>
                        <div class="price-dish">
                        
                            <p>{{select.Price}}</p>
                        </div>
                        <div class="buy-btn">
                            <button >{{newLang.buy}}</button>
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
    import {baseAddress} from "../../main";
    import {fetchMealById} from "../api/CustomMeal";
    import {defaultDishPic} from "../../main";
    import {mapGetters} from "vuex";

    export default {
        props: ['newLang'],
        data(){
            return{
                quantity: this.$store.state.quantity,
                dishDetail: {},
                addOns: [],
                scales: [],
                customOptions: [],
                newCustomOptions: [],
                newAddOnIds: [],
                newScales: [],
                baseLink: baseAddress,
                dishObj: {},
                image: '',
                baseUrl: '',
                selected: [], // Must be an array reference!
                isCustomMeal: null,
                price: this.$store.state.totalPrice,
                dishPrice: 0,
                count: 0,
                meal: {"Meal":
                        {
                            "MealId": null,
                            "Name": null,
                            "RestroId": null,
                            "Price": null,
                            "MealCategoryId": null,
                            "IsRecommend": null,
                            "IsCustomDish": null,
                            "ImageUrl": null,
                            "IsFeatured": null,
                            "IsAvailable": null,
                            "MealMainId": null,
                            "Description": null,
                            "Quantity": null,
                            "Discount": null,
                            "Rating": null,
                            "TimeDuration": null,
                            "Tags": null
                        },
                    "AddOnIds":
                        [
                            null
                        ],
                    "CustomOptions":
                        [
                            null
                        ],
                    "Scale": [
                        null
                    ]
                },
                customOptionObject: {
                    "Id": null,
                    "Name": null,
                    "Options":
                        [

                        ]
                },
                singleOptionObject:  {
                    "IsSelected": true,
                    "Id": null,
                    "Name": null
                },
                checked: true,
                addOnIds: [],
            }
        },
        computed: {
            ...mapGetters([
                'getTotalPrice',
                'getQuantity'
            ])
        },
        methods: {
            setAddOnOption(id,addonId) {
                this.$store.dispatch('setAddOnOption', {
                    id: id,
                    addonId: addonId
                });
                this.$store.dispatch('calculatePrice',{dishPrice: this.dishPrice});

            },
            setCustomOptions(pID,cID) {
                console.log('pID',pID,'cID',cID);
                this.$store.dispatch('setCustomOptions', {pID: pID,
                    cID: cID});
                },
            setScaleOptions(pID,cID,unitPrice,value) {
                console.log('pID',pID,'cID',cID,'unitPrice',unitPrice,'value',value);
                this.$store.dispatch('setScaleOptions', {
                    pID: pID,
                    cID: cID
                });
                this.$store.dispatch('calculatePrice',{dishPrice: this.dishPrice});
                },
            isChecked() {
                this.checked = !this.checked
                return this.checked;
            },
            calculatePrice(price) {

            },
            increment (price) {
                this.$store.dispatch('increment');
                this.$store.dispatch('calculatePrice',{dishPrice: this.dishPrice});

            },
            decrement (price) {
                this.$store.dispatch('decrement');
                this.$store.dispatch('calculatePrice',{dishPrice: this.dishPrice});

            },
            clearMealObject() {
                console.log('start',this.meal);
                this.meal = {};
                this.customOptionObject = {};
                this.singleOptionObject = {};
                console.log('here3');
            },
            resetMealObject() {
                this.meal = {
                    "Meal":
                        {
                            "Id": null,
                            "Name": null,
                            "RestroId": null,
                            "Price": null,
                            "MealCategoryId": null,
                            "IsRecommend": null,
                            "IsCustomDish": null,
                            "ImageUrl": null,
                            "IsFeatured": null,
                            "IsAvailable": null,
                            "MealMainId": null,
                            "Description": null,
                            "Quantity": null,
                            "Discount": null,
                            "Rating": null,
                            "TimeDuration": null,
                            "Tags": null
                        },
                    "AddOnIds": [],
                    "CustomOptions": [],
                    "Scale": []
                };
                this.customOptions = {
                    "Id": null,
                    "Name": null,
                    "Options":
                        [

                        ]
                };
                this.singleOptionObject = {
                    "IsSelected": true,
                    "Id": null,
                    "Name": null
                };
                console.log('mealObject',this.meal);

            },
            setMealObject(obj) {
                console.log('start',obj);
                this.meal.Meal.Id = obj.Meal.Id;
                this.meal.Meal.Name = obj.Meal.Name;
                this.meal.Meal.RestroId = obj.Meal.RestroId;
                this.meal.Meal.Price = this.$store.state.totalPrice;
                this.meal.Meal.MealCategoryId = obj.Meal.MealCategoryId;
                this.meal.Meal.ImageUrl = baseAddress + obj.Meal.ImageUrl;
                this.meal.Meal.IsRecommend = true;
                this.meal.Meal.IsFeatured = true;
                this.meal.Meal.IsCustomDish = true;
                this.meal.Meal.IsAvailable = true;
                this.meal.Meal.Quantity = this.quantity;
                this.meal.Meal.MealMainId = obj.Meal.MealMainId;
                this.meal.Meal.Description = obj.Meal.Description;
                this.meal.Meal.Discount = obj.Meal.Discount;
                this.meal.Meal.Rating = obj.Meal.Rating;
                this.meal.Meal.TimeDuration = 30;
                this.meal.Meal.Tags = obj.Meal.Tags;
                console.log('here1',this.addOnIds,this.newCustomOptions,this.newScales);
                this.meal.AddOnIds = (this.$store.state.addOnIds);
                this.meal.CustomOptions= (this.$store.state.newCustomOptions);
                this.meal.Scale= (this.$store.state.newScales);

                console.log('here2');

                console.log('here3Object',this.meal);
                this.$store.dispatch('clearOrderItems')
            },
            saveToCart() {
                if(this.$store.state.cartData.length <= 0) {
                    console.log('received',);
                    this.resetMealObject();
                    this.setMealObject(this.dishObj);
                    console.log('mealObject',this.meal);
                    this.$store.dispatch('saveInCart',this.meal);
                    document.getElementById("display-dish").style.display = "none";
                    this.showNotification('success','Success','Item added in cart...!');
                    this.resetMealObject();
                    this.quantity = 1;
                }
                else if(this.dishObj.Meal.RestroId === this.$store.state.cartData[0].Meal.RestroId) {
                    console.log('received',);
                    this.setMealObject(this.dishObj);
                    console.log('mealObject',this.meal);
                    this.$store.dispatch('saveInCart',this.meal);
                    document.getElementById("display-dish").style.display = "none";
                    this.showNotification('success','Success','Item added in cart...!');
                    this.resetMealObject();
                    this.quantity = 1;
                } else {
                    this.$dialog.confirm('Items of different restaurants are already in the cart. Clear cart to add new item. Continue?', {
                        loader: true
                    }).then(dialog => {
                        dialog.loading(false);
                        this.$store.dispatch('clearCart');
                        console.log('received',);
                        this.clearMealObject();
                        this.createMealObject();
                        this.setMealObject(this.dishObj);
                        console.log('mealObject',this.meal);
                        this.$store.dispatch('saveInCart',this.meal);
                        document.getElementById("display-dish").style.display = "none";
                        this.showNotification('success','Success','Item added in cart...!');
                        dialog.close();
                    }).catch(() => {
                        this.showNotification('info','Info','Place order now to add other restaurant items!');
                    })
                }
                this.$root.$emit("itemAddedToCart");
                localStorage.setItem("items", this.$store.state.cartData.length);
            },
            checkArrayResponse(arr,type) {
                if(arr.length>0) {
                    return true;
                } else {
                    this.showNotification('error','Error','No '+type+' available to show!');
                    return false;
                }
            },
            checkObjectResponse(obj,type) {
                if(obj == null) {
                    this.showNotification('error','Error','No '+type+' available to show!');
                    return false;
                } else {
                    return true;
                }
            },
            async displayDish(dishId){
                this.$store.dispatch('clearOrderItems');
                fetchMealById(dishId).then(response => {
                    if(this.checkObjectResponse(response.Meal,'dish detail')) {
                        this.dishObj = response;
                        this.dishDetail = response.Meal;
                        this.price = this.dishPrice = this.dishDetail.Price;
                        this.scales = response.Scale;
                        this.newScales = response.Scale;
                        this.newAddOnIds = response.AddOns;
                        this.newCustomOptions = response.CustomOptions;
                        this.$store.dispatch('setOrderItems',{customOption:this.newCustomOptions,
                            addOn:this.newAddOnIds,
                            scale:this.newScales,
                            dishPrice: this.dishPrice});
                        console.log('afterSet',this.$store.state.newCustomOptions,this.$store.state.newAddOnIds,this.$store.state.newScales);
                    }
                    if(this.checkArrayResponse(response.AddOns,'addons')) {
                        this.addOns = response.AddOns;
                    }
                    if(this.checkArrayResponse(response.CustomOptions, 'custom options')) {
                        this.customOptions = response.CustomOptions;
                    }

                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                })
                document.getElementById("display-dish").style.display = "block";
            },
            hideDish() {
                console.log('here');
                document.getElementById("display-dish").style.display = "none";
            },
            getImage(img) {
                if(img === '' || img === 'null' || img == null) {
                    this.image = defaultDishPic
                    return this.image;
                } else {
                    this.image = baseAddress + img;
                    return this.image;
                }
            },
            addDishes() {
                this.$root.$on('mealMenuById', response => {
                    console.log('ObjectReceived'+response);
                    console.log('BeforeClearSelectedObject',this.selected);
                    if(this.checkObjectResponse(response,'meals for this menu')){
                        this.selected = [];
                        console.log('AfterClearSelectedObject',this.selected);
                        this.selected = response;
                        console.log('ObjectReceived&Selected'+this.selected);
                    }
                })
            },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
            async checkFoodResponse(response) {
                if(response.length>0) {
                    this.selected = response;
                    this.baseUrl = baseAddress;
                    // console.log('dishes',this.selected);
                }
            }
        },
        mounted() {
            this.$root.$on('popularFood', async (response) => {
                // this.selected = response;
                this.baseUrl = baseAddress;
                console.log('dishes',this.selected);
                // await this.checkFoodResponse(response);
                // setTimeout(()=> {
                //     this.selected = response;
                //     console.log('dishes',this.selected);
                // },2000);
                if(response.length>0) {
                    this.selected = response;
                    this.baseUrl = baseAddress;
                    console.log('dishes',this.selected);
                } else {
                    if(this.count === 0) {
                        console.log('dishesNotification');
                        this.showNotification('error','Error','No dishes are available to show!');
                        this.count++;
                    } else {
                        this.count++;
                    }
                }
                // this.resetMealObject();
            })
            // this.$root.$on('isCustomMeal', response => {
            //     this.isCustomMeal = response;
            //     console.log('isCustomMeal'+response);
            //     if(this.isCustomMeal) {
            //         console.log('isGotTrue');
            //         this.addDishes();
            //     }
            // })
            // this.createMealObject();
        },
        updated() {
            // this.$root.$on('isCustomMeal', response => {
            //     this.isCustomMeal = response;
            //     console.log('isUCustomMeal'+response);
            //     if(this.isCustomMeal) {
            //         console.log('isUGotTrue');
            //         this.addDishes();
            //     }
            // })
        }
    }
</script>
<style scoped>
    .clear{
        clear: both;
    }
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
        /*font-family: "Roboto";*/
        font-size: 22px;
        font-weight: normal;
        position: relative;
        padding-bottom: 16px;
        margin: 0;
    }
    .extra-order h6::after {
        content: '';
        width: 100%;
        height: 2px;
        background: #e3e3e3;
        position: absolute;
        /*left: -20px;*/
        bottom: 0;
        right: 0;
    }
    .extra-checkbox span {
        margin: 10px 0 0px 0;
        /*font-family: "Roboto";*/
        font-size: 20px;
    }
    .dish-name-descp h4 {
        /*font-family: "Roboto";*/
        font-weight: normal;
        font-size: 30px;
    }

    .dish-name-descp p {
        color: #787878;
        /*font-family: "Roboto";*/
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
        /*font-family: "Roboto";*/
        cursor: pointer;
    }
    .quantity-toggle button:hover{
        color: white;
        background-color:#8ba939 ;
        border: 4px solid #76963C;
    }

    .quantity-toggle input {
        width: 95px;
        text-align: center;
        /*font-family: "Roboto";*/
        font-weight: 600;
        font-size: 23px;
    }
    .add-item-btn{
        text-align: center;
    }
    .add-item-btn button {
        background: #8ba939;
        display: inline-block;
        padding: 20px 55px;
        border-radius: 60px;
        color: white;
        /*font-family: "Roboto";*/
        font-weight: bold;
        font-size: 22px;
        text-decoration: none;
    }

    .extra-checkbox input[type="checkbox"]{
        height: 15px;
        width: 16px;
    }
    .extra-checkbox input[type="radio"]{
        height: 18px;
        width: 18px;
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
        max-width: 35%;
        /*float: left;*/
        margin: 8px -20px 8px 0px;
        /*position: absolute;*/
        /*left: 0;*/
        display: inline-block;
    }
    .dish-image img {
        width: 100%;
        border-radius: 10px;
        height: 157px;
    }
    .about-dish {
        /*float: right;*/
        z-index: -2;
        width: 68%;
        display: inline-block;
        position: absolute;
    }
    .descp-about{
        min-width: 100%;
        min-height: 175px;
        border-radius: 10px;
        background-color: antiquewhite;
        padding-left: 40px;
        padding-right: 10px;
    }
    .descp-about p {
        color: #787878;
        /*font-family: "Roboto";*/
        font-size: 16px;
        margin: 0 auto;
        line-height: 17px;
        text-align: left;
        padding: 30px 0 0 0;
    }
    .price-dish {
        float: left;
        /*margin: 0 65px;*/
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
        /*margin: 0 47px;*/
        margin-right: 20px;
    }
    .buy-btn button {
        display: inline-block;
        border: 2px solid #4c37eb;
        color: #4c37eb;
        /*font-family: "Roboto";*/
        font-weight: 600;
        font-size: 17px;
        padding: 0px 20px;
        border-radius: 30px;
    }
    .buy-btn button:hover{
        background: #4c37eb;
        color: white;
        text-decoration: none;
    }
    /*    close button classes*/
    .close {
        position: absolute;
        right: 32px;
        top: 32px;
        width: 32px;
        height: 32px;
        opacity: 0.3;
    }
    .close:hover {
        opacity: 1;
    }
    .close:before, .close:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #000;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }


    @media screen and (max-width: 960px) and (min-width: 761px){
        .add-item-btn button {
            padding: 15px 36px;
            font-size: 20px;
        }
    }
    @media screen and (max-width: 760px) and (min-width: 561px){

    }
    @media screen and (max-width: 560px) and (min-width: 460px){
        .dish-image img{
            height: 138px;
        }
        .descp-about{
            min-height: 157px;
        }

        .add-item-btn button {
            padding: 15px 20px;
            font-size: 20px;
        }
    }
    @media screen and (max-width: 460px){

        .descp-about {
            padding-top: 40px;
            min-height: unset;
            padding-left: 10px;
            padding-right: 10px;
        }

        .about-dish {
            position: absolute;
            top: 37%;
            width: 100%;
        }

        .dish-image {
            max-width: 65%;
            max-height: 157px;
            position: absolute;
            top: 0;
            left: 17%;
            right: 17%;
        }

        .dish-image img{
            height: 157px;
        }

        .dish-selection {
            min-height: 350px;
        }

        .dishes {
            min-height: 350px;
        }
        .descp-about{
            min-height: 120px;
        }

        .add-item-btn button {
            padding: 10px 15px;
            font-size: 20px;
        }
    }

</style>
