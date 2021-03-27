# koshinto_fe

## How this project was scafolded.
```
vue create koshinto_fe
cd koshinto_fe
vue add router
vue add vuetify

npm install --save firebase
npm install --save firebaseui
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Running Site
https://koshinto.uedasoft.com/

## Settings

### Firebase
1. Pass firebase configration by environment variables as follows:
- VUE_APP_apiKey
- VUE_APP_authDomain
- VUE_APP_databaseURL
- VUE_APP_projectId
- VUE_APP_storageBucket
- VUE_APP_messagingSenderId
- VUE_APP_appId

You can use .env.local file on the top of local environment, or Server environment.

2. Add the domain on which this this application running, to the white list of firebase auth. Detail is as [here](https://qiita.com/UedaTakeyuki/items/f2553f540b0bf145177b).
