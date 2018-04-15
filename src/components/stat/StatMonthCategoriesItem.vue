<script>
export default {
  props: {
    categoryId: {
      type: String,
      required: true
    },
    incomes: {
      type: Number,
      default: 0
    },
    expenses: {
      type: Number,
      default: 0
    },
    sum: {
      type: Number,
      default: 0
    },
    maxSum: {
      type: Number,
      default: 0
    }
  },

  computed: {
    category() {
      return this.$store.state.categories.categories[this.categoryId]
    },

    height() {
      return Math.abs(this.sum) / Math.abs(this.maxSum) * 100
    },

    kSum() {
      function kFormatter(num) {
        if (num < 999) {
          return num
        }
        if (num < 99999) {
          return (num / 1000).toFixed(1) + 'k'
        }
        if (num < 999999) {
          return (num / 1000).toFixed(0) + 'k'
        }
        return (num / 1000000).toFixed(1) + 'm'
      }
      return kFormatter(Math.abs(this.sum))
    }
  }
}
</script>

<template lang="pug">
.statMonthCategoriesItem
  template(v-if="category")
    .statMonthCategoriesItem__bg
      .statMonthCategoriesItem__bg__in(
        :style="{ background: category.color, height: `${height}%` }"
      )
        .statMonthCategoriesItem__sum {{ kSum }}
    .statMonthCategoriesItem__content(
      :style="{ background: category.color }"
    )
      .statMonthCategoriesItem__icon
        .div(:class="category.icon")
      .statMonthCategoriesItem__name
        .statMonthCategoriesItem__name__in {{ category.name }}
</template>
