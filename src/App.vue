<template>
  <div id="app">
    <div id="header">
      <div id="login-menu">
        <router-link v-if="!isLogged" to="Login"> 로그인 </router-link>
        <span v-else>
          <a href="" @click="logOut"> 로그아웃 </a>
          <router-link to="MyPage"> 마이페이지 </router-link>
        </span>
      </div>
      <div id="main-menu">
        <router-link to="/"> 홈 </router-link>
        <div class="ddm">
          <a>학생회 소개</a>
          <div class="dde">
            <router-link to="Organ"> 학생회 조직도 </router-link>
            <router-link :to="{ name: 'Board', query: { boardId: 3 } }"> 학칙 </router-link>
          </div>
        </div>
        <div class="ddm">
          <a>게시판</a>
          <div class="dde"> <!-- Drop Down Menu-->
            <router-link :to="{ name: 'Board', query: { boardId: 6 } }"> 공지사항 </router-link>
            <router-link :to="{ name: 'Board', query: { boardId: 1 } }"> FAQ </router-link>
            <router-link :to="{ name: 'Board', query: { boardId: 2 } }"> 건의게시판 </router-link>
            <router-link :to="{ name: 'Board', query: { boardId: 4 } }"> 회의록 </router-link>
            <router-link :to="{ name: 'Board', query: { boardId: 5 } }"> 결산내역 </router-link>
          </div>
        </div> 
        <router-link to="Rental"> 대여장부 </router-link>
      </div>
    </div>
    <hr>

    <router-view/>

    <div id="footer">
      <small>이곳은 Footer 입니다.</small>
      <br>
      <small>추후에 사이트맵 / 즐겨찾기 / 사이트 정보 추가</small>
    </div>
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

<style>
#login-menu {
  float:right;
  margin-right: 10px;
  font-size: 12px;
}
#main-menu a {
  box-sizing: border-box;
  width: 110px;
  margin: 5px;
  color: black;
  z-index: 9999;
}
.dde {
  position: absolute;
  background: white;
}
.dde a{
  display: none;
}


.ddm:hover .dde a{
  display: block;
  z-index: 10;
}
.dde:hover a{
  display: lightgrey;
}
.ddm {
  display: inline-block;
}
#menu {
}
#footer {
  background: rgb(220,220,220);
  color: black;
  height: 100px;
}
</style>