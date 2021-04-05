import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'office-ui-fabric-vue/dist/index.css'
import OfficeUIFabricVue from 'office-ui-fabric-vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
  baseURL: 'http://163.47.115.230:30000/api/'
})

Vue.use(OfficeUIFabricVue)

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

