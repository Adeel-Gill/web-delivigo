<template>
  <div>
    <div class="headerSection">
      <app-header></app-header>
      <div class="clear"></div>
    </div>
    <div class="parrallelx">
      <div class="contentSection container">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <app-footer></app-footer>
    </div>
    <!-- <h1>App Component</h1> -->
  </div>
</template>
<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
export default {
     components:{
        appHeader: Header,
        appFooter: Footer
      }
    }
</script>
<style scoped>

</style>