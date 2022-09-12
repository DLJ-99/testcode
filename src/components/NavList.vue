<template>
  <div id="nav-list">
    <ul class="routers">
      <li v-for="(item,index) in navArr" :key="index"><router-link :to="{name:item.name}">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import nav from '../router/index'
export default {
  name: 'NavList',
  data () {
    return {
      navArr: nav.options.routes
    }
  }
}
</script>

<style>
.router-link-exact-active.router-link-active{
  color: blueviolet;
}
</style>
