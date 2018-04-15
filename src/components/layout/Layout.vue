<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import Control from '@components/control/Control'
import EmptyCategories from '@components/tabs/EmptyCategories'
import EmptyWallets from '@components/tabs/EmptyWallets'
import Header from '@components/header/Header'
import LayoutMobile from '@components/layout/LayoutMobile'
import Loader from '@components/loader/Loader'
import Login from '@components/login/Login'
import TrnForm from '@components/trnForm/TrnForm'
import TrnItemModal from '@components/trns/TrnItemModal'

export default {
  components: {
    Control,
    EmptyCategories,
    EmptyWallets,
    Header,
    LayoutMobile,
    Loader,
    Login,
    TrnForm,
    TrnItemModal
  },

  computed: {
    ...mapGetters([
      'appLoaded',
      'appWidth',
      'categoriesRootIds',
      'mobileDashboardActiveTab',
      'trnForm',
      'user',
      'walletsIds'
    ]),

    showTrnCreatBtn() {
      const show = (this.mobileDashboardActiveTab === 'history' ||
                  this.mobileDashboardActiveTab === 'stat') &&
                  !this.trnForm.show
      return show
    }
  },

  async mounted() {
    this.setAppWidth()
    window.addEventListener('resize', debounce(this.setAppWidth, 150))
  },

  methods: {
    setAppWidth() {
      const width = document.documentElement.clientWidth
      this.$store.commit('setAppWidth', width)
    }
  }
}
</script>

<template lang="pug">
.app
  notifications(
    :max="2"
    width="100%"
  )

  //- Loading
  template(v-if="!appLoaded")
    Loader

  //- Loaded
  transition(name="animTab")
    template(v-if="appLoaded")
      div
        //- Auth
        transition(name="animTab")
          template(v-if="!user")
            Login

        //- App
        template(v-if="user")
          Header

          //- Settings
          .main(v-if="mobileDashboardActiveTab === 'settings'")
            .tab
              .tab__content
                h1.title._side Settings
                .controlsList
                  Control(
                    icon="mdi mdi-palette"
                    text="Change theme"
                    v-on:onClick="$store.dispatch('changeTheme')"
                  )
                  Control(
                    icon="mdi mdi-logout"
                    :text="`Logout ${user.displayName}`"
                    v-on:onClick="$store.dispatch('signOut')"
                  )

          //- No wallets
          template(v-if="!walletsIds.length")
            .mainCenter
              EmptyWallets

          //- No categories
          template(v-else-if="!categoriesRootIds.length")
            .mainCenter
              EmptyCategories

          template(v-else)
            LayoutMobile

            //- Common
            TrnForm
            transition(name="animModal")
              .trnCreate(
                @click="$store.commit('openTrnForm')"
                v-show="showTrnCreatBtn"
              ) +

            TrnItemModal(
              :id="$store.state.views.trnItemModalId"
            )
</template>
