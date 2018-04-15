export default {
  signIn(state, user) {
    state.user = user
  },

  signOut(state) {
    state.user = null
  }
}
