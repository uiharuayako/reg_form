import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import Axios from "axios";
Vue.use(Antd);
Vue.config.productionTip = false
Axios.defaults.baseURL = '/api'
Vue.prototype.$axios = Axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
