<template lang="pug">
.control(@click="$emit('onClick')")
  .control__icon: div(:class="icon")
  .control__text {{ text }}
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
