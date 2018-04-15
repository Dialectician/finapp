import actions from '@/store/modules/views/actions'
import getters from '@/store/modules/views/getters'
import mutations from '@/store/modules/views/mutations'

const state = {
  appWidth: null,
  mobileDashboardActiveTab: 'stat',
  theme: 'light',
  walletsWidgetShow: false,
  trnItemModalId: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
