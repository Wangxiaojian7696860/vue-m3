<template>
  <div id="app">
     <Head/>
     <Tab/>
     <keep-alive>
       <router-view></router-view>
       </keep-alive>
	   <player></player>
  </div>
</template>

<script>
import Head from './components/head/head'
import Tab from './components/tab/tab'
import player from './components/player/player'
export default {
  name: 'app',
  components: {
    Head,
    Tab,
	player
  }
}
</script>
<style>
@import "./common/css/iconfont.css";  
@import "./common/css/index.scss";  
</style>
