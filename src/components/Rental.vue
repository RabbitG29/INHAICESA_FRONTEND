<template>
<div>
    <h3>대여장부</h3>
    <div v-if="isLogged">
        안녕하세요 {{payload.name}}님
        <br>
        당신은 과자치비를 {{payload.paid=='1'?'납부했습니다.':'미납했습니다.'}}
        <br>
    </div>
    <div>
        <button class="btn btn-sm btn-secondary" @click="mode='1'">대여 가능한 항목만 보기</button>
        <button class="btn btn-sm btn-secondary" @click="mode='2'">대여 불가능한 항목만 보기</button>
        <button class="btn btn-sm btn-secondary" @click="mode='0'">초기화</button>
    </div>
    <div class="table-box">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">품목 이름</th>
                    <th scope="col">품목 번호</th>
                    <th scope="col">대여 가능여부</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="mode=='0'">
                    <tr v-for="(item, index) in results" :key="index">
                        <th scope="col">{{item.num}}</th>
                        <th scope="col">{{item.pro_name}}</th>
                        <th scope="col">{{item.pro_num}}</th>
                        <th scope="col">{{item.pro_possible}}</th>
                        <th scope="col">
                            <button class="btn btn-sm btn-secondary" :disabled="item.pro_possible!='O'">선택</button>
                        </th>
                    </tr>
                </template>
                <template v-if="mode=='1'">
                    <tr v-for="(item, index) in results" v-if="item.pro_possible=='O'" :key="index">
                        <th scope="col">{{item.num}}</th>
                        <th scope="col">{{item.pro_name}}</th>
                        <th scope="col">{{item.pro_num}}</th>
                        <th scope="col">{{item.pro_possible}}</th>
                        <th scope="col">
                            <button class="btn btn-sm btn-secondary" :disabled="item.pro_possible!='O'">선택</button>
                        </th>
                    </tr>
                </template>
                <template v-if="mode=='2'">
                    <tr v-for="(item, index) in results" v-if="item.pro_possible=='X'" :key="index">
                        <th scope="col">{{item.num}}</th>
                        <th scope="col">{{item.pro_name}}</th>
                        <th scope="col">{{item.pro_num}}</th>
                        <th scope="col">{{item.pro_possible}}</th>
                        <th scope="col">
                            <button class="btn btn-sm btn-secondary" :disabled="item.pro_possible!='O'">선택</button>
                        </th>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</div>
</template>
<script>
export default {
    name : "Rental",
    data(){
        return {
            payload: '',
            results: '',
            mode: '0'
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
        this.$http.get(this.$config.targetURL+'/users/'+this.getId+'?token='+this.getToken)
        .then(r=>{
            if(r.data.status == 'success'){
                this.payload = r.data.payload
            }
        })  
        .catch(e=>{

        })

        this.$http.get(this.$config.targetURL+'/info/rent')
        .then(r=>{
            if(r.data.status == 'success'){
                this.results = JSON.parse(r.data.result)
            }
        })  
        .catch(e=>{

        })
        
    }
}
</script>
<style>
.table-box {
    margin-left: 100px;
    margin-right: 100px;
}
</style>