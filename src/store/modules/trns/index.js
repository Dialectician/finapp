import actions from '@/store/modules/trns/actions'
import getters from '@/store/modules/trns/trnsGetters'
import mutations from '@/store/modules/trns/mutations'

const state = {
  trns: {},
  all: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
