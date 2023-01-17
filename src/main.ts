import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Purecss from 'purecss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  components: { Purecss }
}).$mount('#app');

(() => {
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = "canonical";
  const url = new URL("https://nipp.nwtgck.org");
  url.hash = location.hash;
  canonicalLink.href = url.toString();
  document.head.appendChild(canonicalLink);
})();
