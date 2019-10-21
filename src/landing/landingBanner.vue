
<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      indicators
      background="#ababab"
      img-width="100%"
      img-height="auto"
      style="text-shadow: 1px 1px 2px #333;"
      
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="(slide) in slides" :key="slide.imageURL" :img-src="slide.imageURL" >
        <div class="caption-change">
            <h1>{{slide.heading}}</h1>
            <p>{{slide.description}}</p>
            <b-form-input v-model="text" placeholder="I Would like to eat...."></b-form-input>
            <b-button>Search Food</b-button>
        </div>
      </b-carousel-slide>
    </b-carousel>
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
                heading:'ORDER DELIVERY & TAKE OUT',
                description:'Find restaurants, specials, and coupons for free',
                imageURL:'https://picsum.photos/1024/480/?image=52'
            },
            {
                heading:'ORDER DELIVERY & TAKE OUT',
                description:'Find restaurants, specials, and coupons for free',
                imageURL:'https://picsum.photos/1024/480/?image=54'
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
.carousel-caption {
    position: absolute !important;
    top: 40% !important;
    padding-top: 0;
}
.caption-change h1 {
    font-size: 85px;
    letter-spacing: 1px;
    font-family: "H.H. Samuel";
    display: inline-block;
}
.caption-change p {
    font-family: "Roboto";
    font-size: 30px;
    line-height: 32px;
    font-weight: normal;
    display: inline-block;
    margin-bottom: 28px;
}
.form-control{
    line-height: 32px;
    font-size: 27px;
    display: inline-block;
    width: 360px;
    height: 50px;
    font-family: "Roboto";
    font-weight: normal;
}
button.btn {
    font-family: "Roboto";
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
    padding: 8px 28px;
    margin: 0 0 0 12px;
    vertical-align: unset;
    color: #ffffff;
    background: #df3e03;
}
</style>
