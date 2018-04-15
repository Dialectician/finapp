import Vue from 'vue'

export default {
  addTrnToStore(state, payload) {
    Vue.set(state.trns, [payload.id], payload.data)
  },

  updateTrnToStore(state, payload) {
    state.trns[payload.id] = payload.data
  },

  addOrUpdateTrnsToStore(state, trns) {
    state.trns = trns
    // for (const key in trns) {
    //   state.trns[key] = trns[key]
    // }
  },

  delereTrnFromStore(state, id) {
    Vue.delete(state.trns, id)
  }
}
