<template lang="pug">
.login
  .login__themeChanger
    .themeChanger(@click="$store.dispatch('changeTheme')")
      .themeChanger__icon: .mdi.mdi-palette
      .themeChanger__text Change theme

  .login__wrap
    .appName Finapp Next

    .login__button(
      @click.prevent="signInWithGoogle"
      :class="{ _loading: loading }"
    )
      transition(name="fadeIn")
        template(v-if="loading")
          .login__button-spiner: Spiner
      .login__button-text Login with Google

  a(href="https://ilko.me").login__copy
    | Made with
    .login__heart.mdi.mdi-heart
    | by Ilya Komichev
</template>

<script>
import firebase from 'firebase'
import Spiner from '@components/spiner/Spiner'

export default {
  components: { Spiner },

  data: () => ({
    loading: false
  }),

  methods: {
    signInWithGoogle() {
      this.loading = true
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .catch(e => {
          console.error(e)
          this.$notify({
            title: 'Error',
            text: e.message,
            type: 'error'
          })
          this.loading = false
        })
    }
  }
}
</script>
