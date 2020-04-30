<template>
    <div class="container py-5">
        <div class="opp-image">
            <img src="/images/oops.png" class="img-fluid" alt="Opps no resturant found">
        </div>
        <div class="opp-text">
            <h6>No restaurants available</h6>
            <p>Sorry, we don't deliver to the current area yet, but we are continually extending our spot. Maybe you'll be able to use our service meanwhile from a distinct location.</p>
            <button class="btn btn-other mt-3">Try Another Location</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "newError"
}
</script>
<style scoped>
    .container{
        /*height: 500px;*/
    }
.opp-image{
    text-align: center;
    max-width: 30%;
    margin: auto;
    height: 300px;
}
.opp-image img{
    width: 100%;
    height: 100%;
}
.opp-text{
    text-align: center;
    width: 70%;
    margin: auto;
    padding-top: 20px;
}
.opp-text h6{
    color: black;
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
}
.opp-text p{
    font-size: 18px;
    font-weight: normal;
}
    .btn-other{
        background-color:#5860ff ;
        color: white;
        border-radius: 30px;
        padding: 7px 30px;
        font-size: 18px;
    }
    .btn-other:hover{
        color: white;
        background-color: #0056b3
    }
</style>