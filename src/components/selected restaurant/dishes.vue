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
                    <h6>GLI EXTRA - FACOLTATING</h6>
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
                    <h6>GLI EXTRA - FACOLTATING</h6>
                    <div class="extra-checkbox" v-for="(addon, index) in addOns" v-bind:key="addon">
                        <div>
                            <span class="float-left">{{addon.Name}}</span>
                            <span class="float-left">&nbsp (+ €{{addon.Price}}.00)</span>
                            <span class="float-right"><input type="checkbox" @change="setAddOnOption(index,addon.Id,addon.Price)"
                                                             name="extra" ref="addOn"  ></span>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <h6>GLI EXTRA - Scale</h6>
                    <div class="extra-checkbox" v-for="(scale, index) in scales" v-bind:key="scale.Id">
                        <div>
                            <span class="float-left">{{scale.Name}} </span>
                            <span class="float-right">€{{scale.UnitPrice}}.00 Per unit</span>
                            <div style="margin-right: 30px; margin-left: 30px" v-for="(option, index) in scale.Options" :key="option.Id">
                                <div class="clear"></div>
                                <span class="float-left">{{option.Name}} - €{{option.Value}}</span>
                                <span class="float-right"><input type="radio"
                                                                 name="extra" :value="option.Name" ></span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div class="quantity-toggle">
                    <button @click="decrement(dishDetail.Price)">&mdash;</button>
                    <input type="text" :value="quantity" readonly>
                    <button @click="increment(dishDetail.Price)">&#xff0b;</button>
                </div>
                <div class="add-item-btn">
                    <button @click="saveToCart()" >Add item -  € {{totalPrice}}.00</button>
                </div>
            </div>
        </div>
        <div class="dishes"  v-for="select in selected" :select="select" :key="select.Id" @click="displayDish(select.Id)">
            <div class="dish-selection" >
                <div class="dish-image">
                    <img :src="getImage(select.ImageUrl)" @error="getImage('')">
                </div>
                <div class="about-dish">
                    <div class="descp-about" >
                        <p>{{select.Name}}</p>
                        <div class="price-dish">
                            <p>{{select.Price}}</p>
                        </div>
                        <div class="buy-btn">
                            <a href="#">Buy</a>
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

export default {
    data(){
        return{
            quantity: 1,
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
            totalPrice: 0,
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
    methods: {
        setAddOnOption(id,addonId,price) {
          console.log('addOnId',id, this.$refs.addOn.checked,this.newAddOnIds[id].IsSelected);
          this.newAddOnIds[id].IsSelected = !this.newAddOnIds[id].IsSelected;
            console.log('addOnId',id, this.$refs.addOn.checked,this.newAddOnIds[id].IsSelected);
           console.log(this.newAddOnIds[id].IsSelected);
          if(this.newAddOnIds[id].IsSelected) {
              this.addOnIds.push(addonId);
              console.log('afterPush',this.addOnIds);
              this.totalPrice = this.totalPrice + price;
          } else {
              this.addOnIds.splice(this.addOnIds.indexOf(addonId),1);
              this.totalPrice = this.totalPrice - price;
              console.log('afterSplice',this.addOnIds);
          }
        },
        setCustomOptions(pID,cID) {
          console.log('pID',pID,'cID',cID);
        },
        isChecked() {
          this.checked = !this.checked
            return this.checked;
        },
        increment (price) {
            this.quantity++;
            this.totalPrice = price * this.quantity;
        },
        decrement (price) {
            if(this.quantity === 1) {
                alert('Negative quantity not allowed')
            } else {
                this.quantity--;
                this.totalPrice = price * this.quantity;
            }
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
                    ]
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
            this.meal.Meal.MealId = obj.Meal.Id;
            this.meal.Meal.Name = obj.Meal.Name;
            this.meal.Meal.RestroId = obj.Meal.RestroId;
            this.meal.Meal.Price = this.quantity * obj.Meal.Price;
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
            console.log('here1');
            for(  let addon of obj.AddOns){
                this.meal.AddOnIds.push(addon.Id);
            }
            console.log('here2');
            for(let customOption of obj.CustomOptions) {
                console.log('insideLoop',customOption);
                this.customOptionObject.Id = this.singleOptionObject.Id = customOption.Id;
                this.customOptionObject.Name = this.singleOptionObject.Name = customOption.Name;
                this.customOptionObject.Options.push(this.singleOptionObject);
                console.log('afterFirstPush',this.customOptionObject.Options);

                this.meal.CustomOptions.push(this.customOptionObject);
                console.log('afterSecondPush',this.meal.CustomOptions);
            }
            console.log('here3Object',this.meal);
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
            }
            else if(this.dishObj.Meal.RestroId === this.$store.state.cartData[0].Meal.RestroId) {
                console.log('received',);
                this.setMealObject(this.dishObj);
                console.log('mealObject',this.meal);
                this.$store.dispatch('saveInCart',this.meal);
                document.getElementById("display-dish").style.display = "none";
                this.showNotification('success','Success','Item added in cart...!');
                this.resetMealObject();
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
            fetchMealById(dishId).then(response => {
                if(this.checkObjectResponse(response.Meal,'dish detail')) {
                    this.dishObj = response;
                    this.dishDetail = response.Meal;
                    this.totalPrice = this.dishDetail.Price;
                    this.scales = response.Scale;
                    this.newScales = response.Scale;
                    this.newAddOnIds = response.AddOns;
                    this.newCustomOptions = response.CustomOptions;
                }
                if(this.checkArrayResponse(response.AddOns,'addons')) {
                    this.addOns = response.AddOns;
                }
                if(this.checkArrayResponse(response.CustomOptions, 'custom options')) {
                    this.customOptions = response.CustomOptions;
                }
                // if(response.AddOns.length>0) {
                //     this.addOns = response.AddOns;
                //     if(response.CustomOptions.length>0) {
                //         this.customOptions = response.CustomOptions;
                //     } else {
                //         this.showNotification('error','Error','No custom options available to show!');
                //     }
                // } else {
                //     this.showNotification('error','Error','No addons available to show!');
                // }
                // this.dishDetail = response.Meal;
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
        }
    },
    mounted() {
        this.$root.$on('popularFood', response => {
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
        this.$root.$on('isCustomMeal', response => {
            this.isCustomMeal = response;
            console.log('isCustomMeal'+response);
            if(this.isCustomMeal) {
                console.log('isGotTrue');
                this.addDishes();
            }
        })
        // this.createMealObject();
    },
    updated() {
        this.$root.$on('isCustomMeal', response => {
            this.isCustomMeal = response;
            console.log('isUCustomMeal'+response);
            if(this.isCustomMeal) {
                console.log('isUGotTrue');
                this.addDishes();
            }
        })
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
.add-item-btn button {
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

</style>
