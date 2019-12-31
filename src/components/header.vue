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
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" id="navbar-dropdown">
            <b-nav-item-dropdown text="ENG" right class="mt-2">
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/profile" class="profile-link">
              <div>
                <img src="../../public/images/user-pic.png" class="rounded-circle" height="50" width="50"/>
                <!--                    <img src="//placehold.it/50" />-->
                  </div>
            </b-nav-item>
            <b-nav-item to="/signin" activClass="active" class="singin mt-2">Sign In</b-nav-item>
            <b-nav-item to="/signup" activClass="active" class="register mt-2">Register</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isFilter:false,
          user: {}
        }
    },
  mounted() {

  },
    created() {
        this.isFilter = false;
        this.$eventBus.$on('checkComponent', (data) => {
      // do something with the data
      if(data === 'filter') {
          this.isFilter = true;
      } else if(data === 'selected'){
          this.isFilter = true;
      } else {
          this.isFilter = false;
      }
    });
    },
}
</script>
<style scoped>
  .bg-info {
    background-color: black !important;
  }
  .filter-header {
    background-image: url(/images/topbar-bg.png);
    border: none;
    width: 100%;
    height: 65px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .filter-header div#nav-collapse li.nav-item.singin a.nav-link {
    border: 2px solid transparent
  }
  .profile-link a{
    padding: 0;
    margin-left:5px ;
  }
  a.nav-link{
    color: #ffffff !important;
  }
</style>
