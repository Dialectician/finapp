<script>
import Amount from '@components/amount/Amount'
import Icon from '@components/icon/Icon'
import formatDate from '@/mixins/formatDate'

export default {
  name: 'TrnItem',

  components: {
    Amount,
    Icon
  },

  mixins: [
    formatDate
  ],

  props: {
    id: {
      type: String,
      required: true
    },
    hasModal: {
      type: Boolean,
      default: true
    },
    showDate: {
      type: Boolean,
      default: false
    },
    showDesc: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    isShowActions: false
  }),

  computed: {
    trn() {
      console.log('trn update')
      return this.$store.state.trns.trns[this.id]
    },

    category() {
      if (this.trn) {
        return this.$store.state.categories.categories[this.trn.categoryId]
      }
    },

    wallet() {
      if (this.trn) {
        return this.$store.state.wallets.wallets[this.trn.accountId]
      }
    }
  },

  methods: {
    onClickEdit() {
      this.isShowActions = false
      this.$store.commit('setTrnForm', {
        editId: this.id,
        show: true
      })
    },

    onClickDelete() {
      this.isShowActions = false
      this.$store.dispatch('deleteTrn', this.id)
    },

    onClickDublicate() {
      this.isShowActions = false
      this.$store.commit('setTrnForm', {
        categoryId: this.trn.categoryId,
        show: true,
        walletId: this.trn.accountId
      })
    },

    onClickTrn() {
      this.$store.dispatch('setTrnItemModalId', this.id)
    }
  }
}
</script>

<template lang="pug">
.trnItem(@click="hasModal && onClickTrn()")
  template(v-if="category && wallet")
    .trnItem__categoryIcon
      Icon(
        :background="category.color"
        :icon="category.icon"
        :round="true"
      )
    .trnItem__content
      template(v-if="showDate")
        .trnItem__date {{ formatDate(trn.date) }}
      .trnItem__categoryName {{ category.name }}
    .trnItem__wallet
      .trnItem__wallet__icon
        Icon(
          :abbr="wallet.name"
          :background="wallet.color"
          :small="true"
        )
      .trnItem__wallet__name {{ wallet.name }}
    .trnItem__amount
      Amount(
        :amount="trn.amount"
        :currency="wallet.currency"
        :type="trn.type"
      )

    template(v-if="showDesc && trn.description")
      .trnItem__desc {{ trn.description }}
    .trnItem__line
</template>
