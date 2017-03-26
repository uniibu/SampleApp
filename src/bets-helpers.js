import {formatCurrency, formatDecimal, formatTarget} from './helpers'
import moment from 'moment'

export const createBet = (item) => {
  const payout = formatDecimal(99 / item.Chance, 8)

  return {
    BetId: item.Id,
    Player: item.UserName,
    Time: moment(item.BetDate).format('HH:mm:ss'),
    BetAmount: item.BetAmount,
    Payout: payout,
    Target: formatTarget(item.Chance, item.Target),
    Roll: item.Roll,
    Profit: item.Profit,
    Currency: formatCurrency(item.Currency)
  }
}

export const addToBetsList = (bet, list) => {
  if (list.length > 0) {
    list.splice(0, 0, bet)
    if (list.length > 50) {
      list.splice(-1, 1)
    }
  } else {
    list.push(bet)
  }
}
