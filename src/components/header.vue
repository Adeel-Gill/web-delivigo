<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="filter-header p-0"
    >
      <div class="container p-0">
        <b-navbar-brand to="/">
          <img class="img-width" src="/images/logo.png" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <div class="mx-auto address-line" v-if="visibleAddress">
            <p class="text-center">{{local.deliverTo}}:&nbsp;<span>{{address}}</span></p>
          </div>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="" id="navbar-dropdown">
            <b-nav-item-dropdown :text="value" right class="pt-1">
              <b-dropdown-item v-for="(item, index) in availLang" :key="index" @click="setLang(item)">{{item}}</b-dropdown-item>
              <!-- <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item> -->
            </b-nav-item-dropdown>
<!--            <div class="d-inline-block buttons">-->
            <b-nav-item to="/profile" v-if="isLogin === true? true: false" class="profile-link">
              <div>
                <img :src="getImage()" @error="getImage('noImage')" class="rounded-circle" height="50" width="50"/>
                <!--                    <img src="//placehold.it/50" />-->
                  </div>
            </b-nav-item>
            <b-nav-item to="/signin" activClass="active" v-if="isLoggedOut === true || isLoggedOut == undefined? true: false" class="singin ">{{local.signin}}</b-nav-item>
            <b-nav-item to="/signup" activClass="active" v-if="isLoggedOut === true || isLoggedOut == undefined? true: false" class="register">{{local.register}}</b-nav-item>
            <b-nav-item  activClass="active" v-if="isLogin === true? true: false" class="register pl-2 pt-1" @click="signOut">{{local.signOut}}</b-nav-item>
<!--            </div>-->
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
  import {lang} from "../components/lang/lang";

  export default {
    data() {
      return {
        isFilter: false,
        isLogin: this.$store.state.isLogin,
        isLoggedOut: this.$store.state.isLoggedOut,
        user: {},
        visibleAddress: false,
        availLang: ["EN", "FN", "ES"],
        value: '',
        address: '',
        image: '',
        local: lang.en,
      }
    },
    methods: {
      ...mapActions([
        'cleanToken'
      ]),
      setLang(val) {
        if(val !== localStorage.getItem("lang")) {
          localStorage.setItem("lang", val);
          this.checkLang();
          console.log("lang", this.local);
          this.$emit("langChange", "");
        }
      },
      checkLang() {
        var temp = localStorage.getItem("lang");
        if(temp == null || temp === "EN") {
          localStorage.setItem("lang", "EN");
          this.local = lang.en;
        } else if(temp === "FN" ) {
          this.local = lang.fn;
          localStorage.setItem("lang", "FN");
        } else {
          this.local = lang.sp;
          localStorage.setItem("lang", "ES");
        }
        this.value = temp;
      },
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
      getStates() {
        console.log("ghere",this.$store.state.isLogin,this.$store.state.isLoggedOut);
        if(localStorage.getItem('isLogin') === 'true') {
          this.isLogin = true;
          this.isLoggedOut = false;
        } else {
          this.isLogin = false;
          this.isLoggedOut = true;
        }
        // this.isLogin = [localStorage.getItem(isLogin) === tr]this.$store.state.isLogin;
        // this.isLoggedOut = this.$store.state.isLoggedOut;
        if(localStorage.getItem('isAddress') === "true") {
          this.visibleAddress = true;
          this.address = localStorage.getItem("localAddress");
        } else {
          this.visibleAddress = false;
        }
        console.log(this.isLogin,this.isLoggedOut);
      },
      getImage(img) {
        img = localStorage.getItem('userProfile');
        console.log("hereInImage",img);
        if(img === '' || img === 'null') {
          return this.image = defaultUserPic;
        } else {
          if(localStorage.getItem("fbLogin") === "true") {
            if(localStorage.getItem("userChanged") === "true") {
                return this.image = baseAddress + img;
            } else {
                return this.image = baseAddress +img;
            }
          } else {
              return this.image =  baseAddress + img;
          }
        }
      },
      signOut() {
        if(localStorage.getItem('cart') === 'null' || localStorage.getItem('cart') == null) {
          this.$store.dispatch('cleanToken');
          this.$store.dispatch('clearCart');
          this.showNotification('success','Success','Sign out successfully');
          var num =Number(localStorage.getItem("changeCount"));
          console.log("num",num);
          num += 1;
          console.log(num);
          this.isLogin = false;
          this.isLoggedOut = true;
          console.log('check',this.isLogin,this.isLoggedOut);
          localStorage.setItem("changeCount", num);
          EventBus.$emit('changeCounter', '');
          this.$router.push('/');
          // this.isLogin = false;
          // this.isLoggedOut = true;
          console.log('check',this.isLogin,this.isLoggedOut);
          this.getStates();
          // this.$forceUpdate();
          // this.$router.go();
        } else {
          this.$dialog.confirm('There are items in cart if you proceed the cart will be clear. Continue?', {
            loader: true
          }).then(dialog => {
            dialog.loading(true);
            this.$store.dispatch('cleanToken');
            this.$store.dispatch('clearCart');
            this.isLogin = false;
             this.isLoggedOut = true;
            this.showNotification('success','Success','Sign out successfully');
            dialog.loading(false);
            dialog.close();
            this.$router.push('/');
            // this.$router.go();
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
    this.getStates();
     this.checkLang();
    this.getImage(',');
   
      console.log('m',this.isLogin === true? true: false,this.isLoggedOut === true? true: false);
      if((this.isLogin == null || this.isLoggedOut == null)) {
        // this.$store.dispatch('cleanToken');
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
        // this.$store.dispatch('cleanToken');
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
    /*height: 65px;*/
    background-repeat: no-repeat;
    background-size: cover;
    /*background-position: center;*/
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
  .img-width{
    width: 135px;
    padding-top: 6px;
    padding-bottom:6px;
  }
  .address-line {
    width: 60%;
  }
  .address-line p{
    color: white;
    font-size: 18px;
    margin-top: 20px;
    padding-left: 100px;
  }
  .address-line p span{
  }
  .navbar-nav{
    margin-left: auto;
  }
@media screen and (max-width: 992px){
  .address-line p{
    padding: 0;
    margin-top: 0;
  }
  .navbar-nav{
    margin: auto;
    display: inline-block;
    padding-bottom: 10px;
    width: 100%;
  }
  .dropdown{
    border-right:unset !important;
  }
  .navbar-nav li{
    display: inline-block;
  }
  .singin a{
    padding: 4px 16px !important;
  }
  .register a{
    padding: 5px 16px !important;
  }
  .dropdown-menu li{
    display: block;
  }
  .singin{
    float: right;
    order: -1;
  }
  .register{
    float: right;
  }
  .profile-link{
    float: right;
  }
  /*.profile-link{*/
  /*  float: right;*/
  /*}*/

}
  /*position: absolute;
  z-index: 100;
  background-color: black;
  top: 76px;
  width: 100%;
  left: 0px;*/
</style>
