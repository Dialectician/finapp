<template lang="pug">
.spinner(:class="className")
  .spinner__b._b1
  .spinner__b._b2
  .spinner__b._b3
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },

  computed: {
    className() {
      return {
        _dark: this.theme === 'dark'
      }
    }
  }
}
</script>
