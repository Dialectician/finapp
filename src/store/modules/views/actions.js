import localforage from 'localforage'

export default {
  changeTheme({ commit, state }, theme) {
    if (state.theme === theme) return

    const body = document.querySelector('body')
    let newTheme = ''
    if (state.theme === 'dark') {
      body.classList.add('_light')
      body.classList.remove('_dark')
      newTheme = 'light'
    } else {
      body.classList.add('_dark')
      body.classList.remove('_light')
      newTheme = 'dark'
    }
    localforage.setItem('theme', newTheme)
    commit('changeTheme', newTheme)
  },

  setMobileDashboardActiveTab({ commit, state }, tabName) {
    if (state.mobileDashboardActiveTab === tabName) {
      if (tabName === 'settings') {
        commit('setMobileDashboardActiveTab', 'stat')
        localforage.setItem('mobileDashboardActiveTab', 'stat')
      }
    } else {
      commit('setMobileDashboardActiveTab', tabName)
    }
    localforage.setItem('mobileDashboardActiveTab', tabName)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },

  setTrnItemModalId({ commit, state }, id) {
    if (state.trnItemModalId === id) {
      commit('setTrnItemModalId', null)
      return
    }
    commit('setTrnItemModalId', id)
  }
}
