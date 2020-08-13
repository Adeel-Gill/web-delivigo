<template>
  <div>
    <notifications group="foo" position="bottom right"></notifications>
    <app-loader></app-loader>
    <div class="headerSection">
      <app-header :key='changeCount' @langChange = "changeLang"></app-header>
      <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentSection">
        <router-view @changeCounter="updateCount" @homeChange="updateCount" :lang = "getLang"></router-view>
      </div>
    </div>

    <div class="footer">
      <app-footer :key="newCount"></app-footer>
    </div>
  </div>
</template>
<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
import Loader from "./components/Loader/Loader";
import {EventBus} from "./main";
import {lang} from "./components/lang/lang";
import vueCustomScrollBar from 'vue-custom-scrollbar';
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
export default {
  data() {
    return {
      loader: false,
      local: null,
      settings: {
        maxScrollbarLength: 60
      },
      changeCount: 0,
      newCount: 0,
    }
  },
  methods: {
    getLang() {
      var temp = localStorage.getItem("lang");
        if(temp == null || temp === "EN") {
          localStorage.setItem("lang", "EN");
          this.local = lang.en;
        } else if(temp === "FN" ) {
          this.local = lang.fn;
          localStorage.setItem("lang", "FN");
        } else {
          this.local = lang.sp;
          localStorage.setItem("lang", "ES");
        }
        return this.local;
    },
    updateCount(n) {
      console.log("inParent");
      var num =Number(localStorage.getItem("changeCount"));
          console.log("numP",num);
          num += 1;
          console.log(num);
          this.changeCount = num;
          localStorage.setItem("changeCount", num);
          EventBus.$on("homeChange", () => {
            localStorage.setItem("isAddress", "false");
              this.$emit("changeCounter",0);
          })
    },
    changeLang() {
      console.log("langChangeCalled");
      EventBus.$emit("changeLang", "");
      this.newCount+=1;
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
