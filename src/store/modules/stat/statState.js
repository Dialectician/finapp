import actions from '@/store/modules/stat/statActions'
import getters from '@/store/modules/stat/statGetters'
import mutations from '@/store/modules/stat/statMutations'

const state = {
  lastCategoryWalletPairs: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
