<template>
  <div class="container">
    <h2>정보통신공학과 교육과정</h2>
    <table class="table table-striped">
      <thead>
        <tr class="text-right">
          <th scope="col" class="text-center"> </th>
          <th scope="col" class="text-center">종별</th>
          <th scope="col" class="text-center">세부종별</th>
          <th scope="col" class="text-center">과목영역</th>
          <th scope="col" class="text-center">학수번호</th>
          <th scope="col" class="text-center">과목명</th>
          <th scope="col" class="text-center" width="10%">학점</th>
          <th scope="col" class="text-center" width="20%">학년 및 학기</th>
          <th scope="col" class="text-center">비고</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" class="text-center">
            <td scope="col">{{index+1}}</td>
            <td>{{item.class}}</td>
            <td>{{item.classdetail}}</td>
            <td>{{item.subfields}}</td>
            <td>{{item.subnum}}</td>
            <td>{{item.subject}}</td>
            <td>{{item.credit}}</td>
            <td>{{item.time}}</td>
            <td>{{item.note}}</td>
        </tr>
      </tbody>
    </table>
    {{bigo  }}
  </div>
</template>
<script>
export default {
  name: 'Curriculum',
  data() {
    return {
      msg: '교육과정',
      list: [],
      bigo: ''
    }
  },
  mounted: function() {
    this.msg = ''
    console.log("커리큘럼")
    this.getData()
  },
  watch: {
    // this.$route
    $route: function(to, from){
      this.msg = ''
      console.log('커리큘럼')
      this.getData()
    }
  },
  methods: {
    getData: function(){
        var url = 'http://165.246.34.25:1665/info/iceinfo/'
        console.log(url)
        this.$http.get(url)
        .then(result=>{
            console.log(result)
            console.log(result.data.status)
            this.list = JSON.parse(result.data.result)
            console.log(this.list)
            this.bigo = this.list.pop().note || ''
        })
        .catch(error=>{
            console.log('서버에러')
        })
    }
  }
}
</script>
<style scoped>

</style>
