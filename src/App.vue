<template>
    <div id="app">
        <div id="header">
            <div id="login-box">
                <div id="login-menu">
                    <router-link v-if="!isLogged" to="Login"> 로그인 </router-link>
                    <span v-else>
                    <a href="" @click="logOut"> 로그아웃 </a>
                    <router-link to="MyPage"> 마이페이지 </router-link>
                  </span>
                </div>
            </div>
            <div class="header">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div id="navigation">
                                  <a href="/"><img src="./components/home.png" width="70%" hspace=30/></a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-4 col-sm-12 col-xs-12">
                            <div class="navigation">
                                <div id="navigation">
                                    <ul>
                                        <li class="active">
                                            <router-link to="/"> 홈 </router-link>
                                        </li>
                                        <li class="has-sub"><a href="#">학생회 소개</a>
                                            <ul>
                                              <li>
                                                  <router-link to="SaIntro"> 학생회 소개 </router-link>
                                              </li>
                                                <li>
                                                    <router-link :to="{ name: 'Organ'}"> 학생회 조직도 </router-link>
                                                </li>
                                                <li>
                                                    <router-link :to="{ name: 'PostViewer', query: { id: 72 } }"> 학칙 </router-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="has-sub"><a href="#">학과 소개</a>
                                            <ul>
                                                <li>
                                                    <router-link to="Curriculum">교육과정</router-link>
                                                </li>
                                                <li>
                                                    <router-link to="Completion">이수체계도</router-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="has-sub"><a href="#">게시판</a>
                                            <ul>
                                                <li>
                                                    <router-link :to="{ name: 'Board', query: { boardId: 6 } }"> 공지사항 </router-link>
                                                </li>
                                                <li>
                                                    <router-link :to="{ name: 'Board', query: { boardId: 1 } }"> FAQ </router-link>
                                                </li>
                                                <li>
                                                    <router-link :to="{ name: 'Board', query: { boardId: 2 } }"> 건의게시판 </router-link>
                                                </li>

                                            </ul>
                                        </li>
                                        <li class="has-sub"><a href="#">정보마당</a>
                                          <ul>
                                            <li>
                                                <router-link :to="{ name: 'Rental'}"> 대여장부 </router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'TimeTable'}">시간표</router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'Board', query: { boardId: 4 } }"> 회의록 </router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'Board', query: { boardId: 5 } }"> 결산내역 </router-link>
                                            </li>
                                          </ul>
                                        </li>
                                        <li><a href="#" title="Contact Us">관련 사이트</a>
                                            <ul>
                                                <li><a href="http://www.inha.ac.kr" target="_blank"> 인하대학교 </a></li>
                                                <li><a href="http://ice.inha.ac.kr" target="_blank"> 정보통신공학과 </a></li>
                                                <li><a href="http://sugang.inha.ac.kr" target="_blank"> 수강신청 </a></li>
                                                <li><a href="http://portal.inha.ac.kr" target="_blank"> 포털사이트 </a></li>
                                                <li><a href="http://abeek.inha.ac.kr" target="_blank"> 공학인증 </a></li>
                                                <li><a href="http://certpia.inha.ac.kr" target="_blank"> 증명서발급 </a></li>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <router-view/>

        <div id="footer">
            <small>(22212) 인천광역시 미추홀구 인하로 100 인하대학교 하이테크센터 고층부 지하1층</small>
            <br>
            <small>ⓒcopyright 2018 developed by 권동현, 장수빈, 전수현, 최유진, 최진우 All Rights Reserved</small>
            <br>
            <small>18대 정보통신공학과 학생회 생생정보통신</small>
            <br>
            <small>Tel) 학생회장 권동현 : 010-2958-8370 학생부회장 박윤수 : 010-5004-4314</small>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        isLogged: function() {
            return this.$store.getters.isLogged
        },
        getId() {
            return this.$store.getters.getId
        },
        getToken() {
            return this.$store.getters.getToken
        }
    },
    methods: {
        logOut: function() {
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
}

.modal-container {
    padding: 20px;
}
</style>

<style scoped>
#login-box {
    height: 30px;
    background-color: #0eb769;
}

