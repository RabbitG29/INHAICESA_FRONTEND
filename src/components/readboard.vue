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
      <button type="button" class="btn btn-outline-secondary btn-sm" style="float:right" @click.prevent="commentEroll">등록</button>
    </div>
    <br>

    <!--댓글 보이기-->
    <label>Comments</label>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center"
      v-for="(item, index) in list" :key="index">
        <div style="width:1900px;">
          <span class="badge badge-primary badge-pill">{{item.writerName}}</span>
          {{item.content}}
          <div style="float:right;">
            <sub>{{item.edittime?item.edittime:item.createtime}}</sub>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="editComment(item.commentId)">수정</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="deleteComment(item.commentId)">삭제</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
var moment = require('moment')
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
      id: '',
      list: []
    }
  },
  mounted: function(){
//    this.title = this.$route.query.title || ''
//    this.writer = this.$route.query.writer || ''
//    this.content = this.$route.query.content || ''
    this.id = this.$route.query.id
    console.log('마운티드!')
    this.$http.get(this.$config.targetURL+'/resources/mlog/posts/'+this.id)
    .then(r=>{
    console.log('마운티드!2')
      if(r.data.status == 'success'){
        var result = JSON.parse(r.data.result)
        this.title = result.title
        this.writer = result.writer
        this.content = result.content
      }
    })
    .catch(e=>{

    })
    this.path = this.$config.targetURL+'/resources/mlog/download/'+this.id
    console.log('downloadable link'+ this.path)
    this.getComment()
  },
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
    goBack: function(){
      this.$router.push({
        name: "Board"
      })
    },
    deleteLog: function(){
      this.$http.delete(this.$config.targetURL+'/resources/mlog/'+this.id)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          alert('delete success')
          this.$router.go(-1)
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editLog: function(){
      console.log('버튼누름')
      this.$router.push({
        name:'createLog',
        query: {
          mode: 'edit',
          postId: this.id
        }
      })
    },
    getComment: function(){
      this.$http.get(this.$config.targetURL+'/resources/comment/'+this.id)
      .then(result=>{
          console.log(result)
          console.log(result.data.status)


          this.list = JSON.parse(result.data.result)
      })
      .catch(error=>{
          console.log('서버에러')
      })
    },
    commentEroll : function(){
     var url = this.$config.targetURL+'/resources/comment';

     var json = {
       postId: this.id,
       content: this.comment,
       writerID: this.getId
     }
     this.$http.post(url, json)
     .then(result=>{
       if(result.data.status == 'success'){
         this.getComment()
         this.$notice({
           type: 'success',
           text: '성공!'
         })
       }
     })
     .catch(error=>{
         console.log('서버에러')
       })
    },
    deleteComment : function(commentId){
      this.$http.delete(this.$config.targetURL+'/resources/comment/'+commentId)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          this.getComment()
          alert('delete success')
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editComment : function(commentId){
      var url = this.$config.targetURL+'/resources/comment';
      var json = {
        commentId: commentId,
        content: this.comment
      }
      this.$http.post(url, json)

      .then(result=>{
        if(result.data.status == 'success'){
          console.log('수정성공')
          this.getComment()
          alert('edit success')
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
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
