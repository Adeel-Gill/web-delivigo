<template>
    <div class="filter-section">
        <Sort />
        <food />
    </div>
</template>
<script>
import Sort from './sort';
import Food from './food';
export default {
    components:{
        Sort,
        Food,
    },
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>

</style>