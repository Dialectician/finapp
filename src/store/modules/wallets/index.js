import actions from '@/store/modules/wallets/walletsActions'
import getters from '@/store/modules/wallets/walletsGetters'
import mutations from '@/store/modules/wallets/mutations'

const state = {
  wallets: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
