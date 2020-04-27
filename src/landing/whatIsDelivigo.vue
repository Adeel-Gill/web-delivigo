<template>
    <div class="section">
        <div class="container">
            <div class="card">
        <div class="row m-0">
            <div class="col-md-4 col-12 text-justify" style="padding:105px 50px 50px 50px;">
                <h1>{{newLang.whatIs}}&nbsp;DeliviGo?</h1> <br>
                <p>{{newLang.delivigoDetail}}</p>
            </div>
            <div class="col-md-8 col-12 py-5 pr-md-5 pl-md-0">
                <video src="/images/delivigo_promotional_video_lr.mp4" poster="/images/video-poster.png" controls muted></video>
            </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "whatIsDelivigo",
        props: ['newLang']
    }
</script>

<style scoped>
.section{
    background-image: linear-gradient(#fff, #f8f8f8,#EEEEEE);
    /*background-position: 0 0, 0 50%;*/
    /*background-size: 100% 50%, 100%, 50%;*/
    background-repeat:no-repeat;
    /*height: 730px;*/
    padding: 50px 0;
}
    video{
        width: 100%;
        height: 100%;
        border-radius: 14px 14px 5px 5px;
        border: none;
    }
    .card{
        box-shadow: 0 0 54px 0 rgba(32,33,37,0.06);
        border: none;
        /*padding: 30px 30px;*/
        border-radius: 5px;
        color: #080808;
    }
    .card h1{
        font-size: 36px;
        font-weight: 500;
    }
    .card p{
        font-size: 18px;
    }
</style>
