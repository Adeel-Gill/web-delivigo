<template>
    <div class="filter-section">
        <div class="row">
        <div class="col-12 col-sm-4">
            <Sort />
        </div>
        <div class="col-12 col-sm-4">
            <food />
        </div>
        <div class="col-12 col-sm-4">
            <price />
        </div>
        </div>
    </div>
</template>
<script>
import Sort from './sort';
import Food from './food';
import Price from './price';
import DiamondAward from "../../User/DiamondAward";
export default {
    components:{
        DiamondAward,
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