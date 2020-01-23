import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const UserInfo = new Vuex.Store({
    state: {
        isLogin: false,
        isLoggedOut: true,
        TOKEN: '',
        stripeKeys: [],
        userData: {},
        cartData: [],
        mapData: [],
        addressId: null,
    },
    getters: {
      getLogin: state => {
          console.log('isLogin',localStorage.getItem('isLogin'));
          if(localStorage.getItem('isLogin') !== 'undefined') {
              console.log('insideIsLoginCondition');
              return localStorage.getItem('isLogin');
          } else {
              return state.isLogin;
          }
      },
        getCart: state => {
          return state.cartData;
        },
        getLoggedOut: state => {
            console.log('isLoggedOut',localStorage.getItem('isLoggedOut'));
          if(localStorage.getItem('isLoggedOut') !== 'undefined') {
              console.log('insideIsLoggedOutCondition');
              return localStorage.getItem('isLoggedOut');
          } else {
              return state.isLoggedOut;
          }
        }
    },
    mutations: {
        storeToken: (state, payload) => {
            state.TOKEN = payload.AuthToken;
            state.userData = payload;
            state.isLogin = true;
            state.isLoggedOut = false;
            localStorage.setItem('token', state.TOKEN);
            localStorage.setItem('isLogin', state.isLogin);
            localStorage.setItem('id', payload.Id);
            localStorage.setItem('isLoggedOut', state.isLoggedOut);
            localStorage.setItem('creationCounter', '0');
        },
        saveInCart: (state, payload) => {
            console.log('storeCart',payload);
            console.log('beforeCart',state.cartData);
            state.cartData.push(payload);
            console.log('afterSaveCart',state.cartData);
            localStorage.setItem('cart',JSON.stringify(state.cartData));
        },
        setCart: (state, payload) => {
          state.cartData = payload;
          console.log('cart',state.cartData)
        },
        saveMapData: (state, payload) => {
            state.mapData =  payload;
        },
        setAddressID: (state, payload) => {
          state.addressId = payload;
        },
        clearCart: (state) => {
          state.cartData = [];
          localStorage.setItem('cart',null);
        },
        isLogin: state => {
            state.isLogin = true;
            state.isLoggedOut = false;
            localStorage.setItem('isLogin', state.isLogin);
            localStorage.setItem('isLoggedOut', state.isLoggedOut);
        },
        cleanToken: state => {
            state.TOKEN = null;
            state.stripeKeys = [];
            state.userData= null;
            state.isLogin = false;
            state.isLoggedOut = true;
            localStorage.setItem('token', state.TOKEN);
            localStorage.setItem('isLogin', state.isLogin);
            localStorage.setItem('isLoggedOut',state.isLoggedOut);
            localStorage.setItem('id', null);
            localStorage.setItem('creationCounter', '0');
        }
    },
    actions: {
        storeToken: ({commit}, payload, user) => {
            commit('storeToken', payload,user);
        // checkToken: ({commit, state}) => {
        //     if(state.token === '') {
        //
        //     }
        },
        cleanToken: ({commit}) => {
            commit('cleanToken')
        },
        saveInCart: ({commit}, payload) => {
            commit('saveInCart',payload);
        },
        setCart: ({commit}, payload) => {
          commit('setCart', payload);
        },
        saveMapData: ({commit}, payload) => {
            commit('saveMapData', payload);
        },
        setAddressID: ({commit}, payload) => {
            console.log('idAddress',payload);
            commit('setAddressID',payload);
        },
        clearCart: ({commit}) => {
            commit('clearCart');
        }
    }
})
