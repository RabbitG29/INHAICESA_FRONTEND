<template>
  <div class="login row" style="margin-top:100px;">
    <div class="col-sm-4"></div>
    <div v-show="!isLogged" class="col-sm-4">
        <form>
            <div class="form-group">
                <label for="id">학번</label>
                <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID" v-model="id">
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                <small id="emailHelp" class="form-text text-muted">초기비밀번호는 학번입니다.</small>
            </div>
            <button class="btn btn-primary" @click.prevent="submit">로그인</button>
        </form>
    </div>
    <div v-show="isLogged">
        이미 로그인되어있어용
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      password: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    }
  },
  methods: {
      logIn(token){
          this.$store.commit('logIn', {
              id: this.id,
              token: token
          })
      },
      submit: function(){
          this.$http.get(this.$config.targetURL+`/login?id=${this.id}&password=${this.password}`)
          .then((result)=>{
              if(result.data.status == 'success'){
                  console.log('success')
                  this.logIn(result.data.token)
                    this.$notice({
                        type: 'success',
                        text: '무사히 로그인 성공!'
                    })
              }
              else {
                console.log('error')
                    this.$notice({
                        type: 'alert',
                        text: '로그인 정보가 올바르지 않습니다'
                    })
              }
            })
          .catch((error)=>{
            console.log('server success')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })
      }
  }
}
</script>

<style scoped>
</style>