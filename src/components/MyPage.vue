<template>
    <div class="container">
        <div class="form-group row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <div class="row form-group">
                    <label>학번</label>
                    <input class="form-control" placeholder="학번" :value="id" disabled>
                </div>

                <div class="row  form-group">
                    <label>이름</label>
                    <input class="form-control" placeholder="이름" :value="getName" disabled>
                </div>

                <div class="row  form-group">
                    <label>기존 비밀번호 입력</label>
                    <input type="password" class="form-control" placeholder="기존 비밀번호" v-model="oldPassword">
                </div>
                <div class="row  form-group">
                    <label>새 비밀번호 입력</label>
                    <input type="password" class="form-control" placeholder="새 비밀번호" v-model="newPassword">
                </div>
                <button class="btn btn-primary" @click.prevent="submit2">비밀번호 수정하기</button>
                <div class="row  form-group">
                    <label>연락처(010-2222-3333)</label>
                    <input class="form-control" placeholder="연락처" v-model="phone">
                </div>
                <button class="btn btn-primary" @click.prevent="submit">연락처 수정하기</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyPage',
    data () {
        return {
            mode: '',
            phone: '',
            payload: '',
            id: '',
            oldPassword: '',
            newPassword: ''
        }
    },
    mounted: function(){
        this.getMyInfo()
    },
    methods: {
        submit: function(){
            var json = {
                token: this.getToken,
                phone: this.phone
            }

            this.$http.put(this.$config.targetURL+'/users/'+this.getId, json)
            .then(r=>{
                if(r.data.status == 'success'){
                    console.log('성공!')
                    this.$notice(
                        {type:'success',
                        text: '정상적으로 처리되었습니다.'}
                    )
                    this.mode = ''
                }
                else {
                    this.$notice(
                        {type: 'error',
                        text: r.data.errMsg}
                    )
                }
            })
            .catch(e=>{

            })
        },
        submit2: function(){
            var json = {
                id: this.id,
                token: this.getToken,
                oldP: this.oldPassword,
                newP: this.newPassword
            }
            console.log(JSON.stringify(json));
            this.$http.put(this.$config.targetURL+'/auth/login', json)
            .then(r=>{
                if(r.data.status == 'success'){
                    console.log('성공!')
                    this.$notice(
                        {type:'success',
                        text: '정상적으로 처리되었습니다.'}
                    )
                    this.oldPassword = this.newPassword = ''
                    this.mode = ''
                }
                else {
                    this.$notice(
                        {type: 'error',
                        text: r.data.errMsg}
                    )
                }
            })
            .catch(e=>{

            })
        },
        getMyInfo: function(){
            this.$http.get(this.$config.targetURL+'/users/'+this.getId+'?token='+this.getToken)
            .then(r=>{
                if(r.data.status == 'success'){
                    console.log(r.data.payload)
                    this.payload = r.data.payload;
                    this.phone = this.payload.phone
                    this.id = this.payload.studentId
                    this.mode = ''
                    this.$notice({
                        type: 'success',
                        text: payload
                    })
                }
                else if(r.data.status == 'error'){

                }
            })
            .catch(e=>{

            })
        },
        editMyInfo: function(){
            this.mode ='edit'
        }
    }


}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
@font-face {
  font-family: 'NanumGothic' ;
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff2) format('woff2'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff) format('woff'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf) format('truetype');
  font-weight : normal;
  font-style : normal;
}
div {
 font-family: 'NanumGothic';
}
</style>
