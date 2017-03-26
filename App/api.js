import axios from "axios";
import Cookies from "js-cookie";
import toastr from "toastr";
import Settings from "./settings";

const headers = () => ({headers: {'Authorization': 'Bearer ' + Cookies.get('token')}});

export default {
  bet(chance, betAmount, target, currency) {
    return axios.post(Settings.ApiBase + 'api/dice/bet?appId=' + Settings.AppId + '&chance=' + chance + '&betAmount=' + betAmount + '&target=' + target + '&currency=' + currency, {}, {headers: {'Authorization': 'Bearer ' + Cookies.get('token')}}).catch(function (error) {
      if (error.response) {
        if (error.response.status === 401)
          toastr.error("You must be logged in");
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  logout() {
    return axios.post(Settings.ApiBase + 'api/logout?appId=' + Settings.AppId, {}, headers()).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  getBalance(currency){
    return axios.get(Settings.ApiBase + 'api/account/balance?currency=' + currency + '&appId=' + Settings.AppId, headers()).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  getDiceSeed(clientSeed){
    return axios.get(Settings.ApiBase + 'api/dice/getseed?appId=' + Settings.AppId + '&clientSeed=' + clientSeed, headers()).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  saveClientSeed(clientSeed){
    return axios.post(Settings.ApiBase + 'api/dice/saveClientSeed?appId=' + Settings.AppId + '&clientSeed=' + clientSeed, {}, headers()).catch(function (error) {
      if (error.response) {
        if (error.response.status === 401)
          toastr.error("You must be logged in");
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  generateNewServerSeed(clientSeed) {
    return axios.post(Settings.ApiBase + 'api/dice/generateNewServerSeed?appId=' + Settings.AppId + '&clientSeed=' + clientSeed, {}, headers()).catch(function (error) {
      if (error.response) {
        if (error.response.status === 401)
          toastr.error("You must be logged in");
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  getStats(currency){
    return axios.get(Settings.ApiBase + 'api/stats/getstats?currency=' + currency + '&appId=' + Settings.AppId).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  },
  loadState(currency, clientSeed){
    let bearerHeaders = {};
    if (Cookies.get('token') !== undefined) {
      bearerHeaders = headers();
    }

    return axios.get(Settings.ApiBase + 'api/app/loadstate?currency=' + currency + '&appId=' + Settings.AppId + '&clientSeed=' + clientSeed, bearerHeaders).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error', error.message);
      }
    });
  }
};