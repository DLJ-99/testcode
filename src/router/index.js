import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HuaRongDao from '@/components/HuaRongDao'
import Firework from '@/components/Firework'
import line1 from '@/components/echarts-instance/line1'
import pie2 from '@/components/echarts-instance/pie2'
import snow from '@/components/snow'
import tree from '@/components/tree'
import screen from '@/components/screen'
import LegendSelf from '@/components/LegendSelf'
import Swiper from '@/components/Swiper'
import Time from '@/components/Time'

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
    },
    {
      path: '/line1',
      name: 'line1',
      component: line1
    }, {
      path: '/pie2',
      name: 'pie2',
      component: pie2
    }, {
      path: '/snow',
      name: 'snow',
      component: snow
    }, {
      path: '/tree',
      name: 'tree',
      component: tree
    }
    , {
      path: '/screen',
      name: 'screen',
      component: screen
    }
    , {
      path: '/LegendSelf',
      name: 'LegendSelf',
      component: LegendSelf
    },
    {
      path: '/Swiper',
      name: 'Swiper',
      component: Swiper
    },
    {
      path: '/Time',
      name: 'Time',
      component: Time
    },
  ]
})
