import moment from 'moment'
import localforage from 'localforage'
import { uuid } from '@/store/utils'

export const formatTrnForDb = props => ({
  accountId: props.accountId,
  amount: Math.abs(props.amount),
  categoryId: props.categoryId,
  date: props.date,
  description: props.description,
  type: props.type
})

export const createIdForTrn = date => {
  return `${moment(date).format('YY-MM-DD[_]H:mm:ss')}__${uuid()}`
}

export const addOrUpdateTrnToLocalStorage = async (payload) => {
  const trns = await localforage.getItem('trns') || {}
  await localforage.setItem('trns', {
    ...trns,
    [payload.id]: payload.data
  })
}

export const saveTrnToOfflineList = async (payload) => {
  let trns = await localforage.getItem('trnsOfflineAdded') || {}
  await localforage.setItem('trnsOfflineAdded', {
    ...trns,
    [payload.id]: payload.data
  })
}

// Удалить транзакцию из списка с транзакциями удаленными офлайн
export const removeTrnFromOfflineAddedTrnsLocalStore = async (id) => {
  const trns = await localforage.getItem('trnsOfflineAdded') || {}
  delete trns[id]
  await localforage.setItem('trnsOfflineAdded', { ...trns })
}
