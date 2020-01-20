<template>
    <div class="filter-section">
        <Sort />
        <food />
        <price />
    </div>
</template>
<script>
import Sort from './sort';
import Food from './food';
import Price from './price';
export default {
    components:{
        Sort,
        Food,
        Price
    },
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.filter-section {
    padding: 20px 0 60px 0;
    width: 90%;
    margin: auto;
}
</style>