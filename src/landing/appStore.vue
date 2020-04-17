<template>
    <div class="container-fluid p-0">
        <div class="app-image">
            <div class="img-text">
            <h3>Have you got the app?</h3>
            <p>Get yours now - available on the iOS and Android app stores!</p>
                <div class="store-image">
                    <a href="#" class="mr-3"><img src="/images/mobileApp.png" /></a>
                    <a href="#"><img src="/images/iphoneApp.png" /></a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "appStore"
    }
</script>

<style scoped>
.app-image{
    background-image: url("/images/download-app.jpg");
    height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
}
.img-text{
    max-width: 457px;
    width: 42%;
    margin-left: 50px;
}
    .img-text h3{
        font-weight: 500;
        font-size: 46px;
        color: white;
        margin-bottom: 5px;
    }
    .img-text p{
        color: white;
        font-size: 18px;
        font-weight: normal;
    }
.store-image{
    text-align: center;
    margin: auto;
}
    @media screen and (max-width: 768px) {
        .app-image{
            /*background-color: rgba(33,32,37,0.9);*/
            justify-content: center;
            background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/images/download-app.jpg);
        }
        .img-text{
            width: 90%;
            margin-left: auto;
            margin-right: auto;
        }

    }
    @media screen and (max-width: 568px) {
        .img-text h3{
         font-size: 41px;
        }
        .app-image{
            height: 450px;
        }
    }
    @media screen and (max-width: 425px) {
        .img-text h3{
            font-size: 38px;
        }
        .app-image{
            height: 400px;
        }
    }
</style>