<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="text-center">
                    <h3>Select Your Address</h3>
                    <p class="text-muted">Drag the Pointer to Your Delivery Location</p>
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
                    <div class="col-md-6 p-0 dot text-center">
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                    <i class="fas fa-circle"></i>
                        <div>
                            <h6>Will be delivered within</h6>
                            <h6>10-15 min</h6>
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
                <h1>Cutlery</h1>
                <p>Help us to reduce plastic waste - only request
                    cutlery when you really need it.
                </p>
                <p>How do you want the food ?</p>
<!--                <button class="btn btn-primary"><i class="fas fa-motorcycle"></i> Delivery</button>-->
<!--                <span>~ $30</span>-->
<!--                <p>Your food will be deliverd as per the saved-->
<!--                    home address</p>-->
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
            </div>
        </div>
    </div>
</template>

                                <script>
                                    export default {
                                        name: "checkout"
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
                                    .map-marker{
                                        font-size: 18px;
                                        color: #C2C2C3;
                                    }
                                </style>
