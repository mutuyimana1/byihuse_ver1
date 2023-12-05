
import {currencies} from "./data";

const state = {
	currencies,
	selectedCurrency: currencies[0],
	rtlLayout: false
	
}

// getters
const getters = {
	currencies: state =>{
		return state.currencies;
	},
	selectedCurrency: state => {
		return state.selectedCurrency;
	},
	rtlLayout: state =>{
		return state.rtlLayout;
	}
}

// actions
const actions = {
	changeCurrency(context, payload){
		context.commit('changeCurrency', payload);
	},
	changeRtlLayout(context){
		context.commit('rtlLayoutHandler');
	}
}

// mutations
const mutations = {
	/**
    * method for setting currency
   */
	changeCurrency(state, currencies){
		state.selectedCurrency = currencies;
	},
	/**
    * method for setting rtl layout
   */
	rtlLayoutHandler(state){
		state.rtlLayout = !state.rtlLayout;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
