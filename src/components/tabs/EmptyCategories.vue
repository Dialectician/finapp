<template lang="pug">
TabEmpty(
  icon="mdi mdi-chart-bubble"
  text="Start with creating your first category"
  btnText="Create Category"
)
  slot()
</template>

<script>
import TabEmpty from '@components/tabs/TabEmpty'

export default {
  components: { TabEmpty }
}
</script>
