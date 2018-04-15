<script>
import { mapGetters } from 'vuex'
import CategoryItem from '@components/categories/CategoryItem'
import Slider from '@components/slider/Slider'

export default {
  components: {
    CategoryItem,
    Slider
  },

  props: {
    showLastUsed: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters([
      'categoriesRootIds',
      'lastUsedCategoriesIds'
    ])
  },

  methods: {
    onClickCategory(categoryId) {
      if (this.$listeners.onClickCategory) {
        this.$listeners.onClickCategory(categoryId)
        return
      }

      this.$store.commit('setTrnForm', {
        categoryId,
        show: true
      })
    }
  }

}
</script>

<template lang="pug">
.categoriesList
  //- Last
  template(v-if="showLastUsed && categoriesRootIds.length > 5")
    .categoriesListIcons
      template(v-for="categoryId of lastUsedCategoriesIds")
        CategoryItem(
          :id="categoryId"
          v-on:onClickCategory="onClickCategory"
        )

  //- All
  template(v-if="showTitle")
    h1.title._side All categories
  .categoriesListIcons
    template(v-for="categoryId of categoriesRootIds")
      CategoryItem(
        :id="categoryId"
        v-on:onClickCategory="onClickCategory"
      )
</template>
