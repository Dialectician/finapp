export default {
  install(Vue) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.prototype.$toogleBodyOverflow = (params) => {
      if (typeof params === 'string') {
        const body = document.querySelector('body')
        if (params === 'show') {
          body.classList.add('_overflow')
        } else {
          body.classList.remove('_overflow')
        }
      }
    }
  }
}
