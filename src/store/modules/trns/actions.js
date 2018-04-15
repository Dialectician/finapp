import localforage from 'localforage'
import {
  createIdForTrn,
  formatTrnForDb,
  saveTrnToOfflineList,
  addOrUpdateTrnToLocalStorage,
  removeTrnFromOfflineAddedTrnsLocalStore
} from '@/store/modules/trns/utils'
import { db } from '@/store/firebase'

export default {
  // Add or Update
  async addOrUpdateTrn({ commit, rootState }, payload) {
    const result = {
      status: null,
      error: null
    }
    try {
      const formatedTrnValues = formatTrnForDb(payload.data)
      const id = payload.id ? payload.id : createIdForTrn(this.date)
      saveTrnToOfflineList({ id, data: formatedTrnValues })
      addOrUpdateTrnToLocalStorage({ id, data: formatedTrnValues })
      if (payload.id) {
        console.log('up1')
        commit('updateTrnToStore', { id, data: formatedTrnValues })
      } else {
        commit('addTrnToStore', { id, data: formatedTrnValues })
      }

      if (rootState.appConnected) {
        result.status = 'online'
        result.error = null
        db.ref(`users/${rootState.user.user.uid}/trns/${id}`)
          .set(formatedTrnValues)
          .then(removeTrnFromOfflineAddedTrnsLocalStore(id))
      } else {
        result.status = 'offline'
        result.error = null
      }
      return result
    } catch (e) {
      console.error(e)
      result.status = 'error'
      result.error = e.message
      return result
    }
  },

  // Add trns to store
  async addOrUpdateTrnsToStore({ commit, state }, trns) {
    commit('addOrUpdateTrnsToStore', trns || {})
    localforage.setItem('trns', trns || {})
  },

  // Delete
  async deleteTrn({ commit, rootState }, id) {
    const trnsOfflineDeleted = await localforage.getItem('trnsOfflineDeleted') || []
    await localforage.setItem('trnsOfflineDeleted', [
      ...trnsOfflineDeleted,
      id
    ])

    const localTrns = await localforage.getItem('trns') || {}
    delete localTrns[id]
    await localforage.setItem('trns', { ...localTrns })

    commit('delereTrnFromStore', id)

    await db.ref(`users/${rootState.user.user.uid}/trns/${id}`)
      .remove()
      .then(async () => {
        const trnsOfflineDeleted = await localforage.getItem('trnsOfflineDeleted') || {}
        if (trnsOfflineDeleted && trnsOfflineDeleted.length) {
          await localforage.setItem('trnsOfflineDeleted',
            trnsOfflineDeleted.filter(trnId => trnId !== id)
          )
        }
      })
  }
}
