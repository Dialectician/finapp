<script>
import { mapGetters } from 'vuex'
import Amount from '@components/amount/Amount'

export default {
  components: {
    Amount
  },

  props: {
    trnsIds: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters([
      'mainCurrency'
    ]),
    total() {
      // console.log('AmountTotal: getTotalOfTrnsIds')
      let incomes = 0
      let expenses = 0

      for (const key of this.trnsIds) {
        const trn = this.$store.state.trns.trns[key]
        if (trn.categoryId !== this.$store.getters.transferCategoryId) {
          const wallet = this.$store.state.wallets.wallets[trn.accountId]
          if (wallet && this.$store.getters.rates) {
            let amount = 0
            if (wallet.currency !== this.$store.getters.mainCurrency) {
              amount = Math.floor(Math.abs(trn.amount / this.$store.getters.rates[wallet.currency]))
            } else {
              amount = trn.amount
            }
            if (trn.type === 1) incomes = incomes + amount
            else expenses = expenses + amount
          }
        }
      }
      return {
        incomes,
        expenses,
        sum: incomes - expenses
      }
    }
  }
}
</script>

<template lang="pug">
.div
  template(v-if="total.incomes")
    Amount(
      :amount="total.incomes"
      :type="1"
      :currency="mainCurrency"
    )
  template(v-if="total.expenses")
    Amount(
      :amount="total.expenses"
      :type="0"
      :currency="mainCurrency"
    )
</template>
