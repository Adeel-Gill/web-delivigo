<template>
    <div id="filtered-restaurant">
      <div class="filter-slider">
        <b-carousel
          id="carousel-2"
          fade
          v-model="slide"
          :interval="3000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide v-for="(slide) in slides" :key="slide.imageURL" :img-src="slide.imageURL" >
            <div class="filter-caption">
              <h6>{{slide.title}}</h6>
              <h3>{{slide.heading}}</h3>
              <p>{{slide.description}}</p>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        text:'',
        slide: 0,
        sliding: null,
        slides:[
            {
                title:'Restaurant',
                heading:'Free Delivery',
                description:'Enjoy your food!',
                imageURL:'/images/pg-2-slide1.png'
            },
            {
                title:'Restaurant2',
                heading:'Free Delivery',
                description:'Enjoy your food!',
                imageURL:'/images/pg-2-slide2.png'
            },
            {
                title:'Restaurant3',
                heading:'Free Delivery',
                description:'Enjoy your food!',
                imageURL:'/images/pg-2-slide3.png'
            }
        ]
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>
<style scoped>

.filter-caption h6 {
    font-family: "Roboto";
    font-size: 15px;
    font-weight: 500;
    color: black;
    text-shadow: none;
    margin: 0;
}
.filter-caption h3 {
    font-family: "Roboto";
    font-weight: bold;
    font-size: 25px;
    color: black;
    text-shadow: none;
    margin: 0;
    line-height: 30px;
}
.filter-caption p {
    font-family: "Roboto";
    font-size: 25px;
    font-weight: 300;
    text-shadow: none;
    color: black;
    margin: 0;
}

.filter-slider{
    border: 3px solid #cccccc;
    margin: 50px 0;
    display: flex;
    align-items: center;
    position: relative;
}


</style>
