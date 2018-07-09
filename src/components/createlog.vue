<template>
  <div class="board-box">
    <button type="button" class="btn btn-outline-secondary" style="float:right" @click.prevent="createLog">등록</button>
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
</template>
<script>
export default {
    name : "Board",
    data(){
        return {
            msg: '게시판',
            counter: 1,
            title: '',
            file1: '',
            content: '',
            list: []
        }
    },
    mounted: function(){
        this.msg = ' '
    },
    methods: {
        readBoard: function(item){
          this.$router.push({
            name: 'readBoard',
            query: {
              title: item.title,
              writer: item.writer,
              content: item.content
            }
          })
        },
        fileChanges: function(e){
          console.log(e)
          var file = e.target.files[0]
          this.file1 = file;
        },
        plus : function(){
            this.counter = this.counter +1
        },
        createLog: function(){
          var url = 'http://165.246.34.25:1665/resources/mlog/';

          var json = {
            writer: '최유진',
            writertime: 20180709,
            content: this.content,
            writerID: '12161806',
            title: this.title,
          }
          var formData = new FormData()
          formData.append('information', JSON.stringify(json))
          formData.append('userfile', this.file1)

          this.$http.post(url, formData)
          .then(result=>{
            alert('성공!')
            console.log('success!')
          })
          .catch(error=>{
              console.log('서버에러')
          })
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
</style>
