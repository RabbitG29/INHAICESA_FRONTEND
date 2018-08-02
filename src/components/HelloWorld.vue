<template>
  <div  align="center">
    <div id="carousel-box" class="carousel slide" data-ride="carousel" >
      <div id="carousel-overlay">
        <div id="carousel-overlay-blur">

        </div>
        <div id="carousel-overlay-text">
          정통 학생회에 오신 것을 환영합니다
        </div>
      </div>
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
  <div class="form-group row container">
    <div class="col-lg-1"></div>
      <div class="col-lg-3" id="content-box">
        <div class="card">
          <div class="card-header">
            <b>📜 최근 게시글 </b>
          </div>
          <div class="card-body" style="cursor: pointer">
            <router-link  v-for="(post, index) in recentPosts" :key="index" tag="div" :to="'/postviewer?id='+post.id" class="form-group">
              <b>{{boardName[post.boardID]?'['+boardName[post.boardID]+']':''}}</b>{{post.title}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card"  id="content-box">
          <div class="card-header">
            <b>📃 최근 댓글 </b>
          </div>
          <div class="card-body" style="cursor: pointer">
            <router-link tag="div" class="form-group" v-for="(comment, index) in recentComments" :key="index" :to="'/postviewer?id='+comment.postId">
              {{comment.content}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-3"  id="content-box">
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
#content-box {
  margin: 5px;
}
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
  width: 100%;
  margin-bottom: 30px;
  border-radius: 10px;
  height: auto;
}
#carousel-overlay {
  position: absolute;
  top: 10%;
  width: 100%;
  z-index: 3;
  transition-duration: 0.5s;
}
#carousel-overlay:hover {
  opacity: 0.5;
  transition-duration: 0.5s;
}

#carousel-overlay-box {
  position: absolute;
  top: 40%;
  left: 15%;
  right: 15%;
  z-index: 1;
  opacity: 1;
  transition-duration: 0.5s;
}
#carousel-overlay-box:hover {
  z-index: 2;
  opacity: 1;
  transition-duration: 0.5s;
}
#carousel-overlay-blur {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);

}
#carousel-overlay-text{
  position: relative;
  padding: 13px;
  z-index: 3;
  color: white;
  font-size: 35px;
  text-shadow: #42b983;
}
</style>
