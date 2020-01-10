<template>
<div class="register-form">
  <div class="container">
    <form  @click.stop.prevent="submitted">
      <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-3"></div>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Signup</h1>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" class="form-control" v-model="userData.firstName" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" class="form-control" v-model="userData.lastName" required>
          </div>
          <div class="form-group">
            <label for="lastName">User Name</label>
            <input type="text" id="userName" class="form-control" v-model="userData.userName" required>
          </div>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="text" id="email" class="form-control" v-model="userData.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="userData.password" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-3"></div>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button class="btn btn-primary" >Submit!
          </button>
        </div>
      </div>
    </form>
    <div class="row" v-if="isSubmitted">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Your Data</h4>
          </div>
          <div class="panel-body">
            <p>Full Name: {{ userData.firstName }} {{ userData.lastName }}</p>
            <p>User Name: {{ userData.userName }}</p>
            <p>Mail: {{ userData.email }}</p>
            <p>Password: {{ userData.password }}</p>
            <p>Store in Database?: {{ storeData }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
      <p>{{ userData.info }}</p>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        userName:'',
        email: '',
        password: '',
        info: null
      },
      storeData: 'Yes',
      isSubmitted: false
    }
  },
  methods: {
    submitted() {
      console.log(this.userData)
        this.isSubmitted = true;
      
    }
  }, 
}
</script>
<style scoped>
.register-form{
    background-image: url("/images/slide2.png");
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
}
.register-form h1{
    margin: 0 0 20px 0;
}
.register-form form{
    padding: 20px 0;
}
</style>