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

export default {
  data() {
    return {
      loader: false,
    }
  },
     components:{
        appHeader: Header,
        appFooter: Footer,
        appLoader: Loader,
      },
  updated() {
       EventBus.$on('StartOverlay', response => {
         this.loader = response;
       })
  }
}
</script>
<style scoped>

</style>
