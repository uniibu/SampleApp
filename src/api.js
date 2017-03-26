import axios from 'axios'
import Cookies from 'js-cookie'
import toastr from 'toastr'
import Settings from './settings'

const headers = () => ({ headers: { Authorization: `Bearer ${Cookies.get('token')}` } })

export default {
  bet (chance, betAmount, target, currency) {
    return axios.post(`${Settings.ApiBase}api/dice/bet?appId=${Settings.AppId}&chance=${chance}&betAmount=${betAmount}&target=${target}&currency=${currency}`, {}, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toastr.error('You must be logged in')
        }
      }
    })
  },
  logout () {
    return axios.post(`${Settings.ApiBase}api/logout?appId=${Settings.AppId}`, {}, headers())
  },
  getBalance (currency) {
    return axios.get(`${Settings.ApiBase}api/account/balance?currency=${currency}&appId=${Settings.AppId}`, headers())
  },
  getDiceSeed (clientSeed) {
    return axios.get(`${Settings.ApiBase}api/dice/getseed?appId=${Settings.AppId}&clientSeed=${clientSeed}`, headers())
  },
  saveClientSeed (clientSeed) {
    return axios.post(`${Settings.ApiBase}api/dice/saveClientSeed?appId=${Settings.AppId}&clientSeed=${clientSeed}`, {}, headers()).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toastr.error('You must be logged in')
        }
      }
    })
  },
  generateNewServerSeed (clientSeed) {
    return axios.post(`${Settings.ApiBase}api/dice/generateNewServerSeed?appId=${Settings.AppId}&clientSeed=${clientSeed}`, {}, headers()).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toastr.error('You must be logged in')
        }
      }
    })
  },
  getStats (currency) {
    return axios.get(`${Settings.ApiBase}api/stats/getstats?currency=${currency}&appId=${Settings.AppId}`)
  },
  loadState (currency, clientSeed) {
    let bearerHeaders = {}
    if (Cookies.get('token') !== undefined) {
      bearerHeaders = headers()
    }

    return axios.get(`${Settings.ApiBase}api/app/loadstate?currency=${currency}&appId=${Settings.AppId}&clientSeed=${clientSeed}`, bearerHeaders)
  }
}
