import actions from '@/store/modules/user/actions'
import getters from '@/store/modules/user/userGetters'
import mutations from '@/store/modules/user/mutations'

const state = {
  user: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
