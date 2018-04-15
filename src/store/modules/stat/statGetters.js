export default {
  lastCategoryWalletPairs(state, getters, rootState, rootGetters) {
    const pairs = {}

    const walletsIds = [...rootGetters.walletsIds]
      .sort((a, b) => {
        if (rootState.wallets.wallets[a].order < rootState.wallets.wallets[b].order) return -1
        if (rootState.wallets.wallets[a].order > rootState.wallets.wallets[b].order) return 1
        return 0
      })
      .slice(0, 3)

    for (const walletId of walletsIds) {
      if (!pairs[walletId]) {
        pairs[walletId] = []
        const foundedTrnsIds = [...rootGetters.trnsIds]
          .filter(trnId => rootState.trns.trns[trnId].accountId === walletId)
          .sort((a, b) => {
            if (rootState.trns.trns[a].date > rootState.trns.trns[b].date) return -1
            if (rootState.trns.trns[a].date < rootState.trns.trns[b].date) return 1
            return 0
          })
          .slice(0, 30)

        for (const trnId of foundedTrnsIds) {
          const categoryId = rootState.trns.trns[trnId].categoryId
          const transferCategoryId = rootGetters.transferCategoryId
          if (!pairs[walletId].includes(categoryId) && categoryId !== transferCategoryId && pairs[walletId].length < 6) {
            pairs[walletId].push(categoryId)
          }
        }
      }
    }
    return pairs
  }
}
