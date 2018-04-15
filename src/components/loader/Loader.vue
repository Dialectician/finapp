<template lang="pug">
.loader
  .loader__wrap
    Spiner(theme="dark")
    .appName Finapp Next
</template>

<script>
import Spiner from '@components/spiner/Spiner'
export default {
  components: { Spiner }
}
</script>
