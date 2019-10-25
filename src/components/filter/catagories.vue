<template>
<div>
    <div class="catagories">
        <div class="gatagory" v-for="catagory in catagories" :catagory="catagories" :key="catagory.id">
            <img :src="catagory.foodImg" />
            <div class="catagory-text" :class="catagory.class">
                <h6>{{catagory.title}}</h6>
                <p>{{catagory.restaurants}}</p>
                <p>{{catagory.rating}}</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            catagories:[
                {
                    id:1,
                    foodImg:'./images/card1.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-green'
                },
                {
                    id:2,
                    foodImg:'./images/card2.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-red'
                },
                {
                    id:3,
                    foodImg:'./images/card3.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-grey'
                },
                {
                    id:4,
                    foodImg:'./images/card4.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-blue'
                },
                {
                    id:5,
                    foodImg:'./images/card1.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-brown'
                },
                {
                    id:6,
                    foodImg:'./images/card2.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-red'
                },
                {
                    id:7,
                    foodImg:'./images/card3.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-grey'
                },
                {
                    id:8,
                    foodImg:'./images/card4.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-blue'
                },
                {
                    id:9,
                    foodImg:'./images/card3.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-brown'
                },
                {
                    id:10,
                    foodImg:'./images/card4.png',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-red'
                }
            ]
        }
    }
}
</script>
<style scoped>
.gatagory{
    max-width: 170px;
    display: inline-block;
}
.gatagory img{
    width: 100%;
    transform: rotate(90deg);
    display: inline-block;
    border-radius: 80px 0px 0px 80px;
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
</style>