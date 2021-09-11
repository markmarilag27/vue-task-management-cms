import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { validateXsrfToken, validateAuthUserToken } from './services/auth'
import './assets/tailwind.css'

// is development mode
const isDev = process.env.NODE_ENV === 'development'

// https://vuejs.org/v2/api/#productionTip
Vue.config.productionTip = false

// https://vuejs.org/v2/api/#performance
Vue.config.performance = isDev

// https://vuejs.org/v2/api/#devtools
// https://github.com/vuejs/vue-devtools
// Configure whether to allow vue-devtools inspection.
Vue.config.devtools = isDev

// https://vuejs.org/v2/api/#silent
// Suppress all Vue logs and warnings.
Vue.config.silent = !isDev

// assign app name from env
Vue.prototype.$appName = process.env.VUE_APP_NAME

// request XSRF-TOKEN
validateXsrfToken()

// attempt to re-authenticate if the auth token is still
// initialize it before rendering to prevent flickering
store.dispatch('auth/setUser', validateAuthUserToken())
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
