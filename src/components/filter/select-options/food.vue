<template>
    <div class="food" id="food-filter">
        <b-dropdown size="lg" :text="text" class="m-2" id="dropdown">
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(filters[0].filterWith)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[0].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[0].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.vegetarian}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(filters[1].filterWith)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[1].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[1].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.glutenFree}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(filters[2].filterWith)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[2].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[2].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.vegan}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(filters[3].filterWith)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[3].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[3].imageHover">
                    </div>
                </div>
                <div><p>{{filters[3].filterWith}}</p></div>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
import { EventBus } from '../../../main';
export default {
    props: ['newLang'],
    data(){
        return{
           text:this.newLang.food,
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
        setText() {
            this.text = this.newLang.food;
        },
        changeAll() {
            this.filters[0].filterWith = this.newLang.vegetarian;
            this.filters[1].filterWith = this.newLang.glutenFree;
            this.filters[2].filterWith = this.newLang.vegan;
            // this.filters[0].id = 5;
        },
        callAPI(food) {
            this.text = food;
            this.$emit('callAPI', food);
        }
    },
    mounted() {
        this.changeAll();
        EventBus.$on("resetFilter", () => {
             this.setText();
            this.changeAll();
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
