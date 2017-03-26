const existingSettings = {
  AppId: window.settings && window.settings.AppId,
  AppName: window.settings && window.settings.AppName,
  AppUrl: window.settings && window.settings.AppUrl
}

export default {
  AppId: existingSettings.AppId || 1,
  AppName: existingSettings.AppName || 'BK Sample App',
  AppUrl: existingSettings.AppUrl || 'http://localhost:1234/',
  ApiBase: 'http://bkp1api.azurewebsites.net/',
  SocketUrl: 'http://bkp1api.azurewebsites.net/signalr',
  BetKingUrlBase: 'http://bkp1.azurewebsites.net/',
  RegisterUrl: 'account/register',
  LoginUrl: 'account/login',
  AccountManageUrl: 'manage/index'
}
