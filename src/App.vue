<template>
  <div id="app">
    <router-link to="/"> 홈 </router-link>
    <router-link to="Board"> 게시판 </router-link>
    <router-link to="Rental"> 대여장부 </router-link>
    <router-link v-if="!isLogged" to="Login"> 로그인 </router-link>
    <span v-else>
    <a href="" @click="logOut"> 로그아웃 </a>
    <router-link to="MyPage"> 마이페이지 </router-link>
    </span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLogged: function(){
      return this.$store.getters.isLogged
    },
    getId(){
      return this.$store.getters.getId
    },
    getToken(){
      return this.$store.getters.getToken
    }
  },
  methods: {
    logOut: function(){
      this.$store.commit('logOut')
    }
  }
}
</script>

<style>
@import './assets/noty.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
