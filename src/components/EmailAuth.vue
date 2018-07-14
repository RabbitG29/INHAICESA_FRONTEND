<template>
    <div class="container">
        반갑습니다. {{id}}님
        <br>
        이 사이트를 방문해주셔서 감사합니다.
        <br>
        이 사이트를 사용하려면 이메일 인증을 해야함 ㅋ 
        <br>
        <button @click.prevent="pushEmail" class="btn btn-primary btn-lg">학교 이메일로 이메일 전송</button>

    </div>
</template>
<script>
export default {
    name: 'EmailAuth',
    data (){
        return {
            id: '',
        }
    },
    methods: {
        pushEmail: function(){
            
        }
    },
    mounted: function(){
        this.id = this.$route.query.id
    },
    computed : {
        isLogged () {
            return this.$store.getters.isLogged
        }
    }
}
</script>
<style>
    
</style>
