import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const UserInfo = new Vuex.Store({
    state: {
        isLogin: false,
        TOKEN: '',
        stripeKeys: [],
        userData: null,
    },
    mutations: {
        storeToken: (state, payload, user) => {
            state.TOKEN = payload;
            state.userData = user;
            state.isLogin = true;
            localStorage.setItem('token', state.TOKEN);
            localStorage.setItem('isLogin', state.isLogin);
        },
        cleanToken: state => {
            state.TOKEN = null;
            state.stripeKeys = [];
            state.userData= null;
            state.isLogin = false;
            localStorage.setItem('token', state.TOKEN);
            localStorage.setItem('isLogin', state.isLogin);
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
