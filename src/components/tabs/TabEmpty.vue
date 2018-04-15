<template lang="pug">
.emptyInfo
  template(v-if="icon")
    .emptyInfo__image: div(:class="icon")

  .emptyInfo__text {{ text }}

  template(v-if="btnText")
    .emptyInfo__btn
      .btn._inline {{ btnText }}

  slot()
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
