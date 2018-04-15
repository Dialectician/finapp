<template lang="pug">
TabEmpty(
  icon="mdi mdi-credit-card-multiple"
  text="Start with creating your first wallet"
  btnText="Create Wallet"
)
  slot()
</template>

<script>
import TabEmpty from '@components/tabs/TabEmpty'

export default {
  components: { TabEmpty }
}
</script>
