import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
