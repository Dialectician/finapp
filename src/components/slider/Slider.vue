<template lang="pug">
.swiper-container
  .swiper-wrapper
    slot
</template>

<script>
import { mapGetters } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    slidesPerColumn: {
      type: Number,
      default: 1
    },
    slidesPerView: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      swiper: null,
      options: {
        autoHeight: this.autoHeight,
        direction: this.direction,
        slidesPerColumn: this.slidesPerColumn,
        slidesPerView: this.slidesPerView,
        on: {
          slideChangeTransitionStart() {
            // this.realIndex
          }
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'mobileDashboardActiveTab'
    ])
  },

  watch: {
    mobileDashboardActiveTab() {
      if (this.mobileDashboardActiveTab === 'stat' || this.mobileDashboardActiveTab === 'history') {
        this.swiper.update()
      }
    }
  },

  mounted() {
    this.swiper = new Swiper(this.$el, this.options)
  }
}
</script>
