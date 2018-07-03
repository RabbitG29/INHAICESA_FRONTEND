<template>
<div>
    <button v-on:click="plus">1증가</button>
    <br>
    <button v-on:click="getData">정보 받아오기</button>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일시</th>
                <th scope="col">내용</th>
                <th scope="col">파일경로</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list" :key="index">
                <th scope="row">{{item.id}}</th>
                <th>{{item.writer}}</th>
                <th>{{item.writertime}}</th>
                <th>{{item.content}}</th>
                <th>{{item.filepath}}</th>
            </tr>
        </tbody>

    </table>

</div>
</template>
<script>
export default {
    name : "Board",
    data(){
        return {
            msg: '게시판',
            counter: 0,
            list: []
        }
    },
    mounted: function(){
        this.msg = '게시ㅏㅍㄴ아ㄴㅇ럼ㄴ라ㅓ너ㅏㅣㅇㄹ'
    },
    methods: {
        plus : function(){
            this.counter = this.counter +1 
        },
        getData: function(){
            this.$http.get('http://165.246.34.25:1665/resources/Mlog')
            .then(result=>{
                console.log(result.data.status)
                this.list = JSON.parse(result.data.result)
            })
            .catch(error=>{
                console.log('서버에러')
            })
        }
    }
}
</script>
<style>
</style>