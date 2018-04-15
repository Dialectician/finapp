<template lang="pug">
TabEmpty(
  text="You do not have any trns yet."
)
  slot()
</template>

<script>
import TabEmpty from '@components/tabs/TabEmpty'

export default {
  components: { TabEmpty }
}
</script>
