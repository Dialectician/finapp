<script>
import { mapGetters } from 'vuex'
import CategoriesList from '@components/categories/CategoriesList'
import LastUsedPairs from '@components/lastUsedPairs/LastUsedPairs'
import Stat from '@components/stat/Stat'
import TrnsList from '@components/trns/TrnsList'
import WalletsList from '@components/wallets/WalletsList'

export default {
  components: {
    CategoriesList,
    LastUsedPairs,
    Stat,
    TrnsList,
    WalletsList
  },

  data: () => ({
    showLastMonth: false
  }),

  computed: {
    ...mapGetters([
      'mobileDashboardActiveTab'
    ])
  }
}
</script>

<template lang="pug">
.tabs
  //- Wallets
  .tab(v-show="mobileDashboardActiveTab === 'wallets'")
    WalletsList

  //- Categories
  .tab(v-show="mobileDashboardActiveTab === 'categories'")
    CategoriesList

  //- Stat
  .tab(v-show="mobileDashboardActiveTab === 'stat'")
    Stat

  //- Last Used
  .tab(v-show="mobileDashboardActiveTab === 'creation'")
    LastUsedPairs
</template>
