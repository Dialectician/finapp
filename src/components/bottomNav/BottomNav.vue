<template lang="pug">
.bottomNav
  //- Wallets
  .bottomNavItem(
    @click="$store.dispatch('setMobileDashboardActiveTab', 'wallets')"
    :class="{ _active: mobileDashboardActiveTab === 'wallets' }"
  )
    .bottomNavItem__icon: .mdi.mdi-credit-card-multiple
    .bottomNavItem__text Wallets

  //- Categories
  .bottomNavItem(
    @click="$store.dispatch('setMobileDashboardActiveTab', 'categories')"
    :class="{ _active: mobileDashboardActiveTab === 'categories' }"
  )
    .bottomNavItem__icon: .mdi.mdi-chart-bubble
    .bottomNavItem__text Categories

  .bottomNavItem(
    @click="$store.dispatch('setMobileDashboardActiveTab', 'stat')"
    :class="{ _active: mobileDashboardActiveTab === 'stat' }"
  )
    .bottomNavItem__icon: .mdi.mdi-poll
    .bottomNavItem__text Stat

  .bottomNavItem(
    @click="$store.dispatch('setMobileDashboardActiveTab', 'creation')"
    :class="{ _active: mobileDashboardActiveTab === 'creation' }"
    )
    .bottomNavItem__icon: .mdi.mdi-creation
    .bottomNavItem__text Create
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['mobileDashboardActiveTab'])
  }
}
</script>
