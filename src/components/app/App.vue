<script>
import localforage from 'localforage'
import { app, db } from '@/store/firebase'
import Layout from '@components/layout/Layout'
import notify from '@/mixins/notify'

export default {
  components: { Layout },
  mixins: [notify],

  async mounted() {
    await this.initApp()
    // await this.initFromCache()
  },

  methods: {
    async dealWithOflineTrnsActions() {
      let isConnected = false
      const connectionRef = db.ref('.info/connected')
      connectionRef.on('value', async snap => {
        isConnected = snap.val()
        this.$store.commit('setAppConnected', isConnected)

        if (isConnected) {
          // Add
          const trnsOfflineAdded = await localforage.getItem('trnsOfflineAdded') || {}
          for (const key in trnsOfflineAdded) {
            await this.$store.dispatch('addOrUpdateTrn', {
              id: key,
              data: trnsOfflineAdded[key]
            })
          }
          // Update
          const trnsOfflineUpdated = await localforage.getItem('trnsOfflineUpdated') || {}
          for (const key in trnsOfflineUpdated) {
            await this.$store.dispatch('addOrUpdateTrn', {
              id: key,
              data: trnsOfflineUpdated[key]
            })
          }
          // Delete
          const trnsOfflineDeleted = await localforage.getItem('trnsOfflineDeleted') || []
          for (const id of trnsOfflineDeleted) {
            await this.$store.dispatch('deleteTrn', id)
          }
        }
      })
    },

    async initApp() {
      try {
        await this.initFromCache()
        app.auth().onAuthStateChanged(async (user) => {
          if (user) {
            await this.signInUserToStore(user)
            // Ilkome
            if (user.uid === 'yMI5IiF3OrQRgywpZIgXvgrGQyw2') {
              await this.initDatabaseWatch('yMI5IiF3OrQRgywpZIgXvgrGQyw2')
              // E7W982KnSyP8mQlgsXmW4b0bzjE2 Ketut
              // cuf3IBz16PR0XmvyGu7MwslrgaX2 Mega
              // MiZ427fbMxgAYcBiL0oN022YZ7m2 Test
              // kXVGIN19Mhd7WZUeTtZRqUSo2aJ3 John
              // 8WDRZqvN2AauTXAl4mGwAGyKbbr1 Senya
              // GB5TxVedunVQuNIqBM4vPwndw9N2 Anya
              // pMaDbZdHwqXGutbTqFYJMsGwO4z2 Koza
              // 9nFJjMSSPMfmTtp8mzaPRoxDDq82 Nadya
            } else {
              await this.initDatabaseWatch(user.uid)
            }
            await this.dealWithOflineTrnsActions()
          } else {
            this.$store.dispatch('signOut', null)
          }
          this.$store.commit('setAppLoaded', true)
        })
      } catch (e) {
        console.error(e)
        this.notify('error', 'Error', e.message)
      }
    },

    async initDatabaseWatch(uid) {
      try {
        // Rates
        await this.$store.dispatch('addRatesToStore')

        // Currency
        db.ref(`users/${uid}/settings/mainCurrency`).once('value')
          .then((snapshot) => {
            const currency = snapshot.val()
            this.$store.dispatch('setMainCurrency', currency || 'RUB')
          })

        // Categories
        db.ref(`users/${uid}/categories`).on('value', snapshot => {
          const data = snapshot.val()
          this.$store.dispatch('addCategoriesToStore', data || {})
        }, (e) => this.showPermissionError())

        // // Wallets
        db.ref(`users/${uid}/accounts`).on('value', snapshot => {
          const data = snapshot.val()
          this.$store.dispatch('addWalletsToStore', data || {})
        }, (e) => this.showPermissionError())

        // // Trns
        db.ref(`users/${uid}/trns`).on('value', snapshot => {
          const trns = snapshot.val()
          this.$store.dispatch('addOrUpdateTrnsToStore', trns || {})
        }, (e) => this.showPermissionError())
      } catch (e) {
        console.error(e)
        this.notify('error', 'Error init Database', e.message)
      }
    },

    async initFromCache() {
      const categories = await localforage.getItem('categories')
      const mainCurrency = await localforage.getItem('mainCurrency')
      const mobileDashboardActiveTab = await localforage.getItem('mobileDashboardActiveTab')
      const rates = await localforage.getItem('rates')
      const theme = await localforage.getItem('theme')
      const trns = await localforage.getItem('trns')
      const user = await localforage.getItem('user')
      const wallets = await localforage.getItem('wallets')

      if (rates && trns && categories && wallets && user) {
        if (categories) await this.$store.dispatch('addCategoriesToStore', categories)
        if (mainCurrency) await this.$store.dispatch('setMainCurrency', mainCurrency)
        if (mobileDashboardActiveTab) await this.$store.dispatch('setMobileDashboardActiveTab', mobileDashboardActiveTab)
        if (rates) await this.$store.dispatch('addRatesToStore')
        if (theme) await this.$store.dispatch('changeTheme', theme)
        if (user) await this.$store.dispatch('signIn', user)
        if (wallets) await this.$store.dispatch('addWalletsToStore', wallets)
        if (trns) await this.$store.commit('addOrUpdateTrnsToStore', trns)
        this.$store.commit('setAppLoaded', true)
      }
    },

    logData(data) {
      console.groupCollapsed('Data from firebase')
      console.log(data.categories)
      console.log(data.accounts)
      console.log(data.trns)
      console.groupEnd()
    },

    async signInUserToStore(user) {
      await this.$store.dispatch('signIn', {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      })
    },

    showPermissionError() {
      this.notify('error', 'Access denied', 'You do not have permission')
    }
  }
}
</script>

<template lang="pug">
Layout
</template>
