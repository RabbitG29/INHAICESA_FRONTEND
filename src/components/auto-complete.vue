<template>
    <div>
        <input class="form-control" :class="[checked?'is-valid':'is-invalid']" v-model="text" @keydown.enter="enter" @input="onChange" @keyup.esc="show=false" @keyup.up="up" @keyup.down="down" :disabled="disabled">
        <div class="input-header" v-if="show">
            <ul class="form-control">
                <li v-for="(item, index) in flist" :key="item.display" :class="[(ind||'') == index?'hovered':'']" @click="clickItem(item)">{{item.display||''}}</li>
                <div>
                    <small @click="show=false">닫기</small>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'auto-complete',
    props: {
        list: Array, // 보여지는 값 목록
        vlist: { // 실제로 v-model에 적용되는 값
            type: Array
        },
        value: {
        },
        disabled: {
            default: false
        },
        all: { // '모두'가 존재하는가?
            type: Boolean,
            default: true
        },
        none: {
            type: Boolean,
            default: false
        },
        maxItems: {
            type: Number,
            default: 4
        }
    },
    methods: { 
        up: function(){
            this.show = true
            console.log('up pushed')
            this.ind --;
            if(this.ind <= -1){
                this.ind = 0
            }
            console.log('pos='+this.ind)
        },
        down: function(){
            this.show = true
            console.log('down pushed')
            if(this.ind<=-1){
                this.ind = 0
                return;
            }
            this.ind++
            if(this.ind >= this.flist.length){
                this.ind = this.flist.length-1
            }
            console.log('pos='+this.ind)
        },
        enter: function(){
            if(this.ind>=0 || this.ind<this.flist.length){
                this.clickItem(this.flist[this.ind])
            }
        },
        onChange: function(e){
            console.log(e)
            this.text = e.target.value.trim();
            var text = e.target.value.trim().substr(0,this.text.length)
            var text2= e.target.value.trim().substr(0,this.text.length-1)
            console.log(this.text+'//'+text)
            this.ind = -2
            this.show = true // 값이 변하면 프리뷰창을 띄움
            this.checked = false // 빨강!
            if(this.text.trim() == '' && this.ind == -2){ // 아무것도 없으면 창을 다시 닫는다.
                this.show = false;
            }
            console.log('change detected') // 변화 감지
            this.flist = []
            for(const [i, v] of this.list.entries()){
                if(this.flist.length >= this.maxItems) return;
                if(v.indexOf(text)!=-1){
                    this.flist.push({
                        display: v,
                        value: this.vlist?this.vlist[i]:v
                    })
                }
            }
            if(this.flist.length == 0){
                for(const [i, v] of this.list.entries()){
                    if(this.flist.length >= this.maxItems) return;
                    if(v.indexOf(text2)!=-1){
                        this.flist.push({
                            display: v,
                            value: this.vlist?this.vlist[i]:v
                        })
                    }
                }
            }
            if("모두".indexOf(this.text!=-1) && this.flist.length < this.maxItems){
                this.flist.push({
                    display: '모두',
                    value: ''
                })
            }
            if(this.flist.length == 0){ // 해당하는 값이 없을떄
                if(this.none == true){
                    this.flist.push({
                        display: this.no_answer, 
                        value: this.no_answer})
                }
                else if(this.none == false){
                    this.show = false
                }
            }
            else {
                this.ind = 0 
            }
        },
        clickItem: function(v){ // 아이템을 선택함!
            //console.log(v.display + v.value)
            if(v){
                if(v.display != this.no_answer){
                    this.text = v.display;
                    this.$emit('input', v.value)
                    this.$emit('change', v.value)
                    this.checked = true;
                } 
                this.show = false
                this.ind = -2
            }
        },
        setInitItem: function(v){
            console.log('value changed detected:'+v)
            if(v){ // 초기값이 존재할때 리스트에서 찾아봐야지.
                for(var i=0;i<this.list.length;i++){
                    if(this.vlist){ 
                        if(this.vlist[i] == v){
                            this.clickItem({
                                display:this.list[i],
                                value:v
                            })
                        }
                    }
                }
            }
            else {
                this.text = ''
                this.checked = false
                this.ind = -2
                if(this.all){
                    this.text = '모두'
                    this.checked = true
                }
            }            
        }
    },
    created: function(){
        console.log('mounted: '+this.value)
        this.setInitItem(this.value)
    },
    watch: {
        value: function (v){ // v-model binding
            this.setInitItem(v)
        }
    },
    data(){
        return {
            flist: [],
            ind: -2, // index for flist
            text: '', // input 값
            checked: false, // 초록색? 빨간색?
            no_answer: '찾으시는 값이 존재하지 않습니다.',
            show: false
        }
    },
    mounted: function(){
    }
}
</script>
<style scoped>
ul{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition-duration: 0.2s;
    background: white;
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
}
li{
    padding-top:10px;
    padding-bottom:10px;
    list-style-type: none;
    font-size: 14px;
}
li:hover{
    transition-duration: 0.2s; 
    background: lightgrey;
}
.hovered{
    transition-duration: 0.2s;
    background: lightgrey;    
}
.input-header {
    position:relative;
}
</style>