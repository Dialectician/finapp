import actions from '@/store/modules/currency/currencyActions'
import getters from '@/store/modules/currency/currencyGetters'
import mutations from '@/store/modules/currency/currencyMutations'

const state = {
  mainCurrency: 'RUB'
}

export default {
  state,
  getters,
  actions,
  mutations
}
