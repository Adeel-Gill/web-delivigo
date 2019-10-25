<template>
    <div>
        <div class="container">
        <banner />
        <catagories />
        </div>
    </div>
</template>
<script>
import Banner from './filterBanner.vue';
import Catagories from './catagories.vue';
export default {
    components:{
        Banner,
        Catagories
    },
    mounted() {
      this.changeHeader();
    },
    destroyed() {
        this.unChangeHeader();
    },
    methods: {
            changeHeader() {
      this.$eventBus.$emit('checkComponent', 'filter');
    },
    unChangeHeader() {
      this.$eventBus.$emit('checkComponent', 'default');
    }
    }
}
</script>
<style scoped>
.container{
    max-width: 1045px;
}
</style>