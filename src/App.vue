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
          <a>학과 소개</a>
          <div class="dde">
            <router-link to="Curriculum">교육과정</router-link>
            <router-link to="Completion">이수체계도</router-link>
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
        <div class="ddm">
          <a>관련 사이트</a>
          <div class="dde">
            <a href="http://www.inha.ac.kr" target="_blank"> 인하대학교 </a>
            <a href="http://ice.inha.ac.kr" target="_blank"> 정보통신공학과 </a>
            <a href="http://sugang.inha.ac.kr" target="_blank"> 수강신청 </a>
            <a href="http://portal.inha.ac.kr" target="_blank"> 포털사이트 </a>
            <a href="http://abeek.inha.ac.kr" target="_blank"> 공학인증 </a>
            <a href="http://certpia.inha.ac.kr" target="_blank"> 증명서발급 </a>
          </div>
        </div>
      </div>
    </div>
    <hr>

    <router-view/>

    <div id="footer">
      <small>이곳은 Footer 입니다.</small>
      <br>
      <small>ⓒcopyright 2018 developed by 권동현, 장수빈, 전수현, 최유진, 최진우</small>
      <br>
      <small>18대 정보통신공학과 학생회 생생정보통신</small>
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
  display: flex;
  z-index: 10;
}
#main-menu {
  background: white;
}
#main-menu a {
  box-sizing: border-box;
  width: 110px;
  padding: 5px;
  color: black;
  background: white;
}
.dde {
  position: absolute;
  background: white;
}
.dde a{
  display: none;
}


.ddm:hover .dde a{
  position: relative;
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
