import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const UserInfo = new Vuex.Store({
    state: {
        isLogin: false,
        TOKEN: '',
        stripeKeys: [],
        userData: {},
    },
    mutations: {
        storeToken: (state, payload) => {
            state.TOKEN = payload.AuthToken;
            state.userData = payload;
            state.isLogin = true;
            localStorage.setItem('token', state.TOKEN);
            localStorage.setItem('isLogin', state.isLogin);
            localStorage.setItem('id', payload.Id);
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
