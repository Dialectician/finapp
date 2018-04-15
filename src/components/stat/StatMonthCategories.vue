<script>
import moment from 'moment'
import Icon from '@components/icon/Icon'
import StatMonthCategoriesItem from '@components/stat/StatMonthCategoriesItem'

export default {
  components: {
    Icon,
    StatMonthCategoriesItem
  },

  props: {
    numberOfMonthsAgo: {
      type: Number,
      default: 0
    }
  },

  computed: {
    monthStat() {
      const selectedMonth = moment().subtract(this.numberOfMonthsAgo, 'months')
      const thisMonthsTrnsIds = this.$store.getters.trnsIds
        .filter(trnId => moment(this.$store.state.trns.trns[trnId].date).isSame(selectedMonth, 'month'))
      const categories = this.$store.state.categories.categories
      const categoriesWithTrnsIds = {}
      const categoriesTotal = {}

      if (thisMonthsTrnsIds.length) {
        for (const trnId of thisMonthsTrnsIds) {
          const trnCategoryId = this.$store.state.trns.trns[trnId].categoryId
          if (!trnCategoryId) break
          if (!categories[trnCategoryId]) break
          const trnParentCategoryId = categories[trnCategoryId].parentId
          const categoryId = trnParentCategoryId || trnCategoryId

          if (categoryId !== this.$store.getters.transferCategoryId && this.$store.state.trns.trns[trnId].type === 0) {
            if (!categoriesWithTrnsIds[categoryId]) {
              categoriesWithTrnsIds[categoryId] = [trnId]
            } else {
              categoriesWithTrnsIds[categoryId].push(trnId)
            }
          }
        }
      }

      for (const categoryId in categoriesWithTrnsIds) {
        const trnsIds = categoriesWithTrnsIds[categoryId]
        categoriesTotal[categoryId] = this.getTotalOfTrnsIds(trnsIds)
      }

      const sortedCategoriesIdsBySum = [...Object.keys(categoriesTotal)]
        .sort((a, b) => {
          if (categoriesTotal[a].sum < categoriesTotal[b].sum) return -1
          if (categoriesTotal[a].sum > categoriesTotal[b].sum) return 1
          return 0
        })

      const sortedCategories = {}
      for (const categoryId of sortedCategoriesIdsBySum) {
        sortedCategories[categoryId] = categoriesTotal[categoryId]
      }

      return sortedCategories
    },

    maxSum() {
      for (const categoryId in this.monthStat) {
        return Math.abs(this.monthStat[categoryId].sum)
      }
    }
  },

  methods: {
    getTotalOfTrnsIds(trnsIds) {
      // console.log('stat2: getTotalOfTrnsIds')
      let incomes = 0
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
.statMonthCategories
  template(v-for="(categoryTotal, categoryId) in monthStat")
    StatMonthCategoriesItem(
      :categoryId="categoryId"
      :expenses="categoryTotal.expenses"
      :incomes="categoryTotal.incomes"
      :maxSum="maxSum"
      :sum="categoryTotal.sum"
    )

</template>
