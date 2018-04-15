import localforage from 'localforage'

export default {
  async addWalletsToStore({ commit }, wallets) {
    await localforage.setItem('wallets', wallets || {})
    commit('addWalletsToStore', wallets || {})
  }
}
