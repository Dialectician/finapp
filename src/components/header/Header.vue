<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'mobileDashboardActiveTab'
    ])
  }
}
</script>

<template lang="pug">
.header
  .header__left
    .appName._small(@click="$store.dispatch('setMobileDashboardActiveTab', 'stat')") Finapp
  .header__right
    .header__action(
      :class="{ _active: $store.state.views.walletsWidgetShow }"
      @click="$store.commit('toogleWalletsWidget')"
    )
      .mdi.mdi-credit-card-multiple
    .header__action(
      @click="$store.dispatch('changeTheme')"
    )
      .mdi.mdi-palette
    .header__action(
      :class="{ _active: mobileDashboardActiveTab === 'settings' }"
      @click="$store.dispatch('setMobileDashboardActiveTab', 'settings')"
    )
      .mdi.mdi-tune
</template>
