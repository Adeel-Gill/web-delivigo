<template>
  <div class="popular">
    <div class="title">
      <h2>{{titleHeading}}</h2>
      <p>{{subHeading}}</p>
    </div>
    <div class="restaurants">
      <ul>
        <li v-for="food in foods" :key="food.id" :food="foods">
          <div class="foods"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      titleHeading: 'Popular Restaurant',
      subHeading: 'The easiest way to your favourite food',
      foods:[
        {
            id: 1,
            name:'Jean-Georges',
            description:'French/New American',
            rating: '4.8 (127)',
            waiting:'35-45 Mins',
            imageURL:'./images/fr-1.png'
        },
        {
            id: 2,
            name:'Jean-Georges',
            description:'French/New American',
            rating: '4.8 (127)',
            waiting:'35-45 Mins',
            imageURL:'./images/fr-2.png'
        },
        {
            id: 3,
            name:'Jean-Georges',
            description:'French/New American',
            rating: '4.8 (127)',
            waiting:'35-45 Mins',
            imageURL:'./images/fr-1.png'
        }
      ]
    }
  }
}
</script>
<style scoped>
.title{
  text-align: center;
  font-family: "Roboto";
  color: #080808;
}
.title h2{
  font-size: 35px;
  text-transform: uppercase;
}
.title p{
  font-size: 23px;
}
</style>