<script>
import WalletsList from '@components/wallets/WalletsList'

export default {
  components: {
    WalletsList
  }
}
</script>

<template lang="pug">
.sidebar
  .sidebar__scroll
    WalletsList
</template>
