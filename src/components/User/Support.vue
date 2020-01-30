<template>
    <div class="container--fluid">
        <div class="col-12 col-md-9 p-0">
            <div class="head-sec">
                <h1>Hello There</h1>
                <p>Hello there and welcome to DeliviGo support
                    We are here to help!</p>
                <div class="line"></div>
            </div>
            <div class="col-11 col-sm-8 mx-auto p-0">
            <div class="conversation">
                <h2>Start a new conversation</h2>
                <p>Typically replies in 10 mint</p>

                <div class="agent-pic  pl-md-5 pl-1">
                        <div class="circle">
                        </div>
                        <div class="circle move">
                        </div>
                        <div class="circle move2">
                        </div>
                        <div class="circle move3">
                        </div>
                        <div class="circle move4">
                        </div>
                    </div>

                    <div class="buttons w-100">
                        <div class="new my-3">
                            <button class="btn btn-outline-light">New Conversation</button>
                        </div>
                        <div class="prev my-3">
                            <button class="btn text-light">See Previous</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-sec">
                <h1 class="text-light text-center"> Chat Section</h1>
            </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Support"
    }
</script>

<style scoped>
.head-sec{
    background-color: #343d5e;
    color: white;
    padding: 10px 50px 200px 50px;
}
    .conversation{
        background-color: rgba(86,94,255, 0.9);
        border-radius: 10px;
        color: white;
        position: relative;
        top:-140px;
        padding: 10px 20px;
        text-align: center;
    }
    .line{
        border: 1px solid white;
        width: 100%;
    }
    .circle{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid white;
        display: inline-block;
        margin: 10px 0px;
        background-color: rgb(86,94,255);
        position: relative;
    }
    .move{
        left: -15px;
    }
    .move2{
        left: -30px;
    }
    .move3{
        left: -45px;
    }
    .move4{
        left: -60px;
    }
    .new button{
        width: 50%;
        border-radius: 10px;
    }
    .prev button{
        width: 50%;
        border-radius: 10px;
    }
    .prev button:hover{
        border: 1px solid white;
    }
    .chat-sec{
        background-color: #CECECF;
        height: 400px;
        position: relative;
        top: -100px;
    }
    .agent-pic{
        /*margin-right: 30px;*/
        /*float: right;*/
        position: relative;
        right: -20px;
    }
@media (min-width: 960px){
    .col-md-9{
        max-width: 78%;
    }
}
    @media screen and (max-width: 400px) {

    }

</style>
