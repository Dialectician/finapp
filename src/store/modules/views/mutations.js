export default {
  changeTheme(state, theme) {
    state.theme = theme
  },

  setMobileDashboardActiveTab(state, tabName) {
    state.mobileDashboardActiveTab = tabName
  },

  setAppWidth(state, width) {
    state.appWidth = width
  },

  setTrnItemModalId(state, id) {
    state.trnItemModalId = id
  },

  toogleWalletsWidget(state) {
    state.walletsWidgetShow = !state.walletsWidgetShow
  }
}
