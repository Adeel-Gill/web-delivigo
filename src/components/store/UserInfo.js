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
        quantity: 1,
        totalPrice: 0,
        tempPrice: 0,
        newCustomOptions: [],
        newAddOnIds: [],
        newScales: [],
        addOnIds: [],
        dishPrice: 0,
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
        getTotalPrice: state => {
          return state.totalPrice;
        },
        getQuantity: state => {
          return state.quantity;
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
        removeCartItem: (state, payload) => {
            console.log('beforeDeletionCArt',payload,state.cartData,state.cartData.length);
          state.cartData.splice(payload, 1);
            console.log('afterDeletionCart',state.cartData,state.cartData.length);
          localStorage.setItem('cart', state.cartData);
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
            localStorage.setItem("fbLogin", false);
            localStorage.setItem('creationCounter', '0');
        },
        setOrderItems: (state, {customOption,addOn,scale,dishPrice}) => {
            // console.log('receivedMutations',customOption,addOn,scale);
            state.newCustomOptions = customOption;
            state.newAddOnIds = addOn;
            state.newScales = scale;
            state.dishPrice = state.totalPrice = dishPrice;
        },
        clearOrderItems: state => {
            state.newCustomOptions = [];
            state.newAddOnIds = [];
            state.addOnIds = [];
            state.newScales = [];
            state.tempPrice = 0;
            state.quantity = 1;
            state.totalPrice = 0;
            state.dishPrice = 0;
        },
        setCustomOptions: (state, {pID,cID}) => {
            state.newCustomOptions[pID].Options[cID].IsSelected = !state.newCustomOptions[pID].Options[cID].IsSelected;
            // calculatePrice(state, state.dishPrice);
        },
        setAddOnOption: (state, {id,addonId}) => {
            // console.log('addOnIds',id,addonId);
            state.newAddOnIds[id].IsSelected = !state.newAddOnIds[id].IsSelected;
            if(state.newAddOnIds[id].IsSelected) {
                state.addOnIds.push(addonId);
                // console.log('afterPush',state.addOnIds);
                // this.totalPrice = this.totalPrice + price;
            } else {
                // console.log('splicingID',state.addOnIds.indexOf(addonId));
                var i =state.addOnIds.indexOf(addonId)
                state.addOnIds.splice(i,1);
                // this.totalPrice = this.totalPrice - price;
                // console.log('afterSplice',state.addOnIds);
            }
        },
        setScaleOptions: (state, {pID, cID}) => {
            // console.log('pID',pID,'cID',cID,'unitPrice',unitPrice,'value',value);
            // console.log('before',this.newScales[pID].Options[cID].IsSelected, this.newScales[pID].Options);
            state.newScales[pID].Options[cID].IsSelected = !state.newScales[pID].Options[cID].IsSelected;
            // console.log('after',this.newScales[pID].Options[cID].IsSelected,this.newScales[pID].Options);
            for(var i = 0; i< state.newScales.length; i++) {
                for(var j=0; j< state.newScales[i].Options.length; j++) {
                    var obj = state.newScales[i].Options[j];
                    if(j !== cID) {
                        if(obj.IsSelected) {
                            obj.IsSelected = !obj.IsSelected;
                            // this.totalPrice = (this.totalPrice - (unitPrice * obj.Value));
                        }
                    } else {
                        // this.totalPrice = (this.totalPrice + (unitPrice * value));
                    }
                }
            }
        },
        increment: (state) => {
          state.quantity++;
        },
        decrement: (state) => {
            if(state.quantity > 1) {
                state.quantity--;
            }
        },
        calculatePrice: (state, {dishPrice}) => {
            // console.log('Price',dishPrice);
            var tempPrice = 0;
            // console.log('addOnIdsArray',state.newAddOnIds,state.addOnIds);
            for(var i=0; i<state.newAddOnIds.length; i++) {
                for(var j=0; j<state.addOnIds.length;j++) {
                    if(state.newAddOnIds[i].Id === state.addOnIds[j]) {
                        // console.log('here');
                        tempPrice = tempPrice + state.newAddOnIds[i].Price;
                    }
                }
            }
            for(var k=0; k<state.newScales.length; k++) {
                for(var l=0; l<state.newScales[k].Options.length; l++) {
                    if(state.newScales[k].Options[l].IsSelected) {
                        tempPrice = tempPrice + (state.newScales[k].UnitPrice * state.newScales[k].Options[l].Value);
                    }
                }
            }
            state.totalPrice = (state.dishPrice + tempPrice) * state.quantity;
            // console.log('totalPrice',state.quantity,tempPrice,state.dishPrice,state.totalPrice);
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
        removeCartItem: ({commit}, payload) => {
          commit('removeCartItem',payload);
        },
        clearCart: ({commit}) => {
            commit('clearCart');
        },
        setOrderItems: ({commit}, {customOption,addOn,scale,dishPrice})=>{
            console.log('received',customOption,addOn,scale);
            commit('setOrderItems',{customOption,addOn,scale,dishPrice});
            commit('calculatePrice',{dishPrice:1});
        },
        clearOrderItems: ({commit}) => {
            commit('clearOrderItems');
        },
        setAddOnOption: ({commit}, {id,addonId})=> {
            commit('setAddOnOption',{id,addonId});
            // commit('calculatePrice',{dishPrice});
        },
        setCustomOptions: ({commit}, {pID,cID}) => {
            commit('setCustomOptions', {pID,cID});
        },
        setScaleOptions: ({commit}, {pID,cID})=> {
            commit('setScaleOptions',{pID,cID});
            // commit('calculatePrice',{dishPrice});
        },
        increment: ({commit}) => {
            commit('increment');
            // commit('calculatePrice',{dishPrice});
        },
        decrement: ({commit}) => {
            commit('decrement');
            // commit('calculatePrice',{dishPrice});
        },
        calculatePrice: ({commit},{dishPrice}) => {
            commit('calculatePrice',{dishPrice});
        }
    }
})
// function calculatePrice(state,price) {
//     console.log('price',price);
//     state.dishPrice = price;
//     console.log('price',state.dishPrice,price);
// }
