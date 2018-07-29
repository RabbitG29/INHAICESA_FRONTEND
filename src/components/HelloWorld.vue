<template>
  <div class="hello container" align="center">
    <br>
    <h1>정통 학생회에 오신 것을 환영합니다</h1>
    <br>
    <div id="carousel-box" class="carousel slide" data-ride="carousel" >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="./images/OT1.jpg" alt="First slide" >
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="./images/OT2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="./images/Conference.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carousel-box" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel-box" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="form-group row">
      <div class="col-sm-1"></div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">
            최근 게시글들
          </div>
          <div class="card-body">
            <router-link  v-for="(post, index) in recentPosts" :key="index" tag="div" :to="'/postviewer?id='+post.id" class="form-group">
              <b>{{boardName[post.boardID]?'['+boardName[post.boardID]+']':''}}</b>{{post.title}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">
            최근 댓글들
          </div>
          <div class="card-body">
            <router-link tag="div" class="form-group" v-for="(comment, index) in recentComments" :key="index" :to="'/postviewer?id='+comment.postId">
              {{comment.content}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Finhaicesa%2F&tabs=timeline&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="500" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      recentPosts: [],
      recentComments: []
    }
  },
  created: function(){
    this.$http.get(this.$config.targetURL + '/info/recent')
    .then(r=>{
      if(r.data.status == 'success'){
        console.log(r)
        this.recentPosts = r.data.recentPosts
        this.recentComments = r.data.recentComments
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello container {
    vertical-align: middle;
}
#carousel-box {

  width: 800px;
  margin: 30px;
  height: auto;
}
</style>
