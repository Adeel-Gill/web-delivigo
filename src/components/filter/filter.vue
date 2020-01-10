<template>
  <div>
    <div class="container">
      <banner />
      <select-filter></select-filter>
      <popular />
      <catagories />
      <div class="restaurants-list">
        <h2>{{titleHeading}}</h2>
        <div class="row">
          <new-delivigo></new-delivigo>
        </div>
      </div>
      <div class="restaurants-list">
        <h2>{{titleHeading}}</h2>
        <div class="row">
          <new-delivigo
            v-for="newRestaurant in topThreeNew"
            :key="newRestaurant.id"
            :newRestaurant="newRestaurant"
          ></new-delivigo>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from "./filterBanner.vue";
import Catagories from "./catagories.vue";
import newDelivigo from "./new/newdelivigo.vue";
// import data from './new/newRestaurants.js';
import selectFilter from "./select-options/filterSelect";
import popular from "./popular";
import NewRestaurants from '../../api.services/restaurants';
// import axios from "axios";
export default {
  components: {
    Banner,
    Catagories,
    newDelivigo,
    selectFilter,
    popular
  },
  data() {
    return {
      newRestaurants: [],
      topThreeNew:[],
      titleHeading: "NEW ON DELIVIGO"
    };
  },
  mounted() {
    this.changeHeader();
    this.changeFooter();
  },
  destroyed() {
    this.unChangeHeader();
    this.unChangeFooter();
  },
  created() {
    NewRestaurants.getTopThreeNew().then((response) => {
      console.log(response.data);
      this.topThreeNew = response.data;
    }).catch((error) => {
      console.log(error.response.data);
    });
    NewRestaurants.getAllNewRest().then((response) => {
      console.log(response.data);
      this.newRestaurants = response.data;
    }).catch((error) => {
      console.log(error.response.data);
    });
  },
  methods: {
    changeHeader() {
      this.$eventBus.$emit("checkComponent", "filter");
    },

    unChangeHeader() {
      this.$eventBus.$emit("checkComponent", "default");
    },

    changeFooter() {
      this.$eventBus.$emit("checkFooter", "footer");
    },

    unChangeFooter() {
      this.$eventBus.$emit("checkFooter", "default");
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1045px;
}
.featured-restaurants h2 {
  text-align: center;
  margin: 50px 0;
}
.restaurants-list {
  margin-bottom: 40px;
}
.restaurants-list h2 {
  margin-bottom: 40px;
}
.title h2 {
  text-align: left !important;
}
</style>