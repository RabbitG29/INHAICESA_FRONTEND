<template>
  <div class="board-box">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-4" font-style="bold"><h5>{{title}}</h5></div>
          <div class="col-sm-1"></div>
          <div class="col-sm-1">{{writer}}</div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="editLog">수정</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="deleteLog">삭제</button>
          </div>
        </div>
      </div>
      <div class="card-body">
    <!--    <h5 class="card-title">Special title treatment</h5> -->
        <p class="card-text">{{content}}</p>
        <div>
          <a :href="path">첨부파일 다운로드</a>
        </div>
        <a href="#" class="btn btn-primary" style="float:right" @click="goBack">Go back</a>
      </div>
    </div>
    <br>

    <!--댓글작성-->
    <div class="form-group">
      <textarea v-model="comment" class="form-control" id="exampleFormControlTextarea1" placeholder="comment" rows="3"></textarea>
    </div>
    <br>

    <!--댓글 보이기-->
    <label>Comments</label>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Cras justo odio
        <span class="badge badge-primary badge-pill">장수빈</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Dapibus ac facilisis in
        <span class="badge badge-primary badge-pill">전수현</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Morbi leo risus
        <span class="badge badge-primary badge-pill">최진우</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'readBoard',
  data(){
    return {
      title : '',
      writer: '',
      context: '',
      content: '',
      comment: '',
      path: '',
      id: ''
    }
  },
  mounted: function(){
    this.title = this.$route.query.title || ''
    this.writer = this.$route.query.writer || ''
    this.content = this.$route.query.content || ''
    this.id = this.$route.query.id
    this.path = this.$config.targetURL+'/resources/mlog/download/'+this.id
    console.log('downloadable link'+ this.path)
  },
  methods: {
    goBack: function(){
      this.$router.push({
        name: "Board"
      })
    },
    deleteLog: function(){
      this.$http.delete('http://165.246.34.25:1665/resources/mlog/'+this.id)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          alert('delete success')
          this.$router.push({
            name: 'Board'
          })
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editLog: function(){

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
