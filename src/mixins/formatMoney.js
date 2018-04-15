import accounting from '../libs/accounting.min'

accounting.settings = {
  currency: {
    symbol: '',
    format: '%v',
    decimal: '.',
    thousand: ' ',
    precision: 0
  },
  number: {
    precision: 0,
    thousand: ',',
    decimal: '.'
  }
}

const getSymbol = (currency) => {
  switch (currency) {
    case 'USD':
      return '$'
    case 'RUB':
      return '₽'
    case 'EUR':
      return '€'
    case 'IDR':
      return 'Rp'
    case 'THB':
      return '฿'
    default:
      return ''
  }
}

export default {
  methods: {
    formatMoney(sum, currency) {
      if (currency) {
        const symbol = getSymbol(currency)
        return {
          price: accounting.formatMoney(sum),
          symbol: symbol
        }
      }
      return {}
    }
  }
}