#login-menu {
    float: right;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 15px;
    display: relative;
    color: white;
    z-index: 10;
}

#login-menu a {
    color: white;
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

.dde a {
    display: none;
}

.ddm:hover .dde a {
    position: relative;
    display: block;
    z-index: 10;
}

.dde:hover a {
    display: lightgrey;
}

.ddm {
    display: inline-block;
}

#menu {}

#footer {
    background: rgb(220, 220, 220);
    color: black;
    height: 100px;
}

#navigation,
#navigation ul,
#navigation ul li,
#navigation ul li a,
#navigation #menu-button {
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
    line-height: 1;
    display: block;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

#navigation:after,
#navigation>ul:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
}

#navigation #menu-button {
    display: none;
}

#navigation {
    margin-top: 10px;
}

#navigation>ul>li {
    float: left;
}

#navigation.align-center>ul {
    font-size: 0;
    text-align: center;
}

#navigation.align-center>ul>li {
    display: inline-block;
    float: none;
}

#navigation.align-center ul ul {
    text-align: left;
}

#navigation.align-right>ul>li {
    float: right;
}

#navigation>ul>li>a {
    padding: 15px 25px;
    font-size: 14px;
    color: #474747;
    position: relative;
    z-index: 999;
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
}

#navigation>ul>li:hover>a {
    color: #ffffff;
    background-color: #0eb769;
}

#navigation>ul>li.has-sub>a {
    padding-right: 32px;
}

/*#navigation > ul > li.has-sub > a:after {
 position: absolute;
 top: 22px;
 right: 11px;
 width: 8px;
 height: 2px;
 display: block;
 background: #dddddd;
 content: '';
}*/

#navigation>ul>li.has-sub>a:before {
    position: absolute;
    right: 14px;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
}

/*#navigation > ul > li.has-sub:hover > a:before {
 top: 23px;
 height: 0;
}*/

#navigation ul ul {
    position: absolute;
    left: -9999px;
}

#navigation.align-right ul ul {
    text-align: right;
}

#navigation ul ul li {
    height: 0;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
}

#navigation li:hover>ul {
    left: auto;
}

#navigation.align-right li:hover>ul {
    left: auto;
    right: 0;
}

#navigation li:hover>ul>li {
    height: 47px;
}

#navigation ul ul ul {
    margin-left: 100%;
    top: 0;
}

#navigation.align-right ul ul ul {
    margin-left: 0;
    margin-right: 100%;
}

#navigation ul ul li a {
    padding: 16px;
    width: 170px;
    font-size: 14px;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    background: #0eb769;
    text-transform: uppercase;
    border-bottom: 2px solid #069c57;
}

#navigation ul ul li:last-child>a,
#navigation ul ul li.last-item>a {
    border-bottom: 0;
}

#navigation ul ul li:hover>a,
#navigation ul ul li a:hover {
    color: #ffffff;
    background-color: #0eb769;
}

#navigation ul ul li.has-sub>a:after {
    position: absolute;
    top: 16px;
    right: 11px;
    width: 8px;
    height: 2px;
    display: block;
    background: #dddddd;
    content: '';
}

#navigation.align-right ul ul li.has-sub>a:after {
    right: auto;
    left: 11px;
}

#navigation ul ul li.has-sub>a:before {
    position: absolute;
    top: 13px;
    right: 14px;
    display: block;
    width: 2px;
    height: 8px;
    background: #dddddd;
    content: '';
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
}

#navigation.align-right ul ul li.has-sub>a:before {
    right: auto;
    left: 14px;
}

#navigation ul ul>li.has-sub:hover>a:before {
    top: 17px;
    height: 0;
}

