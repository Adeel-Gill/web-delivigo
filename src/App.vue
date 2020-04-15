<template>
  <div>
    <notifications group="foo" position="bottom right"></notifications>
    <app-loader></app-loader>
    <div class="headerSection">
      <app-header :key='changeCount' ></app-header>
      <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentSection">
        <router-view @changeCounter="updateCount"></router-view>
      </div>
    </div>

    <div class="footer">
      <app-footer></app-footer>
    </div>
  </div>
</template>
<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
import Loader from "./components/Loader/Loader";
import {EventBus} from "./main";
import vueCustomScrollBar from 'vue-custom-scrollbar';

export default {
  data() {
    return {
      loader: false,
      settings: {
        maxScrollbarLength: 60
      },
      changeCount: 0,
    }
  },
  methods: {
    updateCount(n) {
      console.log("inParent");
      var num =Number(localStorage.getItem("changeCount"));
          console.log("numP",num);
          num += 1;
          console.log(num);
          this.changeCount = num;
          localStorage.setItem("changeCount", num);
    }
  },
     components:{
        appHeader: Header,
        appFooter: Footer,
        appLoader: Loader,
        vueScrollBar: vueCustomScrollBar
      },
  updated() {
    // this.$on("changeCounter", response => {
    //   console.log("eventEmitted:: ", resposne);
    // })
    // this.changeCount = Number(localStorage.getItem("changeCount"))
    // EventBus.$on("changeTheCounter", response => {
    //   console.log("eventEmitted",response);
    //   this.updateCount(response);
    // })
       EventBus.$on('StartOverlay', response => {
         this.loader = response;
       })
  }
}
</script>
<style scoped>
  .scroll-area {
    position: relative;
    margin: auto;
    width: fit-content;
    height: fit-content;
  }
  .noScroll::-webkit-scrollbar {
    display: none !important;
    overflow: hidden;
  }
  /* Hide scrollbar for IE and Edge */
  .noScroll {
    overflow-y:visible;
    -ms-overflow-style: none !important;
  }
</style>
