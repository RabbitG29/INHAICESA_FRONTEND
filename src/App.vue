<template>
  <div id="app">
    <router-link to="/"> 홈 </router-link>
    <router-link to="Board"> 게시판 </router-link>
    <router-link to="Rental"> 대여장부 </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
