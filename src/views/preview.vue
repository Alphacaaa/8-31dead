<script>
export default{
    data(){
        return{
            sessionQuestionnaire:[]
            // sessionQuestionnaire:{
            //     questionName:'',
            //     questionIntro:'',
            //     startTime:'',
            //     endTime:'',
            //     question:'',
            //     questionType:'單選題',
            //     questionContent:'',
            //     necessary:false,
            //     options:[],
            //     comfirmOptions:[],
            //     filteredOptions:[],
            // }
        }
    },
    mounted(){
        const savedQuestionnaire = sessionStorage.getItem('sessionQuestionnaire')
        if(savedQuestionnaire){
            this.sessionQuestionnaire = JSON.parse(savedQuestionnaire)
        }
        console.log(this.sessionQuestionnaire)
        // console.log(this.sessionQuestionnaire[0].questionName)
        // console.log(this.sessionQuestionnaire[0].comfirmOptions)
    },
    methods:{
        Back(){
            this.$router.push('/SetContent')
        }
    }
}
</script>

<template>
    <button @click="Back()">返回</button>
    <div class="questionBox">
        <div v-if="sessionQuestionnaire.length == 0" class="NotFound" >
            <p>你還沒有建立任何問題</p>
        </div>
        <div class="title" v-if="sessionQuestionnaire.length > 0">
            <p>{{ sessionQuestionnaire[0].questionName }}</p>


            <p v-for="(question,index) in sessionQuestionnaire">
                {{ question.question }}
                {{ question.questionType }}
                <p v-for="(option,index) in question.comfirmOptions">
                    {{ option.value}}
                </p>
            </p>
                
        </div>
    </div>

</template>

<style scoped lang="scss">

</style>