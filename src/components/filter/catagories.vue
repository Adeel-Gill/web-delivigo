<template>
<div>
    <div class="catagories">
        <h2>{{titleSection}}</h2>
        
            <div class="catagory" v-for="catagory in catagories" :catagory="catagories" :key="catagory.id">
                <a href="#">
                <div :class="cardImage" class="card-image">
                </div>
                <div :class="bgClass" class="catagory-desc">
                    <div class="catagory-text">
                        <h5>{{catagory.title}}</h5>
                        <h6>{{catagory.restaurants}}</h6>
                        <p><i class="fas fa-star"></i> {{catagory.rating}}</p>
                    </div>
                </div>
                </a>
            </div>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            titleSection:'Categories',
            cardImage: 'card1-image',
            bgClass: 'bg-green',
            catagories:[
                {
                    id:1,
                    card:'card1-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-green'
                },
                {
                    id:2,
                    card:'card2-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-red'
                },
                {
                    id:3,
                    card:'card3-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-grey'
                },
                {
                    id:4,
                    card:'card4-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-blue'
                },
                {
                    id:5,
                    card:'card1-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-brown'
                },
                {
                    id:6,
                    card:'card2-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-red'
                },
                {
                    id:7,
                    card:'card3-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-grey'
                },
                {
                    id:8,
                    card:'card4-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-blue'
                },
                {
                    id:9,
                    card:'card1-image',
                    title:'Sushi',
                    restaurants:'7 Restaurants',
                    rating:'4.8 (127)',
                    class: 'bg-brown'
                },
                {
                    id:10,
                    card:'card2-image',
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
.catagories{
    margin-bottom: 50px;
}
.catagory{
    display: inline-block;
    margin: 25px 21px;
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
.card1-image{
    background-image: url(/images/card1.png);
}
.card2-image{
    background-image: url(/images/card2.png);
}
.card3-image{
    background-image: url(/images/card3.png);
}
.card4-image{
    background-image: url(/images/card4.png);
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
