<template>
    <div class="container">
        <div v-if="mode=='index'">
            <h2>시간표 생성기</h2>
            <p>시간표 과목을 입력하면 가능한 시간표를 보여드립니다.</p>
            <p>같은 이름의 과목을 여러개 선택해도 하나만 시간표에 추가됩니다.</p>
            <hr>
            <div class="modal-container">
                <div>
                <h3>시간표 장바구니</h3>
                    <div class="form-group row">
                        <div class="col-sm-9"></div>
                        <div class="col-sm-3">
                            <button class="btn btn-secondary" @click="selectedData = []">초기화</button>
                            <button class="btn btn-primary" @click.prevent="getTimeTable()">제출</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">과목명</th>
                                    <th class="text-center">학년</th>
                                    <th class="text-center">학점</th>
                                    <th class="text-center">타입</th>
                                    <th class="text-center">교수</th>
                                    <th class="text-center">비고</th>
                                    <th class="text-center">
                                        <div id="isEs">
                                            필수
                                            <span id="isEs-tooltip">
                                                꼭 듣고 싶으면 체크하고 아니면 말어
                                            </span>
                                        </div>
                                        </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index2) in selectedData" :key="index2+item.sno">
                                    <td scope="row">{{item.subject}}</td>
                                    <td>{{item.grade}}</td>
                                    <td>{{item.credit}}</td>
                                    <td>
                                        <span v-if="item.category == '전공필수'" class="badge badge-primary">{{item.category}}</span>
                                        <span v-if="item.category == '전공선택'" class="badge badge-success">{{item.category}}</span>
                                        <span v-if="item.category == '교양필수'" class="badge badge-info">{{item.category}}</span>
                                        <span v-if="item.category == '교양선택'" class="badge badge-secondary">{{item.category}}</span>
                                    </td>

                                    <td>
                                        <select v-model="selectedData[index2].selectedPf" class="form-control form-control-sm">
                                            <option :value="''">아무나</option>
                                             <!--교수 이름 렌더링-->
                                            <option v-for="(c, index) in item.pfs" :key="index2*1000+index" :value="c">{{c}}</option>
                                        </select>
                                    </td>
                                    <td>    
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" v-model="selectedData[index2].isEssential">
                                        </div>
                                    </td>
                                    <td>{{item.bigo}}
                                    </td>
                                    <td>
                                        <div>
                                            <button class="btn btn-sm btn-primary" @click="selectedData.splice(index2,1)">제거</button>
                                        </div>
                                    </td>

                                </tr>
                                <tr v-if="selectedData.length == 0">
                                    <td colspan="8">선택된 사이트가 없습니다.</td>
                                </tr>
                                <tr v-else>
                                    <td></td>
                                    <td>총 학점</td>
                                    <td>{{sumCredit}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            <hr>
                <h3>과목 선택</h3>
                <div id="subject-box">
                    <div id="select-box" class="form-control">
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <b>학년</b>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="" v-model="grade">
                                <label>모두</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="1" v-model="grade">
                                <label>1학년</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="2" v-model="grade">
                                <label>2학년</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="3" v-model="grade">
                                <label>3학년</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="4" v-model="grade">
                                <label>4학년</label>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <b>학점</b>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="" v-model="credit">
                                <label>모두</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="1.0" v-model="credit">
                                <label>1학점</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="2.0" v-model="credit">
                                <label>2학점</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="3.0" v-model="credit">
                                <label>3학점</label>
                            </div>
                                <div class="col-sm-2">
                                <input type="radio" value="4.0" v-model="credit">
                                <label>4학점</label>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <b>종류</b>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="" v-model="category">
                                <label>모두</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="교양선택" v-model="category">
                                <label>교양선택</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="교양필수" v-model="category">
                                <label>교양필수</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="전공필수" v-model="category">
                                <label>전공필수</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="radio" value="전공선택" v-model="category">
                                <label>전공선택</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-6">
                                <input class="form-control" @input="searchFilter" placeholder="검색" v-model="lazyFilter">
                            </div>
                            <div class="col-sm-4">
                                <button class="btn btn-primary" @click="textFilter == ''">초기화</button>
                            </div>
                            

                        </div>
                    </div>
                    <div class="form-group">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">과목명</th>
                                    <th class="text-center">학년</th>
                                    <th class="text-center">학점</th>
                                    <th class="text-center">타입</th>
                                    <th class="text-center">비고</th>
                                    <th class="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in selectedSubject" :key="index">
                                    <td scope="row">{{item.subject}}</td>
                                    <td>{{item.grade}}</td>

                                    <td>{{item.credit}}</td>
                                    <td>
                                        <span v-if="item.category == '전공필수'" class="badge badge-primary">{{item.category}}</span>
                                        <span v-if="item.category == '전공선택'" class="badge badge-success">{{item.category}}</span>
                                        <span v-if="item.category == '교양필수'" class="badge badge-info">{{item.category}}</span>
                                        <span v-if="item.category == '교양선택'" class="badge badge-secondary">{{item.category}}</span>
                                    </td>
                                    <td>{{item.bigo}}</td>
                                    <td>
                                        <div>
                                            <button class="btn btn-sm btn-primary" @click="selectSubject(item)">추가</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mode == 'viewer'">
            <h3>시간표 뷰어</h3>
                <div class="form-group row">
                    <div class="col-sm-9"></div>
                    <div class="col-sm-3">
                        <button class="btn btn-secondary" @click="mode = 'index'">뒤로가기</button>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-2">
                        <button class="btn btn-primary" @click="setTablePos(tablePos-1)" :disabled="tablePos == 0"> ← </button>
                    </div>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-2">
                        {{timetable.count}}개 중 {{tablePos+1}}번째
                    </div>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-2">
                        <button class="btn btn-primary" @click="setTablePos(tablePos+1)" :disabled="tablePos == timetable.count-1"> → </button>
                    </div>
                </div>
                <div>
                    <div class="form-group row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-2">월</div>
                        <div class="col-sm-2">화</div>
                        <div class="col-sm-2">수</div>
                        <div class="col-sm-2">목</div>
                        <div class="col-sm-2">금</div>
                    </div>
                    <div v-for="(row, index) in timetable.result[tablePos]" :key="index" class="form-group row">
                        <div class="col-sm-2">
                            {{index+1}}교시
                        </div>
                        <div v-for="(item, index2) in row" :key="index2" class="col-sm-2">
                            <div v-if="item!='0'" class="class-cell">
                                {{item.subject}}({{item.name_pf||''}})
                                <div class="cell-tooltip">
                                    학수번호:{{item.sno}}
                                    <br>
                                    {{["월","화","수","목","금"][index2]}}요일 {{index+1}}교시
                                    <br>
                                    교수:{{item.name_pf}}
                                    <br>
                                    장소:{{item.place}}
                                </div>
                            </div>
                            <div v-else>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
/* eslint disable */
export default {
    name: 'timetable',
    data (){
        return {
            subData: [], // 과목 목록
            result: [], // 학년 별 과목 
            subject: '',
            credit: '',
            textFilter: '', 
            lazyFilter: '',
            mode: 'index',
            category: '',
            selectedData: [],
            timetable: [],
            tablePos: '',
            grade: ''
        }
    },
    computed: {
        // 선택된 과목들의 학점 총합
        sumCredit: function(){
            let sum = 0
            this.selectedData.forEach(v=>{
                sum+=Number(v.credit)
            })
            return sum
        },
        // 필터링을 거친 결과값을 리턴해준다.
        selectedSubject: function(){
            let arr = [];
            this.subData.forEach(v=>{
                if(v.grade != (this.grade || v.grade)){
                    return
                }
                if(v.category != (this.category || v.category)){
                    return
                }
                if(v.credit != (this.credit || v.credit)){
                    return
                }
                if(this.textFilter){
                    if(v.subject.trim().indexOf(this.textFilter) == -1 && v.subject.trim().indexOf(this.lazyFilter) == -1){
                        return;
                    }
                }
                arr.push(v)
            })
            return arr
        }
    },
    mounted: function(){
        console.log('hi from mounted')
        this.getDatas()
    },
    methods: {
        searchFilter: function(e){
            this.textFilter = e.target.value
        },
        // [추가] 버튼을 눌렀을때
        selectSubject: function(item){
            var pfSet = new Set() // 교수 이름 리스트
            
            this.result.forEach(v=>{
                if(v.subject == item.subject){ // 같은 과목이면
                    pfSet.add(v.name_pf) // 교수 이름을 Set에 넣어준다.
                }
            })
            item.pfs = [...pfSet]; // Set -> Array 형변환 [ES6 문법]

            item.selectedPf = '' // 선택된 교수 
            item.isEssential = true
            this.selectedData.push(item)

        },
        setTablePos: function(num){
//            num = 0
            console.log('setTablePos'+ num)
            console.log(this.timetable.result[num])
            this.timetable.result[num].forEach((row,j)=>{
                row.forEach((item,k)=>{
                    console.log(item)
                    let index = this.result.map(x=>x.sno).indexOf(item)
                    if(index != -1){
                        console.log('띵!'+JSON.stringify(this.result[index]))
                        item = {}
                        item = this.result[index]
                        this.timetable.result[num][j][k] = this.result[index]
                        console.log(item)
                    }
                })
            })
            this.tablePos = num
        },
        getDatas: function(){
            console.log('hi getdatas')
            this.$http.get(this.$config.targetURL+'/info/timetable/subjects')
            .then(r=>{
                console.log(r)
                if(r.data.status == 'success'){
                    var result = r.data.data
                    // 학년별로 과목 정렬
                    this.subData = result
                }
            })
            .catch(e=>{
                console.log(e)
            })

            this.$http.get(this.$config.targetURL+'/info/timetable/')
            .then(r=>{
                console.log(r)
                if(r.data.status == 'success'){
                    this.result = r.data.data
                    console.log(this.result)
                }
            })
            .catch(e=>{
                console.log(e)
            })
        },
        getTimeTable: function(){
            console.log(JSON.stringify(this.selectedData.map(x=>x.subject)))
            console.log(JSON.stringify(this.selectedData.map(x=>x.selectedPf)))
            var url = this.$config.targetURL+'/info/timetable/algorithm?subjects='+JSON.stringify(this.selectedData.map(x=>x.subject))+'&selectedPf='+JSON.stringify(this.selectedData.map(x=>x.selectedPf))+'&isEssential='+JSON.stringify(this.selectedData.map(x=>x.isEssential))
            console.log('hi get')
            console.log(url)

            this.$http.get(url)
            .then(r=>{
                if(r.data.status == 'success'){
                    console.log(r.data.data)
                    this.timetable = r.data.data
                    this.tablePos = 0
                    this.setTablePos(0)
                    this.mode = 'viewer'
                }
            })
            .catch(e=>{
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>
#select-box {
    padding-top: 30px;
}
.class-cell {
    position: absolute;
}
.cell-tooltip {
    position: relative;
    padding: 5px;
    background-color: black;
    color: white;
    z-index: 10;
    font-size: 15px;
    display: none;
}
.class-cell:hover .cell-tooltip {
    display: block;
}
#isEs {
    position: relative;
}
#isEs-tooltip {
    position: absolute;
    padding: 5px;
    background-color: black;
    color: white;
    z-index: 10;
    font-size: 12px;
    display: none;
}
#isEs:hover #isEs-tooltip {
    display: block;
}
</style>