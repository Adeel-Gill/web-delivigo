<template>
    <div class="sort">
        <b-dropdown size="sm" :text="text" class="m-2" id="dropdown">
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(1)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[0].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[0].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.recommended}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(2)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[1].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[1].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.rating}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(3)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[2].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[2].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.mostPopular}}</p></div>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="dropdown-menu-items" @click="callAPI(4)" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filters[3].imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filters[3].imageHover">
                    </div>
                </div>
                <div><p>{{newLang.deilveryTime}}</p></div>
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
            text:this.newLang.sort,
            filters:[
                {
                    id:1,
                    imagePath:'./images/recomd.png',
                    imageHover:'./images/recomd-hover.png',
                    filterWith:this.newLang.recommended
                },
                {
                    id:2,
                    imagePath:'./images/rating.png',
                    imageHover:'./images/rating-hover.png',
                    filterWith:'Rating'
                },
                {
                    id:3,
                    imagePath:'./images/most.png',
                    imageHover:'./images/most-hover.png',
                    filterWith:'Most Popular'
                },
                {
                    id:4,
                    imagePath:'./images/time.png',
                    imageHover:'./images/time-hover.png',
                    filterWith:'Delivery Time'
                }
            ],
            local: this.newLang
        }
    },
    methods: {
        setText() {
            this.text = this.newLang.sort;
        },
        callAPI(sort) {
            this.text = this.filters[sort-1].filterWith;
            this.$emit('callAPI',sort);
        },
        changeAll() {
            this.filters[0].filterWith = this.newLang.recommended;
            this.filters[1].filterWith = this.newLang.rating;
            this.filters[2].filterWith = this.newLang.mostPopular;
            this.filters[3].filterWith = this.newLang.deliveryTime;
            this.filters[0].id = 5;
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
.sort{
    display: inline-block;
    /*max-width: 330px;*/
    width: 100%;
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
