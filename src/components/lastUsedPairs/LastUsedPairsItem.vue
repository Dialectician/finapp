<template lang="pug">
.lastUsedPairsItem(
  :style="{ border: `1px solid ${wallet.color || '#272a36'}` }"
)
  .lastUsedPairsItem__wallet
    .walletItemWidget._space-between(
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
  .lastUsedPairsItem__categories
    template(v-for="categoryId of categoriesIds")
      CategoryItem(
        :id="categoryId"
        v-on:onClickCategory="onClick"
      )
        template(v-if="amountOfCategory(categoryId)")
          .categoryItem__amount
            .categoryItem__amount
              Amount(
                :amount="amountOfCategory(categoryId)"
                :currency="mainCurrency"
                :invert="true"
                :convertToMainCurrency="false"
              )
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Amount from '@components/amount/Amount'
import CategoryItem from '@components/categories/CategoryItem'
import Icon from '@components/icon/Icon'

export default {
  components: {
    Amount,
    CategoryItem,
    Icon
  },

  props: {
    categoriesIds: {
      type: Array,
      required: true
    },
    walletId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters([
      'mainCurrency'
    ]),

    wallet() {
      return this.$store.state.wallets.wallets[this.walletId]
    },

    walletAmount() {
      const trnsIds = this.$store.getters.trnsIds
      const trns = this.$store.state.trns.trns
      if (!trnsIds.length) return 0
      let total = 0
      const walletTrnsIds = trnsIds
        .filter(key => trns[key].accountId === this.walletId)

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
    onClick(categoryId) {
      this.$store.commit('setTrnForm', {
        categoryId: categoryId,
        show: true,
        walletId: this.walletId
      })
    },

    amountOfCategory(categoryId) {
      const selectedMonth = moment().subtract(this.numberOfMonthsAgo, 'months')
      const trnsIds = this.$store.getters.trnsIds
        .filter(trnId => this.$store.state.trns.trns[trnId].categoryId === categoryId && moment(this.$store.state.trns.trns[trnId].date).isSame(selectedMonth, 'month'))
      return this.getTotalOfTrnsIds(trnsIds)
    },

    getTotalOfTrnsIds(trnsIds) {
      // console.log('last: getTotalOfTrnsIds')
      let expenses = 0

      for (const key of trnsIds) {
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
            if (trn.type === 0) expenses = expenses + amount
          }
        }
      }
      return expenses
    }
  }
}
</script>
