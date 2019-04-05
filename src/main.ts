import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Purecss from 'purecss';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: { Purecss }
}).$mount('#app')
