<template>
  <div class="board-box container">
    <h3>관리페이지</h3>
    <br>
    <button class="btn btn-secondary" @click="back()" style="float:left">대여장부</button>
    <div style="float: right"><h5>대여장부 기록</h5></div>
    <br>
    <hr>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"> </th>
          <th scope="col">대여자</th>
          <th scope="col">물품</th>
          <th scope="col">물건번호</th>
          <th scope="col">연락처</th>
          <th scope="col">대여일시</th>
          <th scope="col">대여담당</th>
          <th scope="col">반납일시</th>
          <th scope="col">반납담당</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(logs, index) in list" :key="index">
          <th scope="row">{{index+1}}</th>
          <th>{{logs.rent_student}}</th>
          <th>{{logs.pro_name}}</th>
          <th>{{logs.pro_num}}</th>
          <th>{{logs.student_phone}}</th>
          <th>{{logs.writetime}}</th>
          <th>{{logs.rent_sa}}</th>
          <th>{{logs.writetime2?logs.writetime2:' '}}</th>
          <th>{{logs.return_sa}}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'RentalLog',
  data(){
      return {
          msg: '렌탈로그',
          list: []
      }
  },
  mounted: function(){
    this.msg = ''
    console.log('로그페이지')
    this.getData()
  },
  methods: {
      getData: function(){
          this.$http.get(this.$config.targetURL+'/info/rent/log/')
          .then(result=>{
              console.log(result)
              console.log(result.data.status)
              this.list = JSON.parse(result.data.result)
              this.list.forEach(v=>{
                var dateinfo = v.rent_time
                var dateinfo2 = v.return_time
                v.writetime = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 MM월 DD일 HH시 mm분')
                v.writetime2 = this.$moment(dateinfo2).tz('Asia/Seoul').format('YYYY년 MM월 DD일 HH시 mm분')
              })
          })
          .catch(error=>{
              console.log('서버에러')
          })
      },
      back: function(){
        this.$router.go(-1)
      }
  }
}
</script>
<style>
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
  margin-bottom: 50px;
}
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
@font-face {
  font-family: 'NanumGothic' ;
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff2) format('woff2'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff) format('woff'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf) format('truetype');
  font-weight : normal;
  font-style : normal;
}
h3, div, thead, tbody{
 font-family: 'NanumGothic';
}
</style>
