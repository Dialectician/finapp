export default {
  /**
    * Sorted wallets IDs
    * @returns {array} - Sorted wallets IDs
  */
  walletsIds(state) {
    return Object
      .keys(state.wallets)
      .sort((a, b) => state.wallets[a].order - state.wallets[b].order)
  },

  lastUsedWalletId(state, getters, rootState, rootGetters) {
    const trns = rootState.trns.trns
    const lastTrnId = [...rootGetters.trnsIds].reverse().slice(0, 1)
    if (!lastTrnId.length) return null
    return trns[lastTrnId].accountId
  },

  lastUsedWallets(state, getters, rootState, rootGetters) {
    const walletsList = {}
    const trnsIds = [...rootGetters.trnsIds].reverse().slice(0, 30)
    for (const id of trnsIds) {
      const walletId = rootState.trns.trns[id].accountId
      if (!walletsList[walletId]) {
        walletsList[walletId] = rootGetters.wallets[walletId]
      }
    }
    return walletsList
  }
}
