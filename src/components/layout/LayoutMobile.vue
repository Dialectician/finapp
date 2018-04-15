<script>
import BottomNav from '@components/bottomNav/BottomNav'
import DashboardMobile from '@components/dashboard/DashboardMobile'
import WalletsList from '@components/wallets/WalletsList'

export default {
  components: {
    BottomNav,
    DashboardMobile,
    WalletsList
  }
}
</script>

<template lang="pug">
.main
  .mainTop
    WalletsList(
      v-if="$store.state.views.walletsWidgetShow"
      theme="widget"
    )

  DashboardMobile
  BottomNav
</template>
