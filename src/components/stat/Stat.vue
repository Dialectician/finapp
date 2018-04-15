<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Amount from '@components/amount/Amount'
import Slider from '@components/slider/Slider'
import StatMonthCategories from '@components/stat/StatMonthCategories'
import TrnsList from '@components/trns/TrnsList'
import TrnItem from '@components/trns/TrnItem'

export default {
  components: {
    Amount,
    Slider,
    StatMonthCategories,
    TrnsList,
    TrnItem
  },

  data: () => ({
    numberOfShowedMonths: 1,
    showLastMonth: false
  }),

  computed: {
    ...mapGetters([
      'mainCurrency'
    ]),

    prevMonthDate() {
      return moment().subtract(this.numberOfShowedMonths, 'months').format('MMMM')
    }
  },

  methods: {
    getMonthStat(monthAgo) {
      const monthDate = moment().subtract(monthAgo, 'months')
      const trnsIds = this.$store.getters.trnsIds
        .filter(key => moment(this.$store.state.trns.trns[key].date).isSame(monthDate, 'month'))
      return this.getTotalOfTrnsIds(trnsIds)
    },

    getTotalOfTrnsIds(trnsIds) {
      // console.log('stat: getTotalOfTrnsIds')
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
    },
    /**
      * Check is any trns in month.
      * @param {number} numberOfMontshAgo Start from 0 for this month.
      * @returns {object || false}
    */
    isTrnsInMonth(numberOfMontshAgo) {
      console.log('stat: isTrnsInMonth')
      const selectedMonth = moment().subtract(numberOfMontshAgo, 'months')
      return this.$store.getters.trnsIds
        .find(trnId => moment(this.$store.state.trns.trns[trnId].date).isSame(selectedMonth, 'month'))
    },

    formatDate(monthAgo) {
      const month = moment().subtract(monthAgo, 'months')
      return month.format('MMMM')
    }
  }
}
</script>

<template lang="pug">
.stat
  template(v-for="monthNumber in numberOfShowedMonths")
    .stat__group
      .stat__header {{ formatDate(monthNumber - 1) }}
      .stat__chart
        StatMonthCategories(:numberOfMonthsAgo="monthNumber - 1")
      .stat__slider
        Slider(
          :slidesPerColumn="1"
          :slidesPerView="1"
        )
          .swiper-slide
            .stat__content
              .stat__content__arrow: .mdi.mdi-gesture-swipe-left
              .stat__item._incomes
                .stat__item-name Incomes
                .stat__item-value
                  Amount(
                    :amount="getMonthStat(monthNumber - 1).incomes"
                    :currency="mainCurrency"
                    :type="1"
                  )
              .stat__item._expenses
                .stat__item-name Expenses
                .stat__item-value
                  Amount(
                    :amount="getMonthStat(monthNumber - 1).expenses"
                    :currency="mainCurrency"
                    :type="0"
                  )
              .stat__item._expenses
                .stat__item-name Total
                .stat__item-value
                  Amount(
                    :amount="getMonthStat(monthNumber - 1).sum"
                    :currency="mainCurrency"
                  )
          .swiper-slide
            .stat__trns
              TrnsList(:numberOfMonthsAgo="monthNumber - 1")

  .trnsListHistory__btn
    .btn._inline(@click="numberOfShowedMonths = numberOfShowedMonths + 1") Show {{ prevMonthDate }}
</template>
