export default {
  setTrnForm(state, props) {
    if (props && props !== null) {
      state.trnForm = {
        editId: props.editId || null,
        categoryId: props.categoryId || null,
        show: props.show,
        walletId: props.walletId || null
      }
    }
  },

  openTrnForm(state) {
    state.trnForm.show = true
  },

  closeTrnForm(state) {
    state.trnForm = {
      editId: null,
      categoryId: null,
      show: false,
      walletId: null
    }
  }
}
