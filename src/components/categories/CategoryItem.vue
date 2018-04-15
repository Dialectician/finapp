<script>
import Icon from '@components/icon/Icon'
import CategoryItem from '@components/categories/CategoryItem'
import ModalBottom from '@components/modal/ModalBottom'

export default {
  name: 'CategoryItem',

  components: {
    Icon,
    CategoryItem,
    ModalBottom
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({
    isShowChild: false
  }),

  computed: {
    category() {
      return this.$store.state.categories.categories[this.id]
    },

    childCategoriesIds() {
      return this.getChildCategoriesIdsByParentId(this.id)
    }
  },

  methods: {
    getChildCategoriesIdsByParentId(parentId) {
      // console.log('categoryItem: getChildCategoriesIdsByParentId')
      if (this.category.parentId === 0) {
        return [...this.$store.getters.categoriesChildIds]
          .filter(key => this.$store.state.categories.categories[key].parentId === parentId)
          .sort((a, b) => {
            if (this.$store.state.categories.categories[a].name < this.$store.state.categories.categories[b].name) return -1
            if (this.$store.state.categories.categories[a].name > this.$store.state.categories.categories[b].name) return 1
            return 0
          })
      }
      return []
    },

    onClickCategory(categoryId) {
      // Parent category does not return categoryId
      if (this.childCategoriesIds.length && !categoryId) {
        this.isShowChild = true
        return
      }

      if (this.$listeners.onClickCategory) {
        this.$listeners.onClickCategory(categoryId || this.id)
        this.isShowChild = false
      }
    }
  }
}
</script>

<template lang="pug">
.categoryItem(
  @click="onClickCategory()"
  :style="{ background: category && category.color }"
)
  template(v-if="category")
    .categoryItem__icon
      Icon(
        :icon="category.icon"
        :background="category.color"
        :round="true"
      )
    .categoryItem__content
      .categoryItem__content-name {{ category.name }}
      template(v-if="childCategoriesIds.length")
        .categoryItem__content-child
          .mdi.mdi-chart-bubble
          | {{ childCategoriesIds.length }}

    slot()

    ModalBottom(
      :isShow="isShowChild"
      :showOverflow="true"
      v-on:onClose="isShowChild = false"
    )
      template(v-if="isShowChild")
        template(slot="header")
          .modalBottom__header
            .modalBottom__name {{ category.name }}
            template(v-if="childCategoriesIds.length")
              .modalBottom__child
                .mdi.mdi-chart-bubble
                | {{ childCategoriesIds.length }}
            .modalBottom__icon
              Icon(
                :icon="category.icon"
                :big="true"
                :round="true"
                :background="category.color"
              )

        template(slot="content")
          .categoriesListIcons
            template(v-for="categoryId of childCategoriesIds")
              CategoryItem(
                :id="categoryId"
                v-on:onClickCategory="onClickCategory"
              )
</template>
