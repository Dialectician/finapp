<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/formatDate'
import moment from 'moment'
import Amount from '@components/amount/Amount'
import Icon from '@components/icon/Icon'
import Calculator from '@components/calculator/Calculator'
import CategoriesList from '@components/categories/CategoriesList'
import flatPickr from 'vue-flatpickr-component'
import Slider from '@components/slider/Slider'
import ModalBottom from '@components/modal/ModalBottom'
import WalletsList from '@components/wallets/WalletsList'
import isEmpty from '@/mixins/isEmpty'
import notify from '@/mixins/notify'
import 'flatpickr/dist/themes/airbnb.css'

export default {
  components: {
    Amount,
    Calculator,
    CategoriesList,
    flatPickr,
    Icon,
    ModalBottom,
    Slider,
    WalletsList
  },

  mixins: [
    isEmpty,
    notify
  ],

  data: () => ({
    amount: String(0),
    amountType: 0,
    calendarConfig: {
      dateFormat: 'D j M Y',
      disableMobile: true,
      maxDate: moment().endOf('day').toDate(),
      wrap: true
    },
    date: moment().valueOf(),
    formHeight: null,
    isShowCategories: false,
    isShowDates: false,
    isShowWallets: false,
    pickerDate: new Date(),
    selectedCategoryId: null,
    selectedWalletId: null,
    numbersOfPressingBackBtn: 0
  }),

  computed: {
    ...mapGetters([
      'lastUsedCategoryId',
      'lastUsedWalletId',
      'lastUsedWallets',
      'trnForm'
    ]),

    formatedDate() {
      const date = formatDate(this.date, 'full')
      return `${date.weekDay} ${date.day} ${date.month} ${date.year}`
    },

    category() {
      if (this.selectedCategoryId) {
        return this.$store.state.categories.categories[this.selectedCategoryId]
      }
    },

    wallet() {
      if (this.selectedWalletId) {
        return this.$store.state.wallets.wallets[this.selectedWalletId]
      }
    },

    walletAmount() {
      const trnsIds = this.$store.getters.trnsIds
      const trns = this.$store.state.trns.trns
      if (!trnsIds.length) return 0
      let total = 0
      const walletTrnsIds = trnsIds
        .filter(key => trns[key].accountId === this.selectedWalletId)

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

  watch: {
    'trnForm.show'() {
      if (this.trnForm.show) {
        this.$toogleBodyOverflow('show')
        this.fillForm()

        this.$nextTick(() => {
          const formEl = document.querySelector('.trnForm__scroll')
          if (formEl) {
            this.formHeight = formEl.clientHeight
          }
        })
      } else {
        this.$toogleBodyOverflow('hide')
        this.clearForm()
      }
    }
  },

  mounted() {
    history.pushState(null, document.title, location.href)
    window.onpopstate = () => {
      history.pushState(null, document.title, location.href)
      if (this.isShowWallets) {
        this.isShowWallets = false
        this.numbersOfPressingBackBtn = 0
      } else if (this.isShowCategories) {
        this.isShowCategories = false
        this.numbersOfPressingBackBtn = 0
      } else if (this.isShowDates) {
        this.isShowDates = false
        this.numbersOfPressingBackBtn = 0
      } else if (this.trnForm.show) {
        this.$store.commit('closeTrnForm')
        this.numbersOfPressingBackBtn = 0
      } else if (this.modal) {
        this.notify('error', 'Modal is opened', 'Please close modal window before go back')
      } else {
        this.numbersOfPressingBackBtn = this.numbersOfPressingBackBtn + 1
        if (this.numbersOfPressingBackBtn < 2) {
          this.notify('', 'Exit', 'Press back again for exit')
          setTimeout(() => {
            console.log(1)
            this.numbersOfPressingBackBtn = 0
          }, 3000)
        }
        if (this.numbersOfPressingBackBtn === 2) {
          this.notify('', 'Exit', 'Poka poka')
          setTimeout(() => {
            history.go(`-${history.length - 1}`)
          }, 2000)
        }
      }
    }
  },

  methods: {
    doSomethingOnChange(r) {
      this.date = moment(r[0]).valueOf()
      setTimeout(() => {
        this.isShowDates = false
      }, 10)
    },
    clearForm() {
      this.amount = String(0)
      this.date = moment().valueOf()
      this.description = null
    },

    closeForm() {
      this.$store.commit('closeTrnForm')
      this.isShowCategories = false
      this.isShowDates = false
      this.isShowWallets = false
    },

    fillForm() {
      if (this.trnForm.editId) {
        const trn = this.$store.state.trns.trns[this.trnForm.editId]
        if (trn) {
          this.amount = Number(trn.amount).toLocaleString('ru-RU')
          this.amountType = trn.type
          this.date = trn.date
          this.selectedCategoryId = trn.categoryId
          this.selectedWalletId = trn.accountId
        }
      } else {
        this.selectedCategoryId = this.trnForm.categoryId || this.lastUsedCategoryId || null
        this.selectedWalletId = this.trnForm.walletId || this.lastUsedWalletId || null
      }
    },

    formatAmountToNumber() {
      const amount = Number(String(this.amount).replace(/\s/g, ''))
      if (!amount) {
        this.notify('error', 'Error', 'Amount can not be empty')
        return
      }
      if (amount < 0) {
        this.notify('error', 'Error', 'Amount can not be negative number')
        return
      }
      if (amount === 0) {
        this.notify('error', 'Error', 'Amount can not be equal Zero')
        return
      }
      return amount
    },

    setAmount(value) {
      this.amount = `${value}`
    },

    setDate(days) {
      this.date = moment().subtract(days, 'days').valueOf()
      this.pickerDate = moment(this.date).toDate()
      this.isShowDates = false
    },

    setCategory(categoryId) {
      this.isShowCategories = false
      this.selectedCategoryId = categoryId
    },

    setWallet(walletId) {
      console.log(walletId)
      this.isShowWallets = false
      this.selectedWalletId = walletId
    },

    toogleCategoriesModal() {
      this.isShowWallets = false
      this.isShowCategories = !this.isShowCategories
    },

    toogleWalletsModal() {
      this.isShowCategories = false
      this.isShowWallets = !this.isShowWallets
    },

    validateForm() {
      if (!this.selectedWalletId) {
        this.notify('error', 'Error', 'Please select wallet')
        return
      }
      if (!this.selectedCategoryId) {
        this.notify('error', 'Error', 'Please select category')
        return false
      }
      return true
    },

    submitForm() {
      try {
        const amount = this.formatAmountToNumber()
        if (!amount) return
        if (!this.validateForm()) return

        const formatedTrn = {
          id: this.trnForm.editId || null,
          data: {
            accountId: this.selectedWalletId,
            amount,
            categoryId: this.selectedCategoryId,
            date: this.date,
            description: null,
            type: this.amountType
          }
        }

        this.$store.commit('closeTrnForm')
        this.$store.dispatch('addOrUpdateTrn', formatedTrn)
        this.clearForm()
      } catch (e) {
        this.notify('error', 'Error', e.message)
      }
    }
  }
}
</script>

<template lang="pug">
.trnForm
  transition(name="fadeIn")
    .trnForm__overflow(
      v-show="trnForm.show"
      @click="closeForm"
    )

  transition(name="animModal")
    .trnForm__wrap(
      v-show="trnForm.show"
    )
      .trnForm__header
        //- Wallet
        .trnForm__headerItem._wallet(
          @click="toogleWalletsModal"
          :style="{ background: wallet && wallet.color }"
        )
          template(v-if="!isEmpty(wallet)")
            .trnForm__icon
              Icon(
                :abbr="wallet.name"
                :big="true"
                :color="wallet.color"
                :invert="true"
              )
            .trnForm__headerItemContent
              .trnForm__name {{ wallet.name }}
              .trnForm__total
                Amount(
                  :amount="walletAmount"
                  :currency="wallet.currency"
                )
          template(v-else)
            .trnForm__icon
              Icon(
                icon="mdi mdi-credit-card-multiple"
                :big="true"
                :invert="true"
              )
            .trnForm__name Wallet

        //- Category
        .trnForm__headerItem._category(
          @click="toogleCategoriesModal"
          :style="{ background: category && category.color }"
        )
          template(v-if="!isEmpty(category)")
            .trnForm__icon
              Icon(
                :big="true"
                :color="category.color"
                :icon="category.icon"
                :invert="true"
                :round="true"
              )
            .trnForm__name {{ category.name }}
          template(v-else)
            .trnForm__icon
              Icon(
                :big="true"
                icon="mdi mdi-chart-bubble"
                :round="true"
                :invert="true"
              )
            .trnForm__name Category

      //- Content
      .trnForm__scroll
        .trnFormAmount(
          @click="amountType = amountType === 0 ? amountType = 1 : amountType = 0"
          :class="{ _expenses: amountType === 0, _incomes: amountType === 1 }"
        )
          .trnFormAmount__type
            template(v-if="amountType === 0") Expense
            template(v-if="amountType === 1") Incomes
          //- input.trnFormAmount__value(
          .trnFormAmount__value(
            type="text"
          ) {{ amount }}

        Calculator(
          :amount="amount"
          :amountType="amountType"
          v-on:onSetAmount="setAmount"
          v-on:onSubmit="submitForm"
          v-on:onOpenDateSelector="isShowDates = !isShowDates"
        )

        .trnForm__selectedDate {{ formatedDate }}

  //- Wallets
  .modalBottom
    transition(name="animModal")
      .modalBottom__wrap(
        v-show="isShowWallets"
        :style="{ height: `${formHeight}px` }"
      )
        .modalBottom__scroll
          WalletsList(
            v-on:onClickWallet="setWallet"
          )

  //- Categories
  .modalBottom
    transition(name="animModal")
      .modalBottom__wrap(
        v-show="isShowCategories"
        :style="{ height: `${formHeight}px` }"
      )
        .modalBottom__scroll
          CategoriesList(
            :showLastUsed="true"
            :showTitle="true"
            v-on:onClickCategory="setCategory"
          )

  //- Date
  ModalBottom(
    :isShow="isShowDates"
    :showOverflow="true"
    v-on:onClose="isShowDates = false"
  )
    template(v-if="isShowDates")
      template(slot="header")
        .modalBottom__header
          .modalBottom__name Date
          .modalBottom__child {{ formatedDate }}
          .modalBottom__icon
            Icon(
              icon="mdi mdi-calendar-multiple"
              :big="true"
            )

      template(slot="content")
        .dates
          .dates__item
            .dates__item-icon(data-toggle): .mdi.mdi-calendar
            .dates__item-name Calendar
            flatPickr(
              v-model="pickerDate"
              :config="calendarConfig"
              @on-change="doSomethingOnChange"
            )
          .dates__item(@click="setDate(1)")
            .dates__item-icon: .mdi.mdi-weather-night
            .dates__item-name Yestarday
          .dates__item(@click="setDate(0)")
            .dates__item-icon: .mdi.mdi-weather-sunset-up
            .dates__item-name Today
</template>
