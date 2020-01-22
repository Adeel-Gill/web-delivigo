<template>
<div>
    <div class="catagories" v-if="categoriesNotEmpty">
        <h2>{{titleSection}}</h2>
        <div class="show-more" v-if="categoriesMore">
            <router-link to="/foodCategories">Show More</router-link>
        </div>
        <div class="clear"></div>
        <div class="row">
            <app-categories v-for="catagory in foodCategories.slice(0,3)"
                            v-bind:key="catagory.Id"
                            :foodCategories="catagory"></app-categories>
        </div>
    </div>
    <div class="row" v-else>
        <app-empty-error></app-empty-error>
    </div>
</div>
</template>
<script>

    import foodCategories from "../foodCategories/foodCategories";
    import emptyError from "../error/emptyError";
    export default {
    data(){
        return{
            titleSection:'Categories',
            cardImage: 'card1-image',
            foodCategories: [],
            categoriesMore: false,
            categoriesNotEmpty: true,
        }
    },
    components: {
        appCategories: foodCategories,
        appEmptyError: emptyError
    },
    methods: {
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
        this.$root.$on('foodCategoriesData', foodCategoriesData => {
            if(foodCategoriesData.length>0) {
                this.foodCategories = foodCategoriesData;
                if(foodCategoriesData.length > 3) {
                    this.categoriesMore = true;
                }
            } else {
                this.categoriesNotEmpty = false;
                this.showNotification('error','Error','No food categories available to show!');
            }
        })
    }
}
</script>
<style scoped>
    .show-more{
        float: right;
    }
    .show-more a {
        color: #0030b4;
        display: inline-block;
        margin: 10px 0 20px;
        font-family: "Panton";
        font-weight: bold;
        font-size: 17px;
    }
.catagories{
    margin-bottom: 50px;
}
.catagory a {
    text-decoration: none;
    display: inline-block;
}
.catagory:hover a {
    opacity: 0.5;
}
.catagory-desc{
    border-radius: 0px 0px 110px 110px;
}
.bg-green{
    background-color: #8ba939;
}
.bg-red{
    background-color: #df6767;
}
.bg-blue{
    background-color: #729da4;
}
.bg-grey{
    background-color: #c0bbb2;
}
.bg-brown{
    background-color: #a07f4c;
}
.card-image{
    height: 242px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 160px;
    border-radius: 110px 110px 0 0;
}
.catagory-text {
    margin: 0 30px;
    min-height: 165px;
    color: white;
}
.catagory-text h5 {
    font-family: "Panton";
    font-weight: bold;
    font-size: 22px;
    padding-top: 15px;
    margin: 0;
}
.catagory-text h6 {
    font-family: "Panton";
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 25px;
}
.catagory-text p {
    font-family: "Roboto";
    font-size: 17px;
    font-weight: normal;
}
.bg-grey .catagory-text {
    color: black;
}

</style>
