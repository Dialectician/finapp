<template lang="pug">
.dev
  .dev__toogle
    Control(
      icon="mdi mdi-developer-board"
      text="Hide DevPage"
      v-on:onClick="$store.commit('showDevPage')"
    )
  .dev__in
    .dev__wrapper
      .body
        .dev__content
          Icon(
            :round="true"
          )
          Icon(
            abbr="Hello"
          )
          Icon(
            :big="true"
          )
          Icon(
            :big="true"
          )
          Icon(
          )

    .dev__wrapper
      .body._light
        .dev__content
          Icon(
            :round="true"
          )
          Icon(
            abbr="Hello"
          )
          Icon(
            :big="true"
          )
          Icon(
            :big="true"
          )
          Icon(
          )
</template>

<script>
import Amount from '@components/amount/Amount'
import Control from '@components/control/Control'
import Icon from '@components/icon/Icon'

export default {
  components: { Amount, Control, Icon }
}
</script>
