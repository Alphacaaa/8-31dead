<script>
export default{
    data(){
        return{
            sessionQuestionnaire:{
                questionName:'',
                questionIntro:'',
                startTime:'',
                endTime:'',
                question:'',
                questionType:'單選題',
                questionContent:'',
                necessary:false,
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            }
        }
    },
    mounted(){
        const savedQuestionnaire = sessionStorage.getItem('sessionQuestionnaire')
        if(savedQuestionnaire){
            this.sessionQuestionnaire = JSON.parse(savedQuestionnaire)
        }
    }
}
</script>

<template>
    <div class="previewBox">
        <h1>{{ sessionQuestionnaire.questionName }}</h1>
        <h1>{{ sessionQuestionnaire.question }}</h1>
        <h1>{{ sessionQuestionnaire.questionType }}</h1>
        <h1>{{ sessionQuestionnaire.necessary ? '必填' : '' }}</h1>
        <h1>{{ sessionQuestionnaire.startTime }}</h1>
        <h1>{{ sessionQuestionnaire.endTime }}</h1>
        <ul>
            <li v-for="option in sessionQuestionnaire.comfirmOptions">
                {{ option.value }}
            </li>
        </ul>
    </div>

</template>

<style scoped lang="scss">
*{
    border: 1px solid black
}
h1{
    font-size: 24px;
}
</style>