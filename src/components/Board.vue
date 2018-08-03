<template>
<div>
    <div id="board">
      <div  class="board-box">
        board
      <h3>
        {{boardName[Number(boardId)]}}
      </h3>
      <div v-show="isLogged" class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2" >
          <button type="button" class="btn btn-secondary"
        @click="createLog()">글 등록</button>
        </div>
      </div>
      <div class="row">
          <!-- print meeting log list -->
          <table class="table table-striped">
            <thead>
               <tr class="text-center">
                <th class="text-center" scope="col">#</th>
                <th class="text-center">작성자</th>
                <th class="text-center">제목</th>
                <th class="text-center">작성일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
                <td scope="col">{{index+1}}</td>
                <td>{{item.writer}}</td>
                <td>{{item.title}}</td>
                <td>{{item.writetime}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="mobile-board">
      <div class="card" style="cursor: pointer" v-for="(item, index) in list" @click="readBoard(item)" :key="index">
        <div class="card-body">
          <h5 class="card-title">{{item.title}}</h5>
          <h6 class="card-subtitle mb-2 " style="color: #5cb85c">{{item.writetime}}</h6>
          <p class="card-text">{{item.writer}}</p>
        </div>
      </div>
  <!--        <div class="container" v-for="(item, index) in list" @click="readBoard(item)" :key="index">
            <div class="text-left mobile-box-header">
                <h4>{{item.title}}</h4>
            </div>
                <td scope="col">{{index+1}}</td>
                <td>{{item.writer}}</td>
                <td style="cursor: pointer">{{item.title}}</td>
                <td>{{item.writetime}}</td>
    </div>-->
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
            name: 'PostViewer',
            query: {
              id: item.id
            }
          })
        },
        plus : function(){
            this.counter = this.counter +1
        },
        getData: function(){
            var url = this.$config.targetURL+'/resources/mlog/'+this.boardId
            console.log(url)
            this.$http.get(url)
            .then(result=>{
                console.log(result)
                console.log(result.data.status)
                this.list = JSON.parse(result.data.result)
                this.list.forEach(v=>{
                  var dateinfo = v.writetime
                  v.writetime = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
                })
            })
            .catch(error=>{
                console.log('서버에러')
            })
        },
        createLog: function(){

          this.$router.push({
            name:'PostUploader',
            query: {
              mode: 'create',
              boardId: this.boardId
            }
          })
        }
    }
}
</script>

<style scoped>
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
  margin-bottom: 50px;
}
.card{
  text-align:left;
  width: 18rem;
  border: 1px solid grey;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom:10px;
}
#board {
  width: 100%;
}
@media (min-width: 999px){
    #board {
        display: inline-block;
    }
    #moblie-board{
    #mobile-board{
        display: none;
    }
}

@media (max-width: 1000px){
    #board {
        display: none;
    }

    #mobile-board{
        display: inline-block;
    }
}

</style>
