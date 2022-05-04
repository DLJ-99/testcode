// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from './components/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`${name}`, components[key])
})
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(JsonViewer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})// 加载公共组件
