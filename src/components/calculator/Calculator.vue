<template lang="pug">
.calculator
  .calculator__el._act(@click="onPress") +
  .calculator__el._num(@click="onPress") 7
  .calculator__el._num(@click="onPress") 8
  .calculator__el._num(@click="onPress") 9
  .calculator__el._act(@click="onOpenDateSelector"): .mdi.mdi-calendar-multiple
  .calculator__el._act(@click="onPress") -
  .calculator__el._num(@click="onPress") 4
  .calculator__el._num(@click="onPress") 5
  .calculator__el._num(@click="onPress") 6
  .calculator__el._act: .mdi.mdi-library-books
  .calculator__el._act(@click="onPress") *
  .calculator__el._num(@click="onPress") 1
  .calculator__el._num(@click="onPress") 2
  .calculator__el._num(@click="onPress") 3
  .calculator__el._act(@click="onPress") /
  .calculator__el._clear(@click="onClear") C
  .calculator__el._num(@click="onPress") 0
  .calculator__el._clear(@click="onRemove"): .mdi.mdi-chevron-left

  .calculator__el._sum(
    @click="amounIsNumber ? onSubmit() : doMath()"
    :class="{ _expenses: amountType === 0, _incomes: amountType === 1 }"
  )
    template(v-if="amounIsNumber")
      .mdi.mdi-check
    template(v-else)
      .mdi.mdi-equal
</template>

<script>
import { mapGetters } from 'vuex'
import mathjs from 'mathjs'
import notify from '@/mixins/notify'

export default {
  mixins: [notify],

  props: {
    amount: {
      type: String,
      required: true
    },
    amountType: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    amountValue: [0]
  }),

  computed: {
    ...mapGetters([
      'trnForm'
    ]),
    amounIsNumber() {
      const amount = this.amount.replace(/\s/g, '')
      if (Number.isInteger(Number(amount))) {
        return true
      }
    }
  },

  watch: {
    'trnForm.show'() {
      if (this.trnForm.show) {
        this.amountValue = [this.amount]
      } else {
        this.amountValue = [0]
      }
    }
  },

  methods: {
    doMath() {
      function calc(number) {
        return mathjs.chain(number.replace(/\s/g, '')).eval().round().value
      }

      try {
        const sum = Number(`${calc(String(this.amount))}`).toLocaleString('ru-RU')
        this.amountValue = [sum]
        this.$emit('onSetAmount', sum)
      } catch (e) {
        this.notify('error', 'Error', 'Check your amount')
      }
    },

    onPress(event) {
      const value = event.target.innerText.replace(/\s/g, '')
      let lastEl = this.amountValue[this.amountValue.length - 1]
      // Make it string to remove spaces
      if (lastEl) lastEl = String(lastEl).replace(/\s/g, '')
      // Make it number if posible
      if (Number.isInteger(Number(lastEl))) lastEl = Number(lastEl)
      let newAmount = this.amountValue

      // Empty
      if (lastEl === 0) {
        if (Number.isInteger(Number(value))) {
          newAmount[newAmount.length - 1] = value
        } else {
          this.notify('error', 'Error', 'Start with number')
        }
      } else {
        // // Prev number && new number
        if (Number.isInteger(lastEl) && Number.isInteger(Number(value))) {
          newAmount[newAmount.length - 1] = Number(`${lastEl}${value}`).toLocaleString('ru-RU')
        // Prev number && new string
        } else if (Number.isInteger(lastEl) && !Number.isInteger(Number(value))) {
          newAmount.push(value)
        // Prev string && new number
        } else if (!Number.isInteger(lastEl) && Number.isInteger(Number(value))) {
          newAmount.push(value)
        // Prev string && new string
        } else if (!Number.isInteger(lastEl) && !Number.isInteger(Number(value))) {
          newAmount[newAmount.length - 1] = value
        } else {
        }
      }

      const amountString = newAmount.join('')
      this.$emit('onSetAmount', amountString)
    },

    onRemove() {
      let lastEl = this.amountValue[this.amountValue.length - 1]
      // Make it string to remove spaces
      if (lastEl) lastEl = String(lastEl).replace(/\s/g, '')
      // Make it number if posible
      if (Number.isInteger(Number(lastEl))) lastEl = Number(lastEl)
      let newAmount = this.amountValue

      if (Number.isInteger(Number(lastEl))) {
        if (String(lastEl).length > 1) {
          newAmount[newAmount.length - 1] = Number(`${String(lastEl).substring(0, String(lastEl).length - 1)}`).toLocaleString('ru-RU')
        } else {
          newAmount = newAmount.slice(0, newAmount.length - 1)
          if (!newAmount.length) newAmount = [0]
        }
      } else {
        newAmount = newAmount.slice(0, newAmount.length - 1)
      }
      this.amountValue = newAmount
      const amountString = this.amountValue.join('')
      this.$emit('onSetAmount', amountString)
    },

    onClear() {
      this.amountValue = [0]
      const amountString = this.amountValue.join('')
      this.$emit('onSetAmount', amountString)
    },

    onSubmit() {
      this.amountValue = [0]
      this.$emit('onSubmit')
    },

    onOpenDateSelector() {
      this.$emit('onOpenDateSelector')
    }
  }
}
</script>
