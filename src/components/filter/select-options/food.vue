<template>
    <div class="food" id="food-filter">
        <b-dropdown size="lg" :text="text" class="m-2" id="dropdown">
            <b-dropdown-item href="#" class="dropdown-menu-items" v-for="filter in filters" @click="callAPI(filter.filterWith)" :filter="filters" :key="filter.id" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filter.imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filter.imageHover">
                    </div>
                </div>
                <div><p>{{filter.filterWith}}</p></div>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
import { EventBus } from '../../../main';
export default {
    data(){
        return{
            text:'Food',
            filters:[
                {
                    id:1,
                    imagePath:'./images/vegetarian.png',
                    imageHover:'./images/vegetarian-hover.png',
                    filterWith:'Vegetarian'
                },
                {
                    id:2,
                    imagePath:'./images/gluten.png',
                    imageHover:'./images/gluten-hover.png',
                    filterWith:'Gluten Free'
                },
                {
                    id:3,
                    imagePath:'./images/vegan.png',
                    imageHover:'./images/vegan-hover.png',
                    filterWith:'Vegan'
                },
                {
                    id:4,
                    imagePath:'./images/halal.png',
                    imageHover:'./images/halal-hover.png',
                    filterWith:'Halal'
                }
            ]
        }
    },
    methods: {
        callAPI(food) {
            this.text = food;
            this.$emit('callAPI', food);
        }
    },
    mounted() {
        EventBus.$on("resetFilter", () => {
            this.text = "Food";
        })
    }
}
</script>
<style scoped>
.dropdown-menu-item{
    max-width: 73px;
}
.dropdown-menu-item img{
    width: 100%;
}
.food{
    display: inline-block;
    /*max-width: 330px;*/
    width: 100%;
    /*margin: 0 29px;*/
    /*margin-bottom: 20px;*/

}
.dropdown-menu-items:hover .sort{
    display: none;
}
.sort-hover{
    display: none;
}
.dropdown-menu-items:hover .sort-hover{
    display: block;
}
ul.dropdown-menu {
    /*min-width: 488px;*/
    width: 100%;
}
li.dropdown-menu-items{
    display: inline-block;
    margin: 2px 24px 2px 25px;
}
.dropdown-menu-items p{
    margin: 0;
    /*font-family: "Panton";*/
    font-size: 11px;
    font-weight: 600;
    text-align: center;
}
li.dropdown-menu-items a{
    padding: 0 !important;
}
</style>
