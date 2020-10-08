import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Axios from 'axios'
import {API_URL, STATIC_PATH} from './config'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.prototype.$http = Axios;

const token = localStorage.getItem('auth-token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

//Vue.prototype.$http.defaults.headers.common['Origin'] = 'frontend'

Vue.prototype.$http.defaults.baseURL = API_URL;

Vue.prototype.$config = {
        apiUrl: API_URL,
        staticPath: STATIC_PATH
}

let app

if (!app) {
  app = new Vue({
    router,
    vuetify,
    store,
    config: () => {
      return {
        apiUrl: API_URL,
        staticPath: STATIC_PATH
      }
    },
    render: h => h(App)
  }).$mount('#app')
}
