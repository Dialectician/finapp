import moment from 'moment'

export const formatDate = (value, type) => {
  const date = moment(+value)
  if (type === 'full') {
    return {
      day: date.format('D'),
      weekDay: date.calendar(null, {
        sameDay: '[Today] ddd',
        nextDay: '[Tomorrow] ddd',
        nextWeek: 'dddd',
        lastDay: '[Yesterday] ddd',
        lastWeek: 'dddd',
        sameElse: 'dddd'
      }),
      month: date.format('MMM'),
      year: date.format('YYYY')
    }
  }
  return date.format('D MMMM YY')
}
