<template>
<div class="container">
     <div id="rental-request" v-if="mode == 'rental'" class="row container">
        <div class="form-group" style="width:500px;">
            <div class="row form-group">
                <div class="col-sm-4"> 
                    <label>선택한 항목</label>
                </div>
                <div class="col-sm-8">
                    <input class="form-control" :value="item.pro_name+'('+item.pro_num+')'" disabled>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-4">
                    <label>학번</label>
                </div>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="id" @input="idChecker">
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-sm btn-primary" @click.prevent="getInfo">조회</button>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-4">
                    <label>이름</label>
                </div>
                <div class="col-sm-8">
                    <input class="form-control" v-model="name">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-4">
                    <label>연락처</label>
                </div>
                <div class="col-sm-8">
                    <input class="form-control" v-model="phone">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-4">
                    <label>과자치비</label>
                </div>
                <div class="col-sm-8">
                    <input class="form-control" :value="paid?'납부':'미납'" disabled>
                </div>
            </div>
            <hr>
            <div class="row form-group">
                <div class="col-sm-4">
                    <label>지킴이 정보</label>
                </div>
                <div class="col-sm-8">
                    <input class="form-control" :value="getName+'('+getId+')'" disabled>
                </div>
            </div>
            <hr>
            <div>
                <button class="btn btn-primary" @click.prevent="submitData">대여 신청</button>
                <button class="btn btn-secondary" @click="mode = 'view'">돌아가기</button>
            </div>

        </div>
    </div>
    <div id="rental-viewer" v-if="mode == 'view'">
        <h3>대여장부</h3>
        <p>과자치비를 납부한 학생은 누구나 이용할 수 있습니다.</p>
        <p>블라블라블라블라</p>
        <div class="container" v-for="(item, i) in itemLists" :key="i">
            <div class="text-left rental-item-header">
                <h4>{{itemNames[i]}}</h4>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3" v-for="(pro, index) in item" :key="index">
                    <div class="rental-list-item" style="border: 1px solid gray; border-radius: 5px;">
                        <div class="card-body" v-if="pro.pro_name">
                            <h5 class="card-title">{{pro.pro_name}}({{pro.pro_num}})</h5>
                            <p class="card-text"></p>
                            <span :class="pro.pro_possible=='O'?'rental-yes':'rental-no'">
                                <button v-if="pro.pro_possible=='O'" class="btn btn-success" :disabled="!isAdmin" @click="selectItem(pro)">대여가능</button>
                                <span v-else>
                                    <button class="btn btn-secondary">대여중</button>
                                    <span class="rental-timestamp" >{{pro.rent_time}}</span>
                                    <button v-if="isAdmin" class="btn btn-primary" @click.prevent="returnItem(pro)">반납</button>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
/*
TODO:
1. 연락처를 따로 저장안했던 사람이 대여를 하면
그 사람 연락처를 Student DB에 저장해주기

2. 연체료 계산하기

*/
export default {
    name : "Rental",
    data(){
        return {
            payload: '',
            results: '',
            filter: '',
            paid: false,
            itemNames: [],
            itemLists: [],
            id: '',
            name: '',
            phone: '',
            mode: 'view',
            item: ''
        }
    },
    computed: {
        isLogged: function(){
            return this.$store.getters.isLogged
        },
        getId(){
            return this.$store.getters.getId
        },
        getAuthLevel(){
            return this.$store.getters.getAuthLevel
        },
        getToken(){
            return this.$store.getters.getToken
        },
        getName(){
            return this.$store.getters.getName
        },
        computedList(){
            var list = [];
            for(var item of this.results){
                if(this.filter == '' || this.filter == item.pro_name){
                    item.show = true
                    list.push(item)
                }
            }
            return list;
        },
        isAdmin(){
            if(this.isLogged){
                if(this.getAuthLevel >= 5)
                    return true;
            }
            return false;
        }
    },
    methods: {
        returnItem: function(item){
            var json={
                token: this.getToken,
                pro_name: item.pro_name,
                pro_num: item.pro_num,
                return_sa: this.getId
            }
            console.log(json)
            this.$http.post(this.$config.targetURL+'/info/rent/log/return', json)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.getData()
                    this.$notice(
                        {type: 'success',
                        text: '성공적으로 반납이 완료되었습니다.'}
                    )
                }
                else if(r.data.status == 'error'){
                    this.$notice(
                        {type: 'error',
                        text: r.data.errMsg}
                    )
                }
            })
            .catch(e=>{

            })
        },
        getData: function(){
            this.$http.get(this.$config.targetURL+'/info/rent')
            .then(r=>{
                if(r.data.status == 'success'){
                    this.results = JSON.parse(r.data.result)
                    console.log(this.results)
                    var items = new Set()
                    for(var v of this.results){
                        items.add(v.pro_name)
                    }
                    this.itemNames = [...items]
                    // 아이템을 아이템 이름대로 분류
                    this.itemLists = []
                    for(const [i, v] of this.itemNames.entries()){
                        this.itemLists.push([])
                        for(var v2 of this.results){
                            if(v2.pro_name == v){
                                v2.rent_time = this.$moment(v2.pro_time).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분 s초에 빌림당함.')
                                this.itemLists[i].push(v2)
                            }
                        }
                    }
                    console.log(JSON.stringify(this.itemLists))
                }
            })  
            .catch(e=>{

            })

        },
        submitData: function(){
            var json={
                token: this.getToken,
                pro_name: this.item.pro_name,
                pro_num: this.item.pro_num,
                rent_student: this.name,
                student_num: this.id,
                student_phone: this.phone,
                rent_sa: this.getId
            }
            console.log(json)
            this.$http.post(this.$config.targetURL+'/info/rent/log', json)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.mode = 'view'
                    this.getData()
                    this.$notice(
                        {type: 'success',
                        text: '성공적으로 대여가 완료되었습니다.'}
                    )
                }
                else if(r.data.status == 'error'){
                    this.$notice(
                        {type: 'error',
                        text: r.data.errMsg}
                    )
                }
            })
            .catch(e=>{

            })
        },
        selectItem: function(item){
            this.mode = 'rental'
            this.item = item
        },
        idChecker: function(e){
            var value = e.target.value

            if(value>10000000 && value < 100000000){
                this.getInfo()
            }

        },
        getInfo: function(){
            this.name = this.phone = ''
            this.paid = false
            this.$http.get(this.$config.targetURL+'/users/'+this.id+'?token='+this.getToken)
            .then(r=>{
                if(r.data.status == 'success'){
                    var payload = r.data.payload
                    this.name = payload.name
                    this.phone = payload.phone
                    this.paid = payload.paid
                }
            })  
            .catch(e=>{

            })

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
        this.getData()
        
    }
}
</script>
<style>
.table-box {
    margin-left: 100px;
    margin-right: 100px;
}
.rental-list-item {
    margin: 10px 0px;
}
.rental-timestamp {
    display: none;
    background: black;
    color: white;
    border: 1px solid black;
    padding: 5px;
    border-radius: 3px;
    z-index: 10;
}
.rental-no:hover .rental-timestamp {
    position: absolute;
    display: block;
}
.rental-item-header {
    margin: 10px;
}
</style>