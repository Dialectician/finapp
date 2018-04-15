<script>
import { mapGetters } from 'vuex'
import formatMoney from '@/mixins/formatMoney'

export default {
  mixins: [formatMoney],

  props: {
    amount: {
      type: Number,
      required: true
    },
    convertToMainCurrency: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: 'RUB',
      required: true
    },
    invert: {
      type: Boolean,
      default: false
    },
    type: {
      type: [Number, Boolean],
      default: false
    }
  },

  computed: {
    ...mapGetters([
      'rates',
      'mainCurrency'
    ]),

    amountFormated() {
      return this.formatMoney(this.amount, this.currency)
    },

    amountFormatedDefualtCurrency() {
      const amount = Math.floor(this.amount / this.rates[this.currency])
      return this.formatMoney(amount, this.mainCurrency)
    },

    className() {
      return {
        _incomes: this.type === 1,
        _expenses: this.type === 0,
        _invert: this.invert
      }
    }
  }
}
</script>

<template lang="pug">
.amount(
  :class="className"
)
  template(v-if="amount === 0")
    .amount__wrap
      .amount__symbol {{ amountFormated.symbol }}
      .amount__price 0

  template(v-else)
    .amount__wrap
      .amount__symbol {{ amountFormated.symbol }}
      .amount__price {{ amountFormated.price }}

    template(v-if="convertToMainCurrency && currency !== mainCurrency")
      .amount__wrap._small
        .amount__symbol._small {{ amountFormatedDefualtCurrency.symbol }}
        .amount__price._small {{ amountFormatedDefualtCurrency.price }}
</template>
