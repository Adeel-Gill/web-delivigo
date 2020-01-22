<template>
    <div class="popular-dishes">
        <h5>{{favrtDishes}}</h5>
        <ul>
            <li v-for="dish in dishes.slice(0,2)" :key="dish" >
                {{dish.Name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            favrtDishes:'Popular',
            dishes:[],
            count: 0,
        }
    },
    methods: {
        showNotification(type, title, message) {
            this.$notify({
                group: 'foo',
                type: type,
                title: title,
                text: message,
                duration: 2000
            })
        }
    },
    mounted() {
        this.$root.$on('popularFood', response => {
            if(response.length>0) {
                this.dishes = response;
            } else {
                if(this.count === 0) {
                    console.log('popularFoodNotification');
                    this.showNotification('error','Error','No popular food is available to show!');
                    this.count++;
                } else {
                    this.count++;
                }
            }
        })
    }
}
</script>
<style scoped>

.popular-dishes {
    text-align: left;
    background: #f2f2f2;
    margin: 50px 15px -20px 0px;
    padding: 15px 0 15px 35px;
}
.popular-dishes h5 {
    font-family: "Roboto";
    font-size: 30px;
    font-weight: 500;
    color: black;
    position: relative;
    padding-bottom: 15px;
}
.popular-dishes h5::after {
    content: '';
    width: 91%;
    height: 2px;
    background: black;
    position: absolute;
    bottom: 0;
    left: -35px;
}
.popular-dishes ul {
    padding: 0;
}
.popular-dishes ul li {
    list-style: none;
    padding: 7px 0px;
    font-family: "Roboto";
    font-size: 27px;
    font-weight: 500;
    color: black;
}

</style>
