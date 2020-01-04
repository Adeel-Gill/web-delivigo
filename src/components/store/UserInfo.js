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
        }
    }
})
