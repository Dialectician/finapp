<script>
import Amount from '@components/amount/Amount'
import Icon from '@components/icon/Icon'
import formatMoney from '@/mixins/formatMoney'

export default {
  components: {
    Amount,
    Icon
  },

  mixins: [formatMoney],

  props: {
    id: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    wallet() {
      return this.$store.state.wallets.wallets[this.id]
    },

    walletAmount() {
      let total = 0
      const trnsIds = this.$store.getters.trnsIds
      const trns = this.$store.state.trns.trns
      if (!trnsIds.length) return 0
      const walletTrnsIds = trnsIds
        .filter(key => trns[key].accountId === this.id)

      for (const trnId of walletTrnsIds) {
        if (trns[trnId].type === 0) {
          total = total - trns[trnId].amount
        } else {
          total = total + trns[trnId].amount
        }
      }

      return total
    }
  },

  methods: {
    onClickWallet() {
      if (this.$listeners.onClickWallet) {
        this.$listeners.onClickWallet(this.id)
      }
    }
  }
}
</script>

<template lang="pug">
.walletItem(@click="onClickWallet")
  //- List
  template(v-if="theme === 'default'")
    .walletItem__grid
      .walletItem__icon
        Icon(
          :abbr="wallet.name"
          :background="wallet.color || '#272a36'"
        )
      .walletItem__name {{ wallet.name }}
      .walletItem__amount
        Amount(
          :amount="walletAmount"
          :currency="wallet.currency"
        )
      .walletItem__line

  //- Widget
  template(v-if="theme === 'widget'")
    .walletItemWidget(
      :style="{ background: wallet.color || '#272a36' }"
    )
      .walletItemWidget__name {{ wallet.name }}
      .walletItemWidget__amount
        Amount(
          :amount="walletAmount"
          :currency="wallet.currency"
          :invert="true"
          :convertToMainCurrency="false"
        )
</template>
