export default {
  /**
    * Trns IDs
    * @returns {array} - Trns IDs
  */
  trnsIds(state) {
    // console.log('trnsGetters: trnsIds')
    return Object.keys(state.trns)
  },

  getTrnById: (state) => (trnId) => {
    return state.trns[trnId]
  },

  sortedTrnsIds(state, getters) {
    // console.log('trnsGetters: sortedTrnsIds')
    return [...getters.trnsIds]
      .sort((a, b) => {
        if (state.trns[a].date > state.trns[b].date) return -1
        if (state.trns[a].date < state.trns[b].date) return 1
        return 0
      })
      .slice(0, 3)
  }
}
