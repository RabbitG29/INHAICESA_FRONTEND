import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable */
export const store = new Vuex.Store({
    state:{
        isLogged: false,
        id: '',
        token: '',
        name: '',
        phone: ''
    },
    getters:{
        isLogged: function(state){
            return state.isLogged
        },
        getId: function(state){
            return state.id
        },
        getToken: function(state){
            return state.token
        },
        getName: function(state){
            return state.name
        },
        getPhone: function(state){
            return state.phone
        }
    },
    mutations: {
        logIn: function(state, payload){
            state.isLogged = true
            state.id = payload.id
            state.token = payload.token
            state.name = payload.name
            state.phone = payload.phone
        },
        logOut: function(state, payload){
            state.isLogged = false
            state.id = ''
            state.token = ''
            state.name = ''
            state.phone = ''
        }
    }
});