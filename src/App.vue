<template>
  <div id="app">
     <Head/>
     <Tab/>
     <keep-alive>
       <router-view></router-view>
       </keep-alive>
  </div>
</template>

<script>
import Head from './components/head/head'
import Tab from './components/tab/tab'
export default {
  name: 'app',
  components: {
    Head,
    Tab
  }
}
</script>
<style>
@import "./common/css/iconfont.css";  
@import "./common/css/index.scss";  
</style>
