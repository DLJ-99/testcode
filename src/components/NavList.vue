<template>
  <div id="nav-list">
    <ul class="routers">
      <li v-for="(item,index) in navArr" :key="index" :class="{navCurrent:currentNavName==item.name}"><router-link :to="{name:item.name}">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import nav from '../router/index'
export default {
  name: 'NavList',
  data () {
    return {
      navArr: nav.options.routes,
      currentNavName: nav.history.current.name
    }
  },
  mounted () {
    console.log('currentNav', nav)
  }
}
</script>

<style>

</style>
