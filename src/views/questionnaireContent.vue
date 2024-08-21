<script>
export default{

data() {
    return {
        questionnaire:[] || null
    }
},

created() {
    this.questionnaire = sessionStorage.getItem('dataQuestionnaires')
    const id = this.$route.params.id;
    console.log(id,JSON.parse(this.questionnaire))
    console.log(this.$route.params)

    if (this.questionnaire) {
    this.questionnaires = JSON.parse(this.questionnaire);
    this.questionnaire = this.questionnaires.find(q => q.id === parseInt(id));
    } else {
    console.error('問卷資料未找到');
    }
},
methods: {
    parseOptions(optionsString) {
        return optionsString ? optionsString.split(';').map(option => option.trim()) : [];
    },
},
    
}

</script>
<template>
    <div v-if="questionnaire">
        <h1>{{ this.questionnaire.questionName }}</h1>
        <h1>{{ questionnaire.questionIntro}}</h1>
        <h1>{{ questionnaire.question }}</h1>
        <!-- <h1>{{ questionnaire.id }}</h1> -->
        <div v-for="(question, index) in questionnaire.questionList" :key="index">
            <h2>{{ question.question }}</h2>
            <h1>{{ question.questionType }}</h1>
            <div v-if="question.questionType === 'single'">
                <label v-for="(option, idx) in parseOptions(question.comfirmOptions)" :key="idx">
                    <input type="radio" :name="'question-' + index" :value="option" />
                        {{ option }}
                </label>
            </div>
            <div v-if="question.questionType === 'multi'">
                <label v-for="(option, idx) in parseOptions(question.comfirmOptions)" :key="idx">
                    <input type="checkbox" :name="'question-' + index" :value="option" />
                        {{ option }}
                </label>
            </div>
            <div v-if="question.questionType === 'text'">
                <input type="textArea" :name="'question-' + index" :value="option" />
            </div>
        <!-- <ul>
            <li v-for="(option, idx) in question.options" :key="idx">{{ option }}</li>
        </ul> -->
        </div>
    </div>
</template>
