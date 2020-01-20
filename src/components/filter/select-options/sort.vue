<template>
    <div class="sort">
        <b-dropdown size="sm" :text="text" class="m-2" id="dropdown">
            <b-dropdown-item href="#" class="dropdown-menu-items" v-for="filter in filters" :filter="filters" :key="filter.id" >
                <div class="dropdown-menu-item">
                    <div class="sort">
                        <img :src="filter.imagePath">
                    </div>
                    <div class="sort-hover">
                        <img :src="filter.imageHover">
                    </div>
                </div>
                <div><p>{{filter.filterWith}}</p></div>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:'Sort',
            filters:[
                {
                    id:1,
                    imagePath:'./images/recomd.png',
                    imageHover:'./images/recomd-hover.png',
                    filterWith:'Recomended'
                },
                {
                    id:2,
                    imagePath:'./images/rating.png',
                    imageHover:'./images/rating-hover.png',
                    filterWith:'Rating'
                },
                {
                    id:3,
                    imagePath:'./images/most.png',
                    imageHover:'./images/most-hover.png',
                    filterWith:'Most Popular'
                },
                {
                    id:4,
                    imagePath:'./images/time.png',
                    imageHover:'./images/time-hover.png',
                    filterWith:'Delivery Time'
                }
            ]
        }
    }
}
</script>
<style scoped>
.dropdown-menu-item{
    max-width: 73px;
}
.dropdown-menu-item img{
    width: 100%;
}
.sort{
    display: inline-block;
    max-width: 330px;
    margin-bottom: 20px;
}
.dropdown-menu-items:hover .sort{
    display: none;
}
.sort-hover{
    display: none;
}
.dropdown-menu-items:hover .sort-hover{
    display: block;
}
ul.dropdown-menu {
    min-width: 488px;
}
li.dropdown-menu-items{
    display: inline-block;
    margin: 2px 24px 2px 25px;
}
.dropdown-menu-items p{
    margin: 0;
    font-family: "Panton";
    font-size: 11px;
    font-weight: 600;
    text-align: center;
}
li.dropdown-menu-items a{
    padding: 0 !important;
}

</style>