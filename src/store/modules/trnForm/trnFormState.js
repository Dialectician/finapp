import actions from '@/store/modules/trnForm/trnFormActions'
import getters from '@/store/modules/trnForm/trnFormGetters'
import mutations from '@/store/modules/trnForm/trnFormMutations'

const state = {
  trnForm: {
    edit: false,
    categoryId: null,
    show: false,
    walletId: null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
