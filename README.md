# Betking sample app

Note all urls here and in settings.js are for the preview 1 release.
These will need to be changed when the site goes live in production.

## Create your app

Register an account on http://bkp1.azurewebsites.net/   

Create a new app on http://bkp1.azurewebsites.net/apps

## Configure your app

Change settings in the index.html file
You will see your App Id on the apps page 

```javascript
settings = {
  AppId: 'APP_ID',
  AppName: 'NAME_OF_YOUR_APP',
  AppUrl: 'URL_OF_YOUR_APP'
}
```

## Run your app

Deploy your app on Github, Heroku or your own server.