import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import Axios from "axios";
Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
