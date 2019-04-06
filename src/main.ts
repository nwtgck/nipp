import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Purecss from 'purecss';
import * as VueCodemirror from 'vue-codemirror';

Vue.config.productionTip = false;

// (from: https://github.com/surmon-china/vue-codemirror)
// you can set default global options and events when use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */);

new Vue({
  render: h => h(App),
  components: { Purecss }
}).$mount('#app')
