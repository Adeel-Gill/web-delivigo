<template>
  <div>
    <app-loader></app-loader>
    <div class="headerSection">
      <app-header></app-header>
      <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentSection">
        <router-view></router-view>
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
      }
    }
  },
     components:{
        appHeader: Header,
        appFooter: Footer,
        appLoader: Loader,
        vueScrollBar: vueCustomScrollBar
      },
  updated() {
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
