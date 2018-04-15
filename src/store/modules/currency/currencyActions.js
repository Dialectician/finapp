import localforage from 'localforage'

export default {
  setMainCurrency({ commit }, mainCurrency) {
    localforage.setItem('mainCurrency', mainCurrency)
    commit('setMainCurrency', mainCurrency)
  }
}
