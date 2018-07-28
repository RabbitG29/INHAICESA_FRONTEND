<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="container" id="post-box">
          <h4 font-style="bold" v-html="title"></h4>
          <h5>{{writer}}</h5>
          <h5><small class="text-right">{{writetime}}</small></h5>
          
          <div id="edit-box">
            <div v-show="isLogged && getId == writerID">
              <button type="button" class="btn btn-light btn-sm" @click.prevent="editLog">수정</button>
              <button type="button" class="btn btn-light btn-sm" @click.prevent="deleteLog">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
    <!--    <h5 class="card-title">Special title treatment</h5> -->
        <div class="card-text">
          <div v-html="content"></div>
          
          </div>
        <div>
          <a v-if="filename" :href="path">첨부파일 다운로드 ({{filename}})</a>
        </div>
        <a href="#" class="btn btn-secondary" style="float:right" @click="goBack">뒤로가기</a>
      </div>
    </div>
    <br>

    <!--댓글 보이기-->
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="list-group col-sm-8"> 
        <div class="text-left card comment-card" 
        v-for="(item, index) in list" :key="index+item.mode">
            <div class="card-body" id="comment-box">
              <h5 class="comment-writer">{{item.writerName}}
                <sub class="comment-timestamp">{{item.edittime?item.edittime:item.createtime}}</sub>
              </h5>
              <br>
              <h6 v-if="item.mode == 'view'">{{item.content}}</h6>
              <h6 v-else><textarea class="form-control" v-model="item.content"></textarea></h6>

              <div class="row" id="edit-box">
                <div v-show="getId==item.writerID">
                  <button v-if="item.mode == 'edit'" type="button" class="btn btn-light btn-sm" @click="changeCommentMode(index)">취소</button>
                  <button v-if="item.mode == 'view'" type="button" class="btn btn-light btn-sm" @click="changeCommentMode(index)">수정</button>
                  <button v-else type="button" class="btn btn-light btn-sm" @click.prevent="editComment(item)">확인</button>

                  <button type="button" class="btn btn-light btn-sm" @click.prevent="deleteComment(item.commentId)">삭제</button>
                </div>
            
              </div>
            </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
      <div class="col-sm-2"></div>
        
      <div v-if="isLogged" class="list-group col-sm-8">
        <div id="comment-post-box">
        <textarea v-model="comment" class="form-control"  placeholder="차카게 삽시다." rows="3"></textarea>
        <button type="button" class="btn btn-primary" @click.prevent="commentEroll">댓글작성</button>
        </div>
      </div>
    </div>
    
    <!--댓글작성-->
    
    <br>

  </div>
</template>
<script>
var moment = require('moment')
var path = require('path');
export default {
  name: 'readBoard',
  data(){
    return {
      title : '',
      writer: '',
      writerID: '',
      context: '',
      writetime: '',
      content: '',
      comment: '',
      path: '',
      id: '',
      filename: '',
      list: []
    }
  },
  created: function(){
//    this.title = this.$route.query.title || ''
//    this.writer = this.$route.query.writer || ''
//    this.content = this.$route.query.content || ''
    this.$Progress.start()
    this.id = this.$route.query.id
    console.log('마운티드!')
    this.$http.get(this.$config.targetURL+'/resources/mlog/posts/'+this.id)
    .then(r=>{
    console.log('마운티드!2')
      if(r.data.status == 'success'){
        var result = JSON.parse(r.data.result)
        console.log(result)
        this.title = result.title
        this.writer = result.writer
        this.writetime = this.$moment(result.writetime).tz('Asia/Seoul').format('YYYY년 M월 D일 h시 m분')
        this.writerID = result.writerID
        this.content = result.content
        this.filename = path.basename(result.filepath||'')
        this.$Progress.finish()
      }
    })
    .catch(e=>{
        this.$Progress.fail()
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
    changeCommentMode: function(index){
      this.list[index].mode = 'edit'
      this.$forceUpdate()
    },
    goBack: function(){
      this.$router.go(-1)
    },
    deleteLog: function(){
      this.$http.delete(this.$config.targetURL+'/resources/mlog/'+this.id)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          this.$notice({
            type: 'success',
            text: '삭제가 성공적으로 완료되었습니다.'
          })
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
        name:'PostUploader',
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
          this.list.forEach(v=>{
            var ct = v.createtime
            var et = v.edittime
            console.log(ct+et)
            v.createtime = this.$moment(ct).tz('Asia/Seoul').format('YYYY년 M월 D일 h시 m분')
            v.mode = 'view'
            if(et) v.edittime = this.$moment(et).tz('Asia/Seoul').format('YYYY년 M월 D일 h시 m분')
          })

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
         this.comment = ''
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
          this.$notice({
            type: 'success',
            text: '삭제가 성공적으로 완료되었습니다.'
          })
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editComment : function(item){
      var commentId = item.commentId
      var comment = item.content

      console.log(commentId + '  ' +comment)
      var url = this.$config.targetURL+'/resources/comment';
      var json = {
        commentId: commentId,
        content: comment
      }
      this.$http.put(url, json)

      .then(result=>{
        if(result.data.status == 'success'){
          console.log('수정성공')
          this.getComment()
          this.$notice({
            type: 'success',
            text: '수정이 성공적으로 완료되었습니다.'
          })
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
  }
}
</script>
<style scoped>
  
#comment-box #edit-box {
  position: absolute;
  bottom: 15px;
  right: 30px;
}
#comment-post-box button {
  position: absolute;
  top: 35px;
  right: 30px;
}
#comment-post-box {
  margin-top: 15px;
  margin-bottom: 15px;
}
#comment-box {
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment-card:hover {
  background-color: rgb(241,241,241);
  transition-duration: 0.3s;
}
.comment-writer {
  margin-left: 5px;
}
.comment-timestamp {
  position: absolute;
  top: 40px;
  right: 30px;
}
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
}
#post-box #edit-box {
  position: absolute;
  top: 20px;
  right: 20px;
}
.list-group .card {
  margin: 5px;
}
</style>
