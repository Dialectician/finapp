import localforage from 'localforage'
import firebase from 'firebase'

export default {
  async signIn({ commit, state }, user, cache) {
    await localforage.setItem('user', user)
    commit('signIn', user)
  },

  async signOut({ commit, state }) {
    localforage.setItem('categories', null)
    localforage.setItem('rates', null)
    localforage.setItem('trns', null)
    localforage.setItem('user', null)
    localforage.setItem('wallets', null)
    firebase.auth().signOut()
    commit('signOut')
  }
}
