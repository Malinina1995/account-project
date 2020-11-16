import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilters from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'

import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.filter('date', dateFilters)
Vue.use(Vuelidate)
Vue.use(messagePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyDOTvRvxQrlFEum3I8SP9Y2Q2MV0p_VYJM",
  authDomain: "account-project-fa1a6.firebaseapp.com",
  databaseURL: "https://account-project-fa1a6.firebaseio.com",
  projectId: "account-project-fa1a6",
  storageBucket: "account-project-fa1a6.appspot.com",
  messagingSenderId: "557346548907",
  appId: "1:557346548907:web:4bd70bbd94cd8caaf15bee",
  measurementId: "G-GM0VCTJ79C"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

