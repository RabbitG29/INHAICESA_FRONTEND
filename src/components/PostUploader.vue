<template>
  <div>
    <div class="unlogin-box container" v-show="!isLogged">
      <div class="alert alert-warning" role="alert" >로그인이 필요합니다!</div>
      <router-link tag="a" :to="{name: 'Login'}">클릭 시 로그인페이지로 이동합니다</router-link>
    </div>
    <div v-show="isLogged">
      <div class="board-box container">
        <button type="button" class="btn btn-outline-primary" style="float:right" @click.prevent="submitLog">{{mode=='create'?'등록':'수정'}}</button>
        <button type="button" class="btn btn-outline-secondary" style="float:right" @click="$router.go(-1)">뒤로가기</button>
        <form>
          <div class="form-group">
            <input type="file" ref="file" id="files" class="form-control-file" @change="fileChanges">
          </div>
        </form>
        <form>
          <div class="form-group">
            <input v-model="title" class="form-control" id="exampleFormControlInput1" placeholder="title">
          </div>
          <div class="form-group">
            <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" placeholder="content" rows="3"></textarea>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name : "createLog",
    data(){
        return {
            msg: '게시판',
            counter: 1,
            title: '',
            postId: '',
            boardId: '',
            file1: '',
            content: '',
            mode: '',
            writerID:'',
            list: []
        }
    },
    computed: {
        isLogged: function(){
          return this.$store.getters.isLogged
        },
        getId(){
          return this.$store.getters.getId
        },
        getName(){
          return this.$store.getters.getName
        },
        getToken(){
          return this.$store.getters.getToken
        }
    },
    mounted: function(){
        this.msg = ' '
        if(this.$route.query.mode == 'create'){
          this.mode = 'create';
          this.boardId = this.$route.query.boardId
        }
        else if(this.$route.query.mode == 'edit'){
          this.mode = 'edit'
          this.postId = this.$route.query.postId
          this.$http.get(this.$config.targetURL+'/resources/mlog/posts/'+this.postId)
          .then(r=>{
            if(r.data.status == 'success'){
              var result = JSON.parse(r.data.result)
              this.title = result.title
              this.writer = result.writer
              this.content = result.content
              this.id = result.id
              this.writerID = result.writerID
            }
          })
          .catch(e=>{

          })
        }
    },
    methods: {
        fileChanges: function(e){
          console.log(e)
          var file = e.target.files[0]
          this.file1 = file;
        },
        plus : function(){
            this.counter = this.counter +1
        },
        submitLog: function(){
          if(this.mode == 'create'){
            var url = 'http://165.246.34.25:1665/resources/mlog/';

            var json = {
              writer: this.getName,
              content: this.content,
              writerID: this.getId,
              title: this.title,
              boardid: this.boardId
            }
            var formData = new FormData()
            formData.append('information', JSON.stringify(json))
            formData.append('userfile', this.file1)

            this.$http.post(url, formData)
            .then(result=>{
              console.log('success!')
              alert('success')
              this.$router.go(-1)
            })
            .catch(error=>{
                console.log('서버에러')
                this.$router.push({
                  name: 'Board'
                })
              })
          }
          else if(this.mode == 'edit'){
            var url = 'http://165.246.34.25:1665/resources/mlog/';

            var json = {
              content: this.content,
              title: this.title,
              id: this.postId
            }
            var formData = new FormData()
            formData.append('information', JSON.stringify(json))
            formData.append('userfile', this.file1)

            this.$http.put(url, formData)
            .then(result=>{
              console.log('success!')
              alert('success')
              this.$router.go(-1)
            })
            .catch(error=>{
                console.log('서버에러')
                this.$router.push({
                  name: 'Board'
                })
              })
          }
        },
        goBack: function(){
          this.$router.push({
            name: "Board"
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
.unlogin-box{
  margin-bottom: 50px;
  margin-top: 80px;
}
</style>
