/**
* VueShop Store
*/

import Vue from 'vue'
import Vuex from 'vuex'
// import language from './modules/settings/data'

// test comment
// modules
// import account from './modules/account';
import ecommerce from './modules/ecommerce';
import sidebar from './modules/sidebar';
import settings from './modules/settings';
import payment from './modules/payment';
import blog from './modules/blog';
import productDetail from './modules/productDetail';
// import { data } from 'jquery';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        // language,
        // selectedLocale: languages[0],
        shipping: 0,
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        assignedDepartments: '',
        token: '',
        drawer: null,
        totalPrice: '',
        linksformbackend: 'Https://byihuse.rw/',
        // linksformbackend:'Https://byihuse.rw/',
        user: false
        //linksformbackend: 'Https://byihuse.rw/'
        // linksformbackend:'Https://byihuse.rw/',
    },
    getters:{
        shipping: state => {
            return state.shipping;
      },
        user: state =>{
            return state.user;
        },
        linksformbackend: state =>{
            return state.linksformbackend;
        },
        firstName: state => {
            return state.firstName;
        },
        lastName: state => {
            return state.lastName;
        },
        email: state => {
            return state.email;
        },
        role: state => {
            return state.role;
        },
        assignedDepartments: state => {
            return state.assignedDepartments;
        },
        drawer: state =>{
            return state.drawer
        },
        totalPrice: state => {
            return state.totalPrice;
        },
    },
    
    actions:{
    },
    
    mutations:{
        showOrdervu (state, count) {
        if (state.drawer === true) {
            state.drawer = null
        }else if (state.drawer === null) {
           state.drawer = true
        }
        // state.drawer= true
          console.log(state.drawer, count)
        }
    },
    modules: {
        ecommerce,
        sidebar,
        settings,
        payment,
        blog,
        productDetail
    }
})
