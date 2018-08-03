<template>
    
    <div>
        <modal name="admin" height="auto" :scrollable="true" width="100%">
            <div class="container" style="margin: 20px;">
                <h3>게시판 등록</h3>
                <div class="form-group row">
                    <div class="col-sm-3"> 
                        <label>게시판 번호</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="number" class="form-control" v-model="boardID">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <label>게시판 이름</label>
                    </div>
                    <div class="col-sm-9">
                        <input class="form-control" v-model="boardName">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <label>게시판 설명</label>
                    </div>
                    <div class="col-sm-9" v-if="!isPage">
                        <input class="form-control" v-model="boardNote">
                    </div>
                    <div class="col-sm-9" v-if="isPage">
                        <button @click="isHTML = !isHTML" class="btn btn-secondary">{{isHTML?'이지윅 에디터':'HTML에디터'}}</button>
                        <div v-if="!isHTML">
                            <wysiwyg v-model="boardNote"/>
                        </div>
                        <div v-if="isHTML">
                            <textarea v-model="boardNote"/>
                        </div>
                    </div>
                </div>
                <div class="form-group row" v-if="!isPage">
                    <div class="col-sm-3">
                        <label>최소 읽기 권한 레벨</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="number" class="form-control" v-model="readAuthLevel" disabled>
                    </div>
                </div>
                <div class="form-group row"  v-if="!isPage">
                    <div class="col-sm-3">
                        <label>최소 쓰기 권한 레벨</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="number" class="form-control" v-model="writeAuthLevel">
                    </div>
                </div>
                <div class="form-group row" v-if="!isGallery">
                    <div class="col-sm-3">
                        <label>페이지 여부</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="checkbox"  class="form-control" v-model="isPage">
                    </div>
                </div>
                <div class="form-group row" v-if="!isPage">
                    <div class="col-sm-3" >
                        <label>갤러리 여부</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="checkbox"  class="form-control" v-model="isGallery">
                    </div>
                </div>
                <div>

                    <button class="btn btn-primary" @click.prevent="submit">{{mode=='post'?'등록':'수정'}}</button>
                    <button class="btn btn-secondary" @click="closeModal">닫기</button>
                </div>
            </div>
        </modal>
        <div class="container">
            
            <admin-router/>
            <h3>게시판 관리</h3>
            <div id="board-panel">
                <button class="btn btn-primary">조회</button>
                <button class="btn btn-primary" @click="openModal">등록</button>
            </div>
            <div id="board-list">
                <table class="table">
                    <thead>
                        <tr>
                            <th>게시판 번호</th>
                            <th>게시판 이름</th>
                            <th>주소</th>
                            <th>게시판 설명</th>
                            <th>필요권한(R/W)</th>
                            <th>비고</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td>{{item.boardID}}</td>
                            <td>{{item.boardName}}</td>
                            <td>{{$config.targetURL}}/#/board?id={{item.boardID}}</td>
                            <td>
                                <div v-if="!item.isPage">
                                    {{item.boardNote}}
                                </div>
                                <div v-else>
                                    <button class="btn btn-sm btn-secondary" @click="editData(item)">클릭</button>
                                </div>
                            </td>
                            <td>
                                <div v-if="item.isPage">
                                    {{item.readAuthLevel}}/{{item.writeAuthLevel}}
                                </div>
                            </td>
                            <td>
                                <span class="badge badge-primary" v-if="item.isPage">페이지</span>
                                <span class="badge badge-secondary" v-if="item.isGallery">갤러리</span>
                            </td>
                            <td>
                                <div>
                                    <button class="btn btn-sm btn-secondary" @click="editData(item)">수정</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list: [],

            boardID: '',
            boardName: '',
            boardNote: '',
            readAuthLevel: '',
            writeAuthLevel: '',
            isPage: '',
            isGallery: '',
            isHTML: false,
            postID: '',
            mode: 'post'
        }
    },
    created: function(){
        this.getData()
    },
    methods: {
        submit: function(mode){
            var json = {
                boardID: this.boardID,
                boardName: this.boardName,
                boardNote: this.boardNote,
                readAuthLevel: this.readAuthLevel,
                writeAuthLevel: this.writeAuthLevel,
                isPage: this.isPage,
                isGallery: this.isGallery
            }
            this.$http.post(this.$config.targetURL+'/resources/board', json)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 등록되었습니다.'
                    })
                    this.closeModal()
                    this.getData()
                }
                else {
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg
                    })
                }
            })
            .catch(e=>{

            })
        },
        openModal: function(mode){
            this.boardID= ''
            this.boardName= ''
            this.boardNote= ''
            this.readAuthLevel= 1
            this.writeAuthLevel= 1
            this.isPage= false
            this.isGallery= false
            this.postID= ''
            this.mode = 'post'
            this.$modal.show('admin')
        },
        closeModal: function(){
            this.mode = 'post'
            this.$modal.hide('admin')
        },
        editData: function(item){
            this.boardID = item.boardID
            this.boardName = item.boardName
            this.boardNote = item.boardNote
            this.readAuthLevel = item.readAuthLevel
            this.writeAuthLevel = item.writeAuthLevel
            this.isPage = item.isPage
            this.isGallery = item.isGallery
            this.postID = item.postID
            this.mode = 'edit'
            this.$modal.show('admin')
        },
        getData: function(){
            this.$http.get(this.$config.targetURL+'/resources/board')
            .then(r=>{
                console.log('hi')
                if(r.data.status == 'success'){
                    this.list = JSON.parse(JSON.stringify(r.data.data))
                }
            })
            .catch(e=>{

            })
        }
    }
}
</script>


<style scoped>
modal .container {
    margin: 20px;
}
#board-panel {
    margin: 10px;
}
</style>