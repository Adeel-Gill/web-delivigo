<template>
    <div class="container-fluid">
        <div class="row mb-5">
            <div class="col-md-6">
                <div class="text-center mb-5">
                    <h3>Track You Location</h3>
<!--                    <p class="text-muted">Drag the Pointer to Your Delivery Location</p>-->
                </div>
                <div class="w-100">
                    <img src="../../../public/images/map.png" class="img-fluid" alt="map image">
                </div>
                <div class="row mx-auto map-add mt-4">
                    <div class="col-md-3 p-0">
                        <div><img src="../../../public/images/green-radio.png" class="float-right" alt="gRadio"></div>
                        <div class="text-right d-block" style="clear: right;">
                            <div class="col-3 float-right p-0 mt-2">
                                <i class="fas fa-map-marker-alt map-marker pr-2"></i>
                            </div>
                            <div class="col-9 p-0 mt-2">
                                <h6>Velly Kitchen</h6>
                                <p class="text-muted">92 E Broadway, New York, NY 10002, USA</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 p-0 text-center">
                        <div v-for="index in 12" :key="index">
                            <i class="fas fa-circle" :class="[index%2===0? 'dot': 'greenDot']">{{index}}</i>
                        </div>
                        <div>
                            <h6>Will be delivered within</h6>
                            <h6 class="text-primary">10-15 min</h6>
                        </div>
                    </div>
                    <div class="col-md-3 p-0">
                        <div><img src="../../../public/images/blue-radio.png" alt="gRadio"></div>
                        <div class="text-left row">
                            <div class="col-3 p-0 mt-2">
                                <i class="fas fa-map-marker-alt map-marker pl-4"></i>
                            </div>
                            <div class="col-9 p-0 mt-2">
                                <h6>Velly Kitchen</h6>
                                <p class="text-muted">92 E Broadway, New York, NY 10002, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="info-sec">
                    <div class="top-icon">
                        <i class="fas fa-check-circle"></i>
                        <h6>Order Placed</h6>
                    </div>
                    <div class="toggle-button">
                    <div class="toggle-icon active">
                        <i class="fab fa-hotjar"></i>
                        <p>Cooking</p>
                    </div>
                    <div class="toggle-icon">
                        <i class="fas fa-motorcycle"></i>
                        <p>Out For Delivery</p>
                    </div>
                    <div class="toggle-icon">
                        <i class="fas fa-check-circle"></i>
                        <p>Delivered</p>
                    </div>
                </div>
                    <div class="toggle-text">
                        <p>Order is in the kitchen, cooking on the flames,
                            will be out for delivery as soon as it is ready</p>
                    </div>
                    <div class="down-btn">
                    <button type="button" class="btn btn-primary"><i class="fas fa-file-download"></i> Download Recipt</button>
                    </div>
                    <div class="down-btn">
                    <button type="button" class="btn btn-outline-primary"><i class="far fa-life-ring"></i> Customer Support</button>
                    </div>
                </div>
            </div>
            <!--<div class="col-md-6">
                <h1>Cutlery</h1>
                <p>Help us to reduce plastic waste - only request
                    cutlery when you really need it.
                </p>
                <p>How do you want the food ?</p>
                &lt;!&ndash;                <button class="btn btn-primary"><i class="fas fa-motorcycle"></i> Delivery</button>&ndash;&gt;
                &lt;!&ndash;                <span>~ $30</span>&ndash;&gt;
                &lt;!&ndash;                <p>Your food will be deliverd as per the saved&ndash;&gt;
                &lt;!&ndash;                    home address</p>&ndash;&gt;
                <div class="card-deck text-center">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-motorcycle"></i> Delivery</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">~ 30 Min</h5>
                            <p class="card-text">Your food will be deliverd as per the saved home address</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary">Grab it</button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-shopping-bag"></i> PickUp</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">~ 10 Min</h5>
                            <p class="card-text">We will be happy to be in service for your
                                pick up.</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary">Grab it</button>
                        </div>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</template>


<script>
    export default {
        name: "OrderTracking",
        mounted() {
            console.log('here');
            console.log('trackID',this.$route.params.id);
        }
    }
</script>

<style scoped>
    .map-add img{
        width: 30px;
        height: 30px;
    }
    .dot i{
        font-size: 8px;
        color: #C2C2C3;
        margin: 0 9px;
    }
    .greenDot i{
        font-size: 8px;
        color: #39b54a;
        margin: 0 9px;
    }
    .map-marker{
        font-size: 18px;
        color: #C2C2C3;
    }
    .info-sec{
        text-align: center;
        position: relative;
        top: 8%;
    }
    .top-icon i{
        font-size: 90px;
        color: #39b54a;
        margin-bottom: 20px;
    }
    .top-icon h6{
        font-size: 28px;
    }
    .toggle-icon{
        display: inline-block;
        margin: 50px 40px 20px;
        color: #8f8f90;
    }
    .toggle-icon i{
        font-size: 52px;
    }
    .toggle-icon p{
        font-size: 22px;
    }
    .toggle-button .active{
        color: #5860ff;
    }
    .toggle-text{
        width: 85%;
        margin: 20px auto;
        font-size: 27px;
    }
    .down-btn{
        margin-top: 30px;
    }
    .down-btn button{
        font-size: 22px;
        line-height: 30px;
    }
</style>
