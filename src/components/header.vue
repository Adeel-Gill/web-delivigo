<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="filter-header"
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
            <b-nav-item to="/profile" v-if="isLogin === 'true'? true: false" class="profile-link">
              <div>
                <img :src="getImage()" @error="getImage('noImage')" class="rounded-circle" height="50" width="50"/>
                <!--                    <img src="//placehold.it/50" />-->
                  </div>
            </b-nav-item>
            <b-nav-item to="/signin" activClass="active" v-if="isLoggedOut === 'true' || isLoggedOut == undefined? true: false" class="singin mt-2">Sign In</b-nav-item>
            <b-nav-item to="/signup" activClass="active" v-if="isLoggedOut === 'true' || isLoggedOut == undefined? true: false" class="register mt-2">Register</b-nav-item>
            <b-nav-item  activClass="active" v-if="isLogin === 'true'? true: false" class="register mt-2" @click="signOut">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  import {EventBus} from "../main";
  import {mapActions} from "vuex";
  import {mapGetters} from "vuex";
  import {baseAddress} from "../main";
  import {defaultUserPic} from "../main";

  export default {
    data() {
      return {
        isFilter: false,
        isLogin: this.$store.getters.getLogin,
        isLoggedOut: this.$store.getters.getLoggedOut,
        user: {},
        image: ''
      }
    },
    methods: {
      ...mapActions([
        'cleanToken'
      ]),
      checkIsLogin() {
        if (this.$store.state.isLogin !== '' || (localStorage.getItem('isLogin') !== false)) {
          console.log('state', this.$store.state.isLogin);
          this.isLogin = this.$store.state.isLogin;
        } else {
          this.isLogin = false;
        }
        // this.$forceUpdate();
        EventBus.$on('userImage', responce => {
          if (!responce) {
            this.image = responce;
          }
        })
      },
      getImage(img) {
        img = localStorage.getItem('userProfile')
        if(img === '' || img === 'null') {
          return this.image = defaultUserPic;
        } else {
          return this.image =  baseAddress + img;
        }
      },
      signOut() {
        if(localStorage.getItem('cart') === 'null' || localStorage.getItem('cart') == null) {
          this.$store.dispatch('cleanToken');
          this.$store.dispatch('clearCart');
          this.showNotification('success','Success','Sign out successfully');
          this.$router.go();
        } else {
          this.$dialog.confirm('There are items in cart if you proceed the cart will be clear. Continue?', {
            loader: true
          }).then(dialog => {
            dialog.loading(true);
            this.$store.dispatch('cleanToken');
            this.$store.dispatch('clearCart');
            this.showNotification('success','Success','Sign out successfully');
            dialog.loading(false);
            dialog.close();
            this.$router.go();
          }).catch(() => {
            this.showNotification('info','Info','Signout cancelled');
          })
        }

      },
      showNotification(type, title, message) {
        this.$notify({
          group: 'foo',
          type: type,
          title: title,
          text: message,
          duration: 2000,

        })
      }
    },
  mounted() {
      console.log('m',this.isLogin === 'true'? true: false,this.isLoggedOut === 'true'? true: false);
      if((this.isLogin == null || this.isLoggedOut == null)) {
        this.$store.dispatch('cleanToken');
        // this.$router.go();
      }

    // this.isLogin=localStorage.getItem('isLogin');
  },
  updated() {
    console.log('u',localStorage.getItem('isLogin'),localStorage.getItem('token'));
    console.log(localStorage.getItem('isLogin'));
  },
    computed: {
      ...mapGetters([
               'getLogin',
              'getLoggedOut'
      ])
    },
    created() {
        this.isFilter = false;
      console.log('c',this.isLogin,this.isLoggedOut);
      console.log(localStorage.getItem('isLogin'));
      if((this.isLogin == null || this.isLoggedOut == null)) {
        this.$store.dispatch('cleanToken');
      }
      // this.isLogin=localStorage.getItem('isLogin');
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
    border: 2px solid transparent;
  }
  .profile-link a{
    padding: 0;
    margin-left:5px ;
  }
  a.nav-link{
    color: #ffffff !important;
  }
</style>
