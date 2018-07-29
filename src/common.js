export default {
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
        }
    },
    data (){
        return {
            boardName: ['','FAQ','건의게시판','학칙','회의록','결산내역', '공지사항']
        }
    },
    methods: {
        
    }

}