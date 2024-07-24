<script>
export default{
    data(){
        return{
            questionnaire:{
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
        const savedQuestionnaire = sessionStorage.getItem('questionnaire')
        if(savedQuestionnaire){
            this.questionnaire = JSON.parse(savedQuestionnaire)
        }
    }
}
</script>

<template>
    <div class="previewBox">
        <h1>{{ questionnaire.questionName }}</h1>
        <h1>{{ questionnaire.question }}</h1>
        <h1>{{ questionnaire.questionType }}</h1>
        <h1>{{ questionnaire.necessary ? '必填' : '' }}</h1>
        <h1>{{ questionnaire.startTime }}</h1>
        <h1>{{ questionnaire.endTime }}</h1>
        <ul>
            <li v-for="option in questionnaire.comfirmOptions">
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