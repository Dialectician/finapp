<script>
import Amount from '@components/amount/Amount'
import Icon from '@components/icon/Icon'
import ModalBottom from '@components/modal/ModalBottom'
import TrnItem from '@components/trns/TrnItem'
import TrnItemModal from '@components/trns/TrnItemModal'
import formatDate from '@/mixins/formatDate'

export default {
  name: 'TrnItemModal',

  components: {
    Amount,
    Icon,
    ModalBottom,
    TrnItem,
    TrnItemModal
  },

  mixins: [
    formatDate
  ],

  props: {
    id: {
      type: String,
      default: null
    }
  },

  data: () => ({
    isShowActions: false
  }),

  computed: {
    trn() {
      return this.$store.state.trns.trns[this.id]
    }
  },

  methods: {
    onClickEdit() {
      this.$store.dispatch('setTrnItemModalId', null)
      this.$store.commit('setTrnForm', {
        editId: this.id,
        show: true
      })
    },

    onClickDelete() {
      this.$store.dispatch('setTrnItemModalId', null)
      this.$store.dispatch('deleteTrn', this.id)
    },

    onClickDublicate() {
      this.$store.dispatch('setTrnItemModalId', null)
      this.$store.commit('setTrnForm', {
        categoryId: this.trn.categoryId,
        show: true,
        walletId: this.trn.accountId
      })
    }
  }
}
</script>

<template lang="pug">
.modalBottom
  transition(name="fadeIn")
    template(v-if="id")
      .modalBottom__overflow(
        @click="$store.dispatch('setTrnItemModalId', null)"
      )

  transition(name="animModal")
    template(v-if="id")
      .modalBottom__wrap
        .modalBottom__header
          TrnItem(
            :id="id"
            :showDate="true"
          )
        .modalBottom__scroll
          .dates
            .dates__item(@click="onClickDelete")
              .dates__item-icon: .mdi.mdi-delete
              .dates__item-name Delete
            .dates__item(@click="onClickDublicate")
              .dates__item-icon: .mdi.mdi-content-copy
              .dates__item-name Dublicate
            .dates__item(@click="onClickEdit")
              .dates__item-icon: .mdi.mdi-lead-pencil
              .dates__item-name Edit
</template>
