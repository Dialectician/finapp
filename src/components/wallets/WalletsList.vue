<script>
import { mapGetters } from 'vuex'
import WalletItem from '@components/wallets/WalletItem'
import isEmpty from '@/mixins/isEmpty'

export default {
  components: {
    WalletItem
  },

  mixins: [isEmpty],

  props: {
    theme: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    ...mapGetters([
      'walletsIds'
    ])
  },

  methods: {
    onClickWallet(walletId) {
      if (this.$listeners.onClickWallet) {
        this.$listeners.onClickWallet(walletId)
      }

      this.$store.commit('setTrnForm', {
        walletId,
        show: true
      })
    }
  }
}
</script>

<template lang="pug">
.wallets
  //- List
  template(v-if="theme === 'default'")
    .walletsList
      template(v-for="walletId of walletsIds")
        WalletItem(
          :id="walletId"
          v-on:onClickWallet="onClickWallet"
        )

  //- Widget
  template(v-if="theme === 'widget'")
    .walletsWidget
      template(v-for="(walletId, idx) of walletsIds")
        template(v-if="idx < 3")
          WalletItem(
            :id="walletId"
            theme="widget"
            v-on:onClickWallet="onClickWallet"
          )
</template>
