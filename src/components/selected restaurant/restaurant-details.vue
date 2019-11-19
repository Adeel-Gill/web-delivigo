<template>
    <div class="details-restaurant">
        <div class="description-about">
            <div class="resturant-name-review">
                <div class="name-desc">
                    <h4>{{name}}</h4>
                    <p>{{subHeading}}</p>
                </div>
                <div class="reviews">
                    <a href="#">{{reviews}}</a>
                </div>
                <div class="clear"></div>
            </div>
            <div class="restaurnt-address">
                <p><i class="fas fa-map-marker-alt"></i>{{address}}</p>
            </div>
            <div class="rating-times">
                <div class="row">
                    <div class="col-lg-4 col-md-4">
                        <div class="rating">
                            <p>
                                <i class="fas fa-star"></i>
                                <span>{{rating}} </span>
                                <span class="light">{{ratingLight}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="delivery">
                            <p>
                                <i class="fas fa-euro-sign"></i>
                                {{delivery}}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="mints">
                            <p>
                                <i class="far fa-clock"></i>
                                {{timeing}}
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
            name:'Jean-Georges',
            subHeading: 'French/New American',
            reviews:'All reviews',
            address:'8832 Adah Vista South Guido',
            rating:'4.8',
            ratingLight:'(127)',
            delivery:'Free delivery',
            timeing:'35-45 Mins'
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
    top: -40px;
    right: -60px;
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
</style>