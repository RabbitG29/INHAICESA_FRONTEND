<template>
<div class="board-box">
  <button type="button" class="btn btn-outline-secondary"
  style="float:right" @click="createLog()">등록</button>

    <!-- print meeting log list -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"> </th>
          <th scope="col">작성자</th>
          <th scope="col">제목</th>
          <th scope="col">작성일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <th scope="row">{{index+1}}</th>
          <th>{{item.writer}}</th>
          <th @click="readBoard(item)" style="cursor: pointer">{{item.title}}</th>
          <th>{{item.writetime}}</th>
        </tr>
      </tbody>
    </table>

    <!--하단 번호버튼들-->
    <div class="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group mr-2 btn-group-sm  mx-auto" role="group" aria-label="First group">

      </div>
    </div>

</div>
</template>
<script>
export default {
    name : "Board",
    data(){
        return {
            msg: '게시판',
            counter: 1,     //<!-- 하단 페이지버튼을 위한 변수-->
            list: [],
            boardId: ''
        }
    },
    mounted: function(){
      this.msg = ''
      this.boardId = this.$route.query.boardId
      console.log('현재 게시판 번호 : '+this.boardId)
      this.getData()
    },
    watch: {
      // this.$route
      $route: function(to, from){
        this.msg = ''
        this.boardId = this.$route.query.boardId
        console.log('현재 게시판 번호 : '+this.boardId)
        this.getData()
      }
    },
    methods: {
        readBoard: function(item){
          this.$router.push({
            name: 'readBoard',
            query: {
              title: item.title,
              writer: item.writer,
              content: item.content,
              writerID: item.writerID,
              id: item.id
            }
          })
        },
        plus : function(){
            this.counter = this.counter +1
        },
        getData: function(){
            var url = 'http://165.246.34.25:1665/resources/mlog/'+this.boardId
            console.log(url)
            this.$http.get(url)
            .then(result=>{
                console.log(result)
                console.log(result.data.status)
                this.list = JSON.parse(result.data.result)
            })
            .catch(error=>{
                console.log('서버에러')
            })
        },
        createLog: function(){
          this.$router.push({
            name:'createLog',
            query: {
              mode: 'create',
              boardId: this.boardId
            }
          })
        }
    }
}
</script>
<style>
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
}
</style>
