<script>
import { mapGetters } from 'vuex'
import LastUsedPairsItem from '@components/lastUsedPairs/LastUsedPairsItem'
import Slider from '@components/slider/Slider'
import isEmpty from '@/mixins/isEmpty'

export default {
  components: {
    LastUsedPairsItem,
    Slider
  },

  mixins: [
    isEmpty
  ],

  computed: {
    ...mapGetters([
      'lastCategoryWalletPairs'
    ])
  }
}
</script>

<template lang="pug">
.lastUsedPairs
  template(v-if="!isEmpty(lastCategoryWalletPairs)")
    template(v-for="(categoriesIds, walletId) in lastCategoryWalletPairs")
      template(v-if="categoriesIds.length")
        LastUsedPairsItem(
          :categoriesIds="categoriesIds"
          :walletId="walletId"
        )
</template>
