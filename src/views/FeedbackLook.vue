<script>
// import { json } from 'd3';

export default{
    data(){
        return{
            feedbackList:[]
        }
    },
    created(){
        const email = this.$route.params.email
        console.log(email)
        const feedbackList = sessionStorage.getItem('feedbackList')
        console.log(feedbackList)
        if(feedbackList){
            this.feedbackList = JSON.parse(feedbackList)
        }
        console.log(this.feedbackList)
        this.feedbackList = this.feedbackList.filter(List => List.email === email);
        console.log(this.feedbackList)
        const savedData = sessionStorage.getItem('dataQuestionnaires')
        console.log(savedData)
        if (savedData) {
            this.questionnaire = JSON.parse(savedData);
        } else {
            console.error('資料未找到');
        }
        console.log(this.questionnaire)
        const id = this.feedbackList[0].quizId;
        console.log(id)
        console.log(this.questionnaire)
        
        if (this.questionnaire) {
            // this.questionnaires = JSON.parse(this.questionnaire);
            this.questionnaires = this.questionnaire.find(q => q.id === parseInt(id));
        console.log(this.questionnaires)
        }
        const questionAnswerMap = new Map();
            this.feedbackList.forEach(feedback => {
                const questionId = feedback.id;
                const answer = feedback.ans;
                const answersArray = answer.split(';').map(answer => answer.trim());
                if (!questionAnswerMap.has(questionId)) {
                    questionAnswerMap.set(questionId, []);
                }
                // questionAnswerMap.get(questionId).push(answer);
                questionAnswerMap.get(questionId).push(...answersArray);
            });

            console.log(this.questionnaires.questionList.id)
            this.questionnaires.questionList = this.questionnaires.questionList.map(question => {
                const answers = questionAnswerMap.get(question.id) || [];
                return {
                    ...question,
                    answers: answers
                };
            });

            this.questionnaires = this.questionnaires; 
            console.log( this.questionnaires);
    },

methods:{
    back(){
            const id = this.feedbackList[0].quizId;
            this.$router.push(`/feedBack/${id}`)
        }
    }
}
</script>

<template>
<div class="main">
    <div class="buttonDivsss4">
        <div class="buttonSet4">
            <button class="blue" @click="back()">BACK</button>
            <!-- <button @click="submitResponses()">提交回應</button> -->
        </div>
    </div>
    <div class="containerBox">
        <div class="title">
            <p>{{questionnaires.questionName}}</p>
            <p>{{ questionnaires.questionIntro }}</p>
        </div>
        <div class="infoBox">
            <div class="nameBox">
                <div class="name">
                    <p>姓名:</p>
                </div>
                <div class="userName">
                    <p>{{ feedbackList[0].name }}</p>
                </div>
            </div>
            <div class="emailBox">
                <div class="email">
                    <p>email:</p>
                </div>
                <div class="userEmail">
                    <p>{{ feedbackList[0].email }}</p>
                </div>
            </div>
            <div class="phoneBox">
                <div class="phone">
                    <p>電話:</p>
                </div>
                <div class="userPhone">
                    <p>{{ feedbackList[0].phone }}</p>
                </div>
            </div>
            <div class="ageBox">
                <div class="age">
                    <p>年齡:</p>
                </div>
                <div class="ageBox">
                    <p>{{ feedbackList[0].age }}</p>
                </div>
            </div>
        </div>
        <div class="content" v-for="(question,index) in questionnaires.questionList">
            
            <p class="questionName">{{ question.id }} 、 {{ question.question }}</p> 
            <!-- <p>{{ question.answers }}</p> -->
            <div class="ans" v-for="(ans,index) in question.answers">
                <!-- <p>{{ question.id }}、{{ question.question }}</p> -->
                <p>{{ ans }}</p>
            </div>
        </div>

    </div>
</div>

</template>

<style scoped lang="scss">
.main{
    width: 100vw;
    height: 100vh;
    /* text-align: center; */
    /* margin: auto; */
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: #e3dede;
    position: relative;
}
.title{
    width: 60%;
    margin: auto;
    text-align: center;
}
.infoBox{
    width: 40%;
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    /* text-align: center; */
    margin: 50px auto;
    /* text-align: center; */
    /* margin: auto; */
    .nameBox, .emailBox, .phoneBox, .ageBox{
        width: 100%;
        display: flex;
    }
    .name, .email, .phone, .age{
        width: 8%;
    }
    .userName{
        width: 80%;
    }
}

.content{
    width: 40%;
    margin: auto;
}
.questionName{
    border-bottom: 1px solid black;
}

.buttonDivsss4{
    /* // width: 100vw; */
    height: 200px;
    position:absolute;
    top: -3%;
    left: 1%;
    // background-color:var(--color-page-bg);
    background-color: #e3dede;
    display: flex;
    /* // justify-content: center; */
    align-items: center;
    .buttonSet4{
        /* // margin-top: 30px; */
        width: 225px;
        height: 75px;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #969DA3;
        border-radius: 5px;
        box-shadow: 0 10px 0px #666668;
        z-index: 99;
        font-family: 'Press Start 2P';
        button{
            display: block;
            background-color: #FF8800;
             /* margin-right: 20px; */
            margin: 20px;
            width: 200px;
            height: 50px;
            border-radius: 5px;
            border: none;
            box-shadow: 0 10px 0px rgb(151, 83, 9);
            transition: all 0.3s ease; 
            color: white;
            &:hover{
                box-shadow:  0 5px 0px rgba(0, 0, 0, 0.4); 
                transform: translateY(4px); 
            }
            &:active{
                background-color: #e67e22; 
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                transform: translateY(5px); 
            }
        }
    }
}

</style>