#navigation.small-screen {
    width: 100%;
}

#navigation.small-screen ul {
    width: 100%;
    display: none;
}

#navigation.small-screen.align-center>ul {
    text-align: left;
}

#navigation.small-screen ul li {
    width: 100%;
    border-top: 1px solid #474747;
}

#navigation.small-screen ul ul li,
#navigation.small-screen li:hover>ul>li {
    height: auto;
}

#navigation.small-screen ul li a,
#navigation.small-screen ul ul li a {
    width: 100%;
    border-bottom: 0;
    padding: 20px 15px;
}

#navigation.small-screen>ul>li {
    float: none;
}

#navigation.small-screen ul ul li a {
    padding-left: 25px;
}

#navigation.small-screen ul ul ul li a {
    padding-left: 35px;
}

#navigation.small-screen ul ul li a {
    color: #474747;
    background: none;
}

#navigation.small-screen ul ul li:hover>a,
#navigation.small-screen ul ul li.active>a {
    color: #474747;
}

#navigation.small-screen ul ul,
#navigation.small-screen ul ul ul,
#navigation.small-screen.align-right ul ul {
    position: relative;
    left: 0;
    width: 100%;
    margin: 0;
    text-align: left;
}

#navigation.small-screen>ul>li.has-sub>a:after,
#navigation.small-screen>ul>li.has-sub>a:before,
#navigation.small-screen ul ul>li.has-sub>a:after,
#navigation.small-screen ul ul>li.has-sub>a:before {
    display: none;
}

#navigation.small-screen #menu-button {
    display: block;
    padding: 15px;
    color: #474747;
    cursor: pointer;
    font-size: 12px;
    border-top: 1px solid #474747;
    text-transform: uppercase;
    font-weight: 700;
}

#navigation.small-screen #menu-button:after {
    position: absolute;
    top: 16px;
    right: 17px;
    display: block;
    height: 12px;
    width: 20px;
    border-top: 2px solid #474747;
    border-bottom: 2px solid #474747;
    content: '';
}

#navigation.small-screen #menu-button:before {
    position: absolute;
    top: 21px;
    right: 17px;
    display: block;
    height: 2px;
    width: 20px;
    background: #474747;
    content: '';
}

#navigation.small-screen #menu-button.menu-opened:after {
    top: 23px;
    border: 0;
    height: 2px;
    width: 15px;
    background: #474747;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

#navigation.small-screen #menu-button.menu-opened:before {
    top: 23px;
    background: #474747;
    width: 15px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

#navigation.small-screen .submenu-button {
    position: absolute;
    z-index: 99;
    right: 0;
    top: 0;
    display: block;
    border-left: 1px solid #474747;
    height: 53px;
    width: 53px;
    cursor: pointer;
}

#navigation.small-screen .submenu-button.submenu-opened {}

#navigation.small-screen ul ul .submenu-button {
    height: 34px;
    width: 34px;
}

#navigation.small-screen .submenu-button:after {
    position: absolute;
    top: 22px;
    right: 20px;
    width: 8px;
    height: 2px;
    display: block;
    background: #dddddd;
    content: '';
}

#navigation.small-screen ul ul .submenu-button:after {
    top: 15px;
    right: 13px;
}

#navigation.small-screen .submenu-button.submenu-opened:after {
    background: #474747;
}

#navigation.small-screen .submenu-button:before {
    position: absolute;
    top: 19px;
    right: 23px;
    display: block;
    width: 2px;
    height: 8px;
    background: #dddddd;
    content: '';
}

#navigation.small-screen ul ul .submenu-button:before {
    top: 12px;
    right: 16px;
}

#navigation.small-screen .submenu-button.submenu-opened:before {
    display: none;
}

#navigation.small-screen.select-list {
    padding: 5px;
}

.header {
    background-color: #fff;
    z-index: 99;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
