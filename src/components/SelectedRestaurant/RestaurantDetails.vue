<template>
    <div class="details-restaurant">
        <div class="description-about">
            <div class="resturant-name-review">
                <div class="name-desc">
                    <h4>{{restaurant.Name}}</h4>
                    <p>French/American</p>
                </div>
                <div class="reviews text-right">
                    <a v-b-modal.reviewModal class="links">{{newLang.allReviews}}</a>
                </div>
                <div class="clear"></div>
            </div>
            <div class="restaurnt-address">
                <p><i class="fas fa-map-marker-alt"></i>{{restaurant.FullAddress | truncate2}}</p>
            </div>
            <div class="rating-times">
                <div class="row">
                    <div class="col-3 col-md-3">
                        <div class="rating">
                            <p>
                                <i class="fas fa-star"></i>
                                <span class="pl-1">{{restaurant.Rating}} </span>
                                <span class="light">({{restaurant.ReviewCount}})</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-5 col-md-5">
                        <div class="delivery">
                            <p v-if="freeDelivery === true">
                                <i class="fas fa-euro-sign"></i>
                                {{delivery}}
                            </p><p v-else>
                            <i class="fas fa-euro-sign"></i>
                            {{newLang.noFreeDelivery}}
                        </p>
                        </div>

                    </div>
                    <div class="col-4 col-md-4">
                        <div class="mints">
                            <p>
                                <i class="far fa-clock"></i>
                                {{restaurant.DeliveryTime}} {{newLang.mins}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="reviewModal" scrollable :title="newLang.allReviews" refs="modal" size="lg" hide-footer>
            <div v-if="allReviews.length>0">
                <review v-for="(review,index) in allReviews" :key="index" :review="review"  ></review>
            </div>
            <div class="card mb-2" v-else>
                <div class="card-body py-0">
                    <div class="row">
                        <div class="col-md-10 px-1 text-justify">
                            <div class="clearfix"></div>
                            <p class="card-text">
                                {{newLang.noReviews}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="../../../public/images/user-pic.png" class="card-img rounded-circle" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>-->

        </b-modal>
    </div>
</template>
<script>
    import review from "../Reviews/review";
    export default {
        props: ['newLang'],
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
                freeDelivery: false,
                allReviews: [],

            }
        },
        components: {
            review
        },
        mounted() {
            this.$root.$on('restaurant', response => {
                if(response == null) {
                    this.showNotification('error','Error','No restaurant detail is available to show!');
                } else {
                    this.restaurant = response;
                    this.freeDelivery = this.restaurant.IsDeliveryFree;
                }

            });
            this.$root.$on('reviews', response => {
                this.allReviews = response;
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
                let total = 20;
                if(val.length <= total) {
                    return val
                } else {
                    return val.substring(0, total)+ '...';
                }
            },
            truncate2(val) {
                let total = 26;
                if(val.length <= total) {
                    return val
                } else {
                    return val.substring(0, total)+ '...';
                }
            }
        }
    }
</script>
<style scoped>
    .details-restaurant {
        position: relative;
    }
    /*[data-v-6db8e78f]*/
    .description-about {
        font-family:'Roboto', sans-serif;
        background: #f2f2f2;
        padding: 30px;
        position: absolute;
        width: 100%;
        top: -132px;
        right: 0;
        border-radius: 7px;
    }
    .name-desc {
        font-family:'Roboto', sans-serif;
        float: left;
    }
    .name-desc h4 {
        font-family:'Roboto', sans-serif;
        color: #8ba939;
        font-size: 40px;
        font-weight: 500;
        margin: 0;
    }
    .name-desc p {
        color: #8f8f90;
        font-size: 21px;
        font-family:'Roboto', sans-serif;
        font-weight: 500;
        text-align: left;
        margin: 0;
    }
    .restaurnt-address p {
        text-align: left;
        margin: 0;
        font-family:'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 500;
    }
    .reviews {
        float: right;
        padding: 25px 0;
    }
    .reviews a {
        color: #2125c3 !important;
        font-weight: 500;
        font-size: 20px;
        cursor: pointer;
        font-family:'Roboto', sans-serif;
    }
    .reviews a:hover{
        text-decoration: underline !important;
        color: #6A8623 !important;
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
        font-size: 20px;
        font-weight: 500;
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
        font-size: 20px;
        font-weight: 500;
    }
    i.fas.fa-euro-sign {
        color: #8ba939;
    }
    .mints p {
        margin: 0;
        text-align: right;
        font-size: 20px;
        font-weight: 500;
    }
    i.far.fa-clock {
        color: #8ba939;
    }
    .stars i{
        font-size: 22px;
        padding-left: 5px;
    }
    .image-size{
        width: 70%;
        height: 70%;
    }
    .card-text{
        font-size: 15px;
    }
    .card{
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.4);
    }
    .clear
    {
        clear: both;
    }
    @media screen and (max-width: 960px) and (min-width: 768px){
        .description-about{
            padding: 20px;
        }

        .name-desc h4{
            font-size: 37px;
        }
        .name-desc p{
            font-size: 21px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p {
            font-size: 18px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 19px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:19px ;
        }
        .delivery p{
            font-size: 19px;
        }
        .rating p{
            font-size: 19px;
        }
    }
    @media screen and (max-width: 767px) and (min-width: 561px){
        .description-about{
            top: -142px;
            right: 0;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 36px;
        }
        .name-desc p{
            font-size: 21px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 19px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:19px ;
        }
        .delivery p{
            font-size: 19px;
        }
        .rating p{
            font-size: 19px;
        }
    }
    @media screen and (max-width: 560px) and (min-width: 401px){
        .description-about{
            top: -145px;
            right: 0;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 34px;
        }
        .name-desc p{
            font-size: 20px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 18px;
            padding: 0;
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:18px ;
        }
        .delivery p{
            font-size: 18px;
        }
        .rating p{
            font-size: 18px;
        }

    }
    @media screen and (max-width: 400px){
        .description-about{
            top: -165px;
            right: 0;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 31px;
        }
        .name-desc p{
            font-size: 19px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 17px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:17px ;
        }
        .delivery p{
            font-size: 17px;
        }
        .rating p{
            font-size: 17px;
        }


}

</style>
