<template lang="pug">
.icon(
  :class="className"
  :style="{ background: background, color: color }"
)
  template(v-if="abbr")
    .icon__abbr {{ abbr.substring(0, 2) }}
  template(v-else)
    .icon__image
      div(:class="icon || 'mdi mdi-chart-bubble'")
</template>

<script>
export default {
  props: {
    abbr: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    big: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    invert: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    className() {
      return {
        _big: this.big,
        _small: this.small,
        _round: this.round,
        _invert: this.invert,
        _simple: this.simple
      }
    }
  }
}
</script>
