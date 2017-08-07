import Vue from 'vue'
import App from './App.vue'
import { Select, Option } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueElementBankCardSelect  from './lib/index'
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.use(VueElementBankCardSelect)

new Vue({
  el: '#app',
  render: h => h(App)
})
