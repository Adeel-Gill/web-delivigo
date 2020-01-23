<template>
    <div class="details-restaurant">
        <div class="description-about">
            <div class="resturant-name-review">
                <div class="name-desc">
                    <h4>{{restaurant.Name}}</h4>
                    <p>{{restaurant.FullAddress | truncate}}</p>
                </div>
                <div class="reviews">
                    <a href="#">All Reviews</a>
                </div>
                <div class="clear"></div>
            </div>
            <div class="restaurnt-address">
                <p><i class="fas fa-map-marker-alt"></i>{{restaurant.FullAddress | truncate}}</p>
            </div>
            <div class="rating-times">
                <div class="row">
                    <div class="col-lg-4 col-md-4">
                        <div class="rating">
                            <p>
                                <i class="fas fa-star"></i>
                                <span>{{restaurant.Rating}} </span>
                                <span class="light">{{restaurant.ReviewCount}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="delivery">
                            <p v-if="freeDelivery === true">
                                <i class="fas fa-euro-sign"></i>
                                {{delivery}}
                            </p><p v-else>
                                <i class="fas fa-euro-sign"></i>
                                No Free Delivery!
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="mints">
                            <p>
                                <i class="far fa-clock"></i>
                                {{restaurant.DeliveryTime}} Mins
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            restaurant: {},
            name:'Jean-Georges',
            subHeading: 'French/New American',
            reviews:'All reviews',
            address:'8832 Adah Vista South Guido',
            rating:'4.8',
            ratingLight:'(127)',
            delivery:'Free delivery',
            timeing:'35-45 Mins',
            freeDelivery: false
        }
    },
    mounted() {
        this.$root.$on('restaurant', response => {
            if(response == null) {
                this.showNotification('error','Error','No restaurant detail is available to show!');
            } else {
                this.restaurant = response;
                this.freeDelivery = this.restaurant.IsDeliveryFree;
            }

        })
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
    filters: {
        truncate(val) {
            let length = 26;
            if(val.length <= length) {
                return val
            } else {
                return val.substring(0, length)+ '...';
            }
        }
    }
}
</script>
<style scoped>
.details-restaurant {
    position: relative;
}
.description-about[data-v-6db8e78f] {
    background: #f2f2f2;
    padding: 30px;
    position: absolute;
    width: 100%;
    top: -132px;
    right: -80px;
}
.name-desc {
    float: left;
}
.name-desc h4 {
    color: #8ba939;
    font-family: "Roboto";
    font-size: 40px;
    font-weight: 600;
    margin: 0;
}
.name-desc p {
    color: #8f8f90;
    font-size: 23px;
    font-family: "Roboto";
    font-weight: 600;
    text-align: left;
    margin: 0;
}
.restaurnt-address p {
    text-align: left;
    margin: 0;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 600;
}
.reviews {
    float: right;
    padding: 25px 0;
}
.reviews a {
    color: #2125c3;
    font-family: "Roboto";
    font-weight: 600;
    font-size: 20px;
}
.restaurnt-address{
    margin: 30px 0;
}
i.fas.fa-map-marker-alt {
    padding: 0 7px 0 0px;
}
.rating p {
    margin: 0;
    text-align: left;
    font-family: "Roboto";
    font-size: 22px;
    font-weight: 600;
}
i.fas.fa-star {
    color: #8ba939;
}
.light{
    color: #8f8f90;
    font-weight: normal;
}
.delivery p {
    margin: 0;
    text-align: left;
    font-family: "Roboto";
    font-size: 20px;
    font-weight: 600;
}
i.fas.fa-euro-sign {
    color: #8ba939;
}
.mints p {
    margin: 0;
    text-align: right;
    font-family: "Roboto";
    font-size: 20px;
    font-weight: 600;
}
i.far.fa-clock {
    color: #8ba939;
}

@media screen and (max-width: 960px) and (min-width: 761px){

}
@media screen and (max-width: 760px) and (min-width: 561px){

}
@media screen and (max-width: 560px) and (min-width: 401px){

}
@media screen and (max-width: 400px){

}
</style>
