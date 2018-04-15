import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import currency from './modules/currency/currencyState'
import rates from './modules/rates'
import stat from './modules/stat/statState'
import trnForm from './modules/trnForm/trnFormState'
import trns from './modules/trns'
import user from './modules/user'
import views from './modules/views'
import wallets from './modules/wallets'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    categories,
    currency,
    rates,
    stat,
    trnForm,
    trns,
    user,
    views,
    wallets
  },

  state: {
    appLoaded: false,
    appConnected: false
  },

  // Getters
  getters: {
    appLoaded(state) {
      return state.appLoaded
    }
  },

  // Mutations (commit)
  mutations: {
    setAppConnected(state, status) {
      state.appConnected = status
    },
    setAppLoaded(state, status) {
      state.appLoaded = status
    }
  }
})
