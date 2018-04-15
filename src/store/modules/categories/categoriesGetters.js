export default {
  /**
    * All Categories IDs
    * @returns {array}
  */
  categoriesIds(state) {
    // console.log('categories: categoriesIds')
    return Object.keys(state.categories)
  },

  /**
    * Root categories IDs sorted by name
    * @returns {array}
  */
  categoriesRootIds(state, getters) {
    // console.log('categories: categoriesRootIds')
    return [...getters.categoriesIds]
      .filter(key => state.categories[key].parentId === 0)
      .sort((a, b) => {
        if (state.categories[a].name < state.categories[b].name) return -1
        if (state.categories[a].name > state.categories[b].name) return 1
        return 0
      })
  },

  categoriesChildIds(state, getters) {
    // console.log('categories: categoriesChildIds')
    return [...getters.categoriesIds]
      .filter(key => state.categories[key].parentId !== 0)
      .sort((a, b) => {
        if (state.categories[a].name < state.categories[b].name) return -1
        if (state.categories[a].name > state.categories[b].name) return 1
        return 0
      })
  },

  transferCategoryId(state, getters) {
    // console.log('categories: transferCategoryId')
    return getters.categoriesIds
      .find(key => state.categories[key].name === ('Перевод' || 'Transfer'))
  },

  lastUsedCategoryId(state, getters, rootState, rootGetters) {
    // console.log('categories: lastUsedCategoryId')
    const lastTrnId = [...rootGetters.trnsIds]
      .sort((a, b) => {
        if (rootState.trns.trns[a].date > rootState.trns.trns[b].date) return -1
        if (rootState.trns.trns[a].date < rootState.trns.trns[b].date) return 1
        return 0
      })
      .slice(0, 1)
    if (!lastTrnId.length) return null
    return rootState.trns.trns[lastTrnId].categoryId
  },

  lastUsedCategoriesIds(state, getters, rootState, rootGetters) {
    // console.log('categories: lastUsedCategoriesIds')
    if (getters.categoriesIds.length && rootGetters.trnsIds.length) {
      const trnsIds = [...rootGetters.trnsIds]
        .sort((a, b) => {
          if (rootState.trns.trns[a].date > rootState.trns.trns[b].date) return -1
          if (rootState.trns.trns[a].date < rootState.trns.trns[b].date) return 1
          return 0
        })
        .slice(0, 30)

      const lastCategoriesIds = []
      for (const trnId of trnsIds) {
        if (lastCategoriesIds.length < 12) {
          const categoryId = rootState.trns.trns[trnId].categoryId
          if (!lastCategoriesIds.includes(categoryId)) {
            lastCategoriesIds.push(categoryId)
          }
        }
      }

      const sortedLastCategoriesIds = [...lastCategoriesIds]
        .sort((a, b) => {
          if (state.categories[a].name < state.categories[b].name) return -1
          if (state.categories[a].name > state.categories[b].name) return 1
          return 0
        })
      return sortedLastCategoriesIds
    }
  }
}
