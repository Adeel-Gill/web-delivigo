<template>
    <div class="popular-dishes">
        <h5>{{favrtDishes}}</h5>
        <ul>
            <li v-for="dish in dishes" :key="dish.id" dish="dishes">
                {{dish.dishType}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            favrtDishes:'Popular',
            dishes:[
                {
                    id:1,
                    dishType:'Salads'
                },
                {
                    id:2,
                    dishType:'Soups'
                },
                {
                    id:3,
                    dishType:'Hot Meals'
                }
            ]
        }
    }
}
</script>
<style scoped>

.popular-dishes {
    text-align: left;
    background: #f2f2f2;
    margin: 50px 15px -20px 0px;
    padding: 15px 0 15px 35px;
}
.popular-dishes h5 {
    font-family: "Roboto";
    font-size: 30px;
    font-weight: 500;
    color: black;
    position: relative;
    padding-bottom: 15px;
}
.popular-dishes h5::after {
    content: '';
    width: 91%;
    height: 2px;
    background: black;
    position: absolute;
    bottom: 0;
    left: -35px;
}
.popular-dishes ul {
    padding: 0;
}
.popular-dishes ul li {
    list-style: none;
    padding: 7px 0px;
    font-family: "Roboto";
    font-size: 27px;
    font-weight: 500;
    color: black;
}

</style>