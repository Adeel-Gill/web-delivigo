<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      v-bind:class="[isFilter? 'filter-header': 'bg-info']"
    >
      <div class="container">
        <b-navbar-brand to="/">
          <img class="img-width" src="/images/logo.png" />
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" id="navbar-dropdown">
          <b-nav-item-dropdown text="ENG" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/login" activClass="active" class="singin">Sign In</b-nav-item>
          <b-nav-item to="/register" activClass="active" class="register">Register</b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>
<style scoped>
.bg-info {
  background-color: black !important;
}
.filter-header[data-v-29e8c3c6] {
    background-image: url(/images/topbar-bg.png);
    border: none;
    width: 100%;
    height: 65px;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>

<script>
export default {
    data() {
        return {
            isFilter:false
    }
    },
    created() {
        this.isFilter = false;
        this.$eventBus.$on('checkComponent', (data) => {
      // do something with the data
      if(data === 'filter') {
          this.isFilter = true;
      } else if(data === 'default'){
          this.isFilter = false;
      } else {
          this.isFilter = false;
      }
    });
    },
}
</script>