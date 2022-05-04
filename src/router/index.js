import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HuaRongDao from '@/components/HuaRongDao'
import Firework from '@/components/Firework'
import JsonViewer from '@/components/JsonViewer'
import '../style/common.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/HuaRongDao',
      name: 'HuaRongDao',
      component: HuaRongDao
    },
    {
      path: '/JsonViewer',
      name: 'JsonViewer',
      component: JsonViewer
    },
    {
      path: '/Firework',
      name: 'Firework',
      component: Firework
    }
  ]
})
