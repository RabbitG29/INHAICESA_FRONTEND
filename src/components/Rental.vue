<template>
<div class="container">
    <modal name="rental-request-modal" height="auto" :scrollable="true">
        <div class="modal-container">
            <h3>대여하기</h3>
            <hr>
            <div id="rental-request" class="row container">
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
                    <div class="row form-group text-center container" id="phone-tooltip">
                        <div v-if="initPhone == '' && id!=''"> <!-- -->
                            <small>저장되어 있는 연락처가 없는데 새로 저장할까용?</small>
                            <button class="btn btn-sm btn-primary" @click.prevent="editInfo" >새로 저장</button>
                        </div>
                        <div v-else-if="initPhone != phone">
                            <small>기존에 저장되어있는 연락처와 다른데 수정할까요?</small>
                            <button class="btn btn-sm btn-primary" @click.prevent="editInfo">수정</button>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-4">
                            <label>과자치비</label>
                        </div>
                        <div class="col-sm-8">
                            <input class="form-control" :value="paid=='1'?'납부':'미납'" disabled>
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
                        <button class="btn btn-secondary" @click="$modal.hide('rental-request-modal')">돌아가기</button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal name="rental-return" height="auto" :scrollable="true">
        <div class="modal-container">
            <h3>반납하기</h3>
            <hr>
            <p>정직하게 삽시다.</p>
            <div>
                <button class="btn btn-primary" @click.prevent="returnItem(item)">정상 반납</button>
                <button class="btn btn-primary" @click.prevent="destroyItem(item)">분실/파손 신고</button>
                <button class="btn btn-secondary" @click="$modal.hide('rental-return')">닫기</button>
            </div>
        </div>
    </modal>
    <div id="rental-viewer">
        <h3>대여장부</h3>
        <p>과자치비를 납부한 학생은 누구나 이용할 수 있습니다.</p>
        <button v-if="isAdmin" class="btn btn-primary" @click="rentalLog()">관리 페이지로 이동</button>
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
                            <span :class="pro.pro_possible=='1'?'rental-yes':'rental-no'">
                                <button v-if="pro.pro_possible=='1'" class="btn btn-success" :disabled="!isAdmin" @click="selectItem(pro)">대여가능</button>
                                <span v-if="pro.pro_possible=='0'">
                                    <button class="btn btn-secondary">대여중</button>
                                    <span v-show="!isAdmin" class="rental-timestamp" >{{pro.rent_show_time}}</span>
                                    <span v-show="isAdmin" class="rental-timestamp" >{{pro.rent_student}}({{pro.student_num}})가 {{pro.rent_time}}에 빌려감. 연락처는 {{pro.student_phone}}</span>
                                    <button v-if="isAdmin" class="btn btn-primary" @click.prevent="returnRequest(pro)">반납</button>
                                </span>
                                <span v-if="pro.pro_possible=='2'">
                                    <button class="btn btn-danger">파손/분실</button>
                                    <span class="rental-timestamp" >{{pro.rent_time}}</span>
                                    <button v-if="isAdmin" class="btn btn-primary" @click.prevent="returnRequest(pro)">복구</button>
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
    sockets: {
        connect: function(){
            console.log('socket connected')
        },
        rental: function(){
            console.log('hello')
            this.$notice({
                type: 'success',
                text: '새로고침 되었습니다.'
            })
            this.getData()
        }
    },
    data(){
        return {
            payload: '',
            results: '',
            filter: '',
            paid: false,
            itemNames: [],
            itemLists: [],
            isLoaded: false,
            id: '',
            name: '',
            initPhone: '',
            phone: '',
            mode: 'view',
            item: ''
        }
    },
    computed: {
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
        editInfo: function(){
            let json = {
                token: this.getToken,
                phone: this.phone
            }
            this.$http.put(this.$config.targetURL+'/users/phone/'+this.id, json)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.initPhone = this.phone
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 수정되었습니다.'
                    })
                }
            })
            .catch(e=>{
                this.$notice({
                    type: 'error',
                    text: '에러가 발생했습니다.'
                })
            })
        },
        returnRequest: function(item){
            this.item = item
            this.$modal.show('rental-return')
        },
        destroyItem: function(item){
            var json={
                token: this.getToken,
                num: item.num,
                return_sa: this.getId
            }
            console.log(json)
            this.$http.put(this.$config.targetURL+'/info/rent/log/destroy', json)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.getData()
                    this.$notice(
                        {type: 'success',
                        text: '성공적으로 파손신고가 완료되었습니다.'}
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
            this.$modal.hide('rental-request-modal')
            this.$modal.hide('rental-return')
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
                                this.$moment.locale('ko')
                                v2.rent_show_time = this.$moment(v2.pro_time).tz('Asia/Seoul').fromNow()
                                v2.rent_time = this.$moment(v2.pro_time).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분 s초')
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
            this.$http.post(this.$config.targetURL+'/info/rent/log/rent', json)
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
            this.$modal.show('rental-request-modal')
            this.mode = 'rental'
            this.item = item
            this.id = ''
            this.name = ''
            this.phone = ''
            this.paid = false
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
                    this.name = payload.name  || ''

                    this.phone = payload.phone || ''
                    this.initPhone = this.phone
                    this.paid = payload.paid
                }
            })
            .catch(e=>{

            })

        },
        rentalLog: function(){
            this.$router.push({
              name: 'RentalLog'
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
#phone-tooltip {
    margin: 10px auto;
}
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
