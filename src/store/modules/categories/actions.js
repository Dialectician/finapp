import localforage from 'localforage'

export default {
  async addCategoriesToStore({ commit, state }, categories) {
    await localforage.setItem('categories', categories || {})
    commit('addCategoriesToStore', categories || {})
  }
}
