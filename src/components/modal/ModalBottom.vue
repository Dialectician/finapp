<template lang="pug">
.modalBottom(@click.stop.prevent="")
  transition(name="fadeIn")
    template(v-if="isShow && showOverflow")
      .modalBottom__overflow(
        @click="closeModal()"
      )

  transition(name="animModal")
    template(v-if="isShow")
      .modalBottom__wrap(
        :style="{ height: `${maxHeight}px` }"
      )
        template(v-if="showOverflow")
          slot(name="header")

        .modalBottom__scroll
          slot(name="content")
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, Boolean],
      default: null
    },
    showOverflow: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeModal() {
      this.$listeners.onClose()
    }
  }
}
</script>
