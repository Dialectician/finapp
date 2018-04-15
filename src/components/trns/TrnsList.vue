<template lang="pug">
.trnsList
  template(v-for="trnListItem of groupedTrnsByDate")
    .trnsList__day
      .trnsList__header
        .trnsList__date
          TrnsListDate(:date="trnListItem.date")
        .trnsList__total
          AmountTotal(:trnsIds="trnListItem.trnsIds")

      .trnsList__trns
        template(v-for="trnId of trnListItem.trnsIds")
          TrnItem(:id="trnId")
</template>

<script>
import moment from 'moment'
import AmountTotal from '@components/amount/AmountTotal'
import TrnItem from '@components/trns/TrnItem'
import TrnsListDate from '@components/trns/TrnsListDate'

export default {
  components: {
    AmountTotal,
    TrnItem,
    TrnsListDate
  },

  props: {
    numberOfMonthsAgo: {
      type: Number,
      required: true
    }
  },

  computed: {
    groupedTrnsByDate() {
      // console.log('trnsList: getTrnsGroupedByDayMonthAgo')
      const selectedMonth = moment().subtract(this.numberOfMonthsAgo, 'months')
      const foundedTrnsIds = [...this.$store.getters.trnsIds]
        .filter(trnId => moment(this.$store.state.trns.trns[trnId].date).isSame(selectedMonth, 'month'))
        .sort((a, b) => {
          if (this.$store.state.trns.trns[a].date > this.$store.state.trns.trns[b].date) return -1
          if (this.$store.state.trns.trns[a].date < this.$store.state.trns.trns[b].date) return 1
          return 0
        })
      return this.groupTrnsByOneDay(foundedTrnsIds)
    }
  },

  methods: {
    groupTrnsByOneDay(trnsIds) {
      // console.log('trnsList: groupTrnsByOneDay')
      const trnsList = {}
      for (const trnId of trnsIds) {
        const valueOfDay = moment(this.$store.state.trns.trns[trnId].date).startOf('day').valueOf()
        if (!trnsList[valueOfDay]) {
          trnsList[valueOfDay] = {
            date: valueOfDay,
            trnsIds: trnsIds
              .filter(trnId => moment(this.$store.state.trns.trns[trnId].date).isSame(valueOfDay, 'day'))
          }
        }
      }
      return trnsList
    }
  }
}
</script>
