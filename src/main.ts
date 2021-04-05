import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'office-ui-fabric-vue/dist/index.css'
import OfficeUIFabricVue from 'office-ui-fabric-vue'

Vue.use(OfficeUIFabricVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
