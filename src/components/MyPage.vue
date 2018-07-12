<template>  
    <div>
        <div>
            <button class="btn btn-primary" @click.prevent="getMyInfo">나는 누구?</button>
        </div>
        
        <div>
            <button class="btn btn-primary" @click="editMyInfo">여긴 어디?</button>
        </div>
        <div style="margin-left:300px;">
            <div v-if="mode=='edit'" class="col-sm-4">
                <div class="row">
                    <label>학번</label>
                    <input class="form-control" placeholder="학번" :value="id" disabled>
                </div>
                <div class="row">
                    <label>연락처(010-2222-3333)</label>
                    <input class="form-control" placeholder="연락처" v-model="phone">
                </div>
                <button class="btn btn-primary" @click.prevent="submit">제출</button>
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
            id: ''
        }
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
</style>