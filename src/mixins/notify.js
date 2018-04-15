export default {
  methods: {
    notify(type = 'info', title, text) {
      this.$notify({
        title,
        text,
        type,
        duration: type === 'error' ? 4000 : 2000
      })
    }
  }
}
