<template>
    <div class="container">
        <h3>시간표 관리</h3>
        <br>
        <div class="form-group">

            <button class="btn btn-danger" @click="resetTimeTable()">시간표 과목들 초기화 하기</button>
        </div>
        <div class="form-group row">
            <div class="col-sm-4"></div>
            <select v-model="dept" class="form-control col-sm-4">
                <option value="0194002">기계공학과 / 기계공학</option>
                <option value="0198005">항공우주공학과 / 항공우주공학</option>
                <option value="1013446">조선해양공학과 / 조선해양공학</option>
                <option value="1014514">산업경영공학과 / 산업경영공학</option>
                <option value="1235021">화학공학과 / 화학공학</option>
                <option value="1015304">생명공학과 / 생명공학</option>
                <option value="0223022">고분자공학과 / 고분자공학</option>
                <option value="1016386">신소재공학과 / 신소재공학</option>
                <option value="1017516">사회인프라공학과 / 사회인프라공학</option>
                <option value="0225028">환경공학과 / 환경공학</option>
                <option value="1104537">공간정보공학과 / 공간정보공학</option>
                <option value="0691156">건축학부 / 건축공학</option>
                <option value="0691305">건축학부 / 건축학</option>
                <option value="0930430">에너지자원공학과 / 에너지자원공학</option>
                <option value="0208014">전기공학과 / 전기공학</option>
                <option value="0209015">전자공학과 / 전자공학</option>
                <option value="1184217">컴퓨터공학과 / 컴퓨터공학</option>
                <option value="1185283">정보통신공학과 / 정보통신공학</option>
                <option value="1019517">융합기술경영학부 / 융합기술경영학</option>
                <option value="1223583">공대(SCSC) / 공대(SCSC)</option>
                <option value="1063157">수학과 / 수학</option>
                <option value="1064040">통계학과 / 통계학</option>
                <option value="1065039">물리학과 / 물리학</option>
                <option value="1066041">화학과 / 화학</option>
                <option value="1022306">생명과학과 / 생명과학</option>
                <option value="1023307">해양과학과 / 해양과학</option>
                <option value="1186074">식품영양학과 / 식품영양학</option>
                <option value="0333045">경영학과 / 경영학</option>
                <option value="1025431">글로벌금융학과 / 글로벌금융학</option>
                <option value="0934339">아태물류학부 / 물류학</option>
                <option value="1187268">국제통상학과 / 국제통상학</option>
                <option value="0267059">국어교육과 / 국어교육</option>
                <option value="0268065">영어교육과 / 영어교육</option>
                <option value="0275054">사회교육과 / 사회교육</option>
                <option value="0273057">체육교육과 / 체육교육</option>
                <option value="0276055">교육학과 / 교육학</option>
                <option value="0749160">수학교육과 / 수학교육</option>
                <option value="0478051">행정학과 / 행정학</option>
                <option value="0477053">정치외교학과 / 정치외교학</option>
                <option value="0479215">언론정보학과 / 언론정보학</option>
                <option value="1188047">경제학과 / 경제학</option>
                <option value="1189364">소비자학과 / 소비자학</option>
                <option value="1190557">아동심리학과 / 아동심리학</option>
                <option value="1191555">사회복지학과 / 사회복지학</option>
                <option value="1026369">한국어문학과 / 한국어문학</option>
                <option value="0301071">사학과 / 사학</option>
                <option value="0302072">철학과 / 철학</option>
                <option value="1192556">중국학과 / 중국학</option>
                <option value="1028485">일본언어문화학과 / 일본언어문화</option>
                <option value="0294067">영어영문학과 / 영어영문학</option>
                <option value="1029486">프랑스언어문화학과 / 프랑스언어문화</option>
                <option value="1236588">문화콘텐츠문화경영학과 / 문화콘텐츠문화경영학</option>
                <option value="0317077">의예과 / 의예</option>
                <option value="0321079">간호학과 / 간호학</option>
                <option value="0318078">의학과 / 의학</option>
                <option value="1200563">메카트로닉스학과 / 메카트로닉스</option>
                <option value="1238590">소프트웨어융합공학과 / 소프트웨어융합공학</option>
                <option value="1202560">헬스디자인학과 / 헬스디자인</option>
                <option value="1239591">산업경영학과 / 산업경영학</option>
                <option value="1204562">금융세무재테크학과 / 금융세무재테크</option>
                <option value="0756344">예술체육학부 / 예술체육학부</option>
                <option value="1193558">조형예술학과 / 조형예술학</option>
                <option value="1237589">디자인융합학과 / 디자인융합학</option>
                <option value="1195519">스포츠과학과 / 스포츠과학</option>
                <option value="1196372">연극영화학과 / 연극영화학</option>
                <option value="1197288">의류디자인학과 / 의류디자인학</option>
                <option value="1207569">프런티어학부대학 / 프런티어학부대학</option>
                <option value="1199564">국제학부 / 국제학</option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="crawlByDept()">전공 추가하기</button>
        </div>
        <div class="form-group ">
            <button class="btn btn-primary" @click="crawlEnglish()">영어과목 추가하기</button>
        </div>
        <div class="form-group ">
            <button class="btn btn-primary" @click="crawlHackgyo()">핵심교양 추가하기</button>
        </div>
        <div class="form-group ">
            <button class="btn btn-primary" @click="crawlGyo()">일반교양 추가하기</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Admin',
    data () {
        return {
            dept: '1185283'
        }
    },
    methods: {
        resetTimeTable: function(){
            this.$http.get(this.$config.targetURL+'/info/timetable/db/reset')
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 초기화 되었습니다..'
                    })
                }
                else if(r.data.status == 'error'){
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg || ''
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
        crawlByDept: function(){
            this.$http.get(this.$config.targetURL+'/info/timetable/db/insert?dept='+this.dept)
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 추가되었습니다.'
                    })
                }
                else if(r.data.status == 'error'){
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg || ''
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
        crawlEnglish: function(){
            this.$http.get(this.$config.targetURL+'/info/timetable/db/insert/english')
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 추가되었습니다.'
                    })
                }
                else if(r.data.status == 'error'){
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg || ''
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

        crawlHackgyo: function(){
            this.$http.get(this.$config.targetURL+'/info/timetable/db/insert2')
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 추가되었습니다.'
                    })
                }
                else if(r.data.status == 'error'){
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg || ''
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
        crawlGyo: function(){
            this.$http.get(this.$config.targetURL+'/info/timetable/db/insert3')
            .then(r=>{
                if(r.data.status == 'success'){
                    this.$notice({
                        type: 'success',
                        text: '성공적으로 추가되었습니다.'
                    })
                }
                else if(r.data.status == 'error'){
                    this.$notice({
                        type: 'error',
                        text: r.data.errMsg || ''
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
    }
}
</script>
