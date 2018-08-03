<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <router-link tag="li" to="/adminboard" class="breadcrumb-item active" aria-current="page">게시판 관리</router-link>
                <router-link tag="li" to="/admintimetable" class="breadcrumb-item active" aria-current="page">시간표 관리</router-link>
            </ol>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
