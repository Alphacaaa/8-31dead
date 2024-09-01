<script>
import axios from 'axios';
export default{
data() {
    return {
        questionnaire:[] || null,
        userResponses: [],
        quizResponses: [],
        quizResponse:[
            {
            quizId:'',
            id:'',
            name:'',
            phone:'',
            email:'',
            age:'',
            ans:[],
            fillinDateTime:''
        }
    ],
    isDisabled: false 
    }
},

created() {
    this.initializeUserResponses();
    this.questionnaire = sessionStorage.getItem('dataQuestionnaires')
    const id = this.$route.params.id;
    // const previewData =  sessionStorage.getItem('previewData')
    console.log(id,JSON.parse(this.questionnaire))
    console.log(this.$route.params)
    // const previewData = sessionStorage.getItem('previewData')
    console.log(this.questionnaire)
    if (this.questionnaire) {
        this.questionnaires = JSON.parse(this.questionnaire);
        this.questionnaire = this.questionnaires.find(q => q.id === parseInt(id));
        
    } else {
        console.error('問卷資料未找到');
    }
    
},
methods: {
    formatResponses() {
        const quizResponses = []
        // 這裡遍歷 questionnaire 的問題列表
        if (this.questionnaire && this.questionnaire.questionList) {
            this.questionnaire.questionList.forEach((question, index) => {
                const response = this.userResponses[index];
                const quizResponse = {
                    quizId: this.questionnaire.id, 
                    id: question.id  , 
                    name: this.quizResponse.name, 
                    phone: this.quizResponse.phone, 
                    email: this.quizResponse.email, 
                    age: this.quizResponse.age, 
                    ans: Array.isArray(response) ? response.join(';') : response, // 填寫每個問題的答案
                    fillinDateTime: this.getCurrentDateTime() 
                };
                quizResponses.push(quizResponse);
            });
        }
        // console.log(quizResponses)
        return  { feedbackList: quizResponses };
    },
    getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`; 
    },
    initializeUserResponses() {
        if (this.questionnaire && this.questionnaire.questionList) {
            this.questionnaire.questionList.forEach((question, index) => {
                
                userResponses[index] = question.questionType === 'multi' ? [] : ''
            });
        }
    },
    parseOptions(optionsString) {
        return optionsString ? optionsString.split(';').map(option => option.trim()) : [];
    },
    toggleCheckbox(index, option) {
        
        if (!Array.isArray(this.userResponses[index])) {
            this.userResponses[index] = [];
        }
        const selectedOptions = this.userResponses[index];
        if (selectedOptions.includes(option)) {
            
            this.userResponses[index] = selectedOptions.filter(o => o !== option);
        } else {
            
            this.userResponses[index].push(option);
        }
        console.log()
    },
    
    submitResponses() {
        // this.initializeUserResponses()
        const formattedResponses = this.formatResponses();
        console.log(formattedResponses);
        axios.post('http://localhost:8080/quiz/fillin', formattedResponses)
        .then(response => {
            if (response.data.code !== 200) {
                console.error(response.data.code)
                console.error(response.data.messgage)
                console.log(response.data)
                console.log(response.data.messgage)
                alert(response.data.messgage+"！!！!");
            }else{
                console.log('Received data:', response.data);
                this.questionnaires = response.data.quizResList || [];
                sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.questionnaires));
                alert("填答完成");
                this.$router.push('/').then(() => {
                    this.$nextTick(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                })
            }
        })
        .catch(error => {
            this.error = 'Error: ' + error.message;
            alert(this.error)
        });
        // this.$router.push('/')
        // this.$router.push('/').then(() => {
            // // 確保導航完成後再滾動到頁面底部
            // this.$nextTick(() => {
                //   window.scrollTo(0, document.body.scrollHeight);
                // });
                
                // })
            },
            back(){
                this.$router.push('/').then(() => {
                    this.$nextTick(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                })
            },
            preview(){
                console.log( this.formatResponses())
                const sessionDataa = this.formatResponses()
                sessionStorage.setItem('previewData',JSON.stringify(sessionDataa))
                const test = sessionStorage.getItem('previewData')
                const parsedTest = JSON.parse(test);
                console.log(parsedTest)
                console.log(this.questionnaire)
                sessionStorage.setItem('question',JSON.stringify(this.questionnaire))
                const id = this.$route.params.id;
                // this.$router.push({name:'SubmitPreview',params:{id}})
                this.isDisabled = !this.isDisabled;
            }
},
    
}

</script>
<template>
    <div class="main">

    
     <div class="title">
            <h1>{{ questionnaire.questionName }}</h1>
            <h1>{{ questionnaire.questionIntro}}</h1>
            <!-- <h1>{{ userResponses }}</h1> -->
        </div>
    <div class="infoBox">
            
        
        <div class="info">
            <div class="name" >
                <label for="">姓名</label>
            <input type="text" v-model="quizResponse.name" :disabled="isDisabled">
            </div>
            <!-- <div class="sex">
                <label for="">性別</label>
                <input type="radio" name="sex" class="sexual" v-model= "quizResponse.value">男
                <input type="radio" name="sex" class="sexual" v-model= "quizResponse.value">女
            </div> -->
            <div class="email">
                <label for="">Email</label>
                <input type="text" v-model="quizResponse.email" :disabled="isDisabled">
            </div>
            <div class="phoneNum">
                <label for="">手機號碼</label>
            <input type="Number" v-model="quizResponse.phone" :disabled="isDisabled">
            </div>
            <div class="age">
                <label for="">年齡</label>
                <input type="Number" v-model="quizResponse.age" :disabled="isDisabled">
            </div>
            
        </div>
    </div>
    <div v-if="questionnaire">
        <!-- <h1>{{ questionnaire.id }}</h1> -->
        <div class="questionBox"v-for="(question, index) in questionnaire.questionList" :key="index">
            <!-- <h1>{{ index + 1 }}</h1> -->
            <h1>{{ question.question }}</h1>
            <div v-if="question.necessary == true" class="necessary">
                <!-- <p>*</p> -->
                <img src="/snorlax-pixel.gif" width="36" alt="">
            </div>
            <!-- <h1>{{ question.questionType }}</h1> -->
            <div v-if="question.questionType === 'single'">
                <label v-for="(option, idx) in parseOptions(question.comfirmOptions)" :key="idx">
                    <input type="radio" :name="'question-' + index" :value="option" v-model="userResponses[index]" :disabled="isDisabled"/>
                        {{ option }}
                </label>
            </div>
            <div v-if="question.questionType === 'multi'">
                <label v-for="(option, idx) in parseOptions(question.comfirmOptions)" :key="idx">
                    <input type="checkbox" :name="'question-' + index" :value="option"  :checked="userResponses[index] && userResponses[index].includes(option)" @change="toggleCheckbox(index, option)" :disabled="isDisabled" />
                    {{ option }}
                </label>
            </div>
            <div v-if="question.questionType === 'text'">
                <input type="textArea" :name="'question-' + index"  v-model="userResponses[index]" :disabled="isDisabled"/>
            </div>
        <!-- <ul>
            <li v-for="(option, idx) in question.options" :key="idx">{{ option }}</li>
        </ul> -->
        </div>
        
        <div class="buttonDivsss2">
            <div class="buttonSet2">
                <button class="blue" @click="back()">BACK</button>
                <button @click="submitResponses()">SUBMIT</button>
                <button @click="preview()">PREVIEW</button>
            </div>
        </div>
        <!-- <button @click="submitResponses()">提交回應</button>
        <button @click="back()">返回</button> -->
    </div>
</div>
</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
    
    // border: 1px solid black;
}
.main{
    background-color:var(--color-page-bg);  
    width: 100vw;
    height: 100vh;
    overflow: auto;
}
.title{
    margin: auto;
    text-align: center;
}
.infoBox{
    input{
        background-color:var(--color-page);  
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        margin-top:20px;
    }
}
.questionBox{
    width: 60%;
    margin:50px auto;
    label{
        display: block;

    }
}




.infoBox{
    // text-align: center;
    p{
        font-size: 75px;
    }
    .intro{
        font-size: 30px;
    }
}
    .info{
        width: 50%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        .name, .sex, .email, .phoneNum, .age{
            width: 100%;
            height: 20%;
            label{
                width: 10%;
            }
            input{
                width: 80%;
            }
            .sexual{
                width: 5%;
            }
        }
    }


    .buttonDivsss2{
    width: 100vw;
    height: 100px;
    background-color:var(--color-page-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    .buttonSet2{
        // margin-top: 30px;
        width: 600px;
        height: 100px;
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
            // margin-right: 20px;
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
        .blue{
            background-color: #fc2c2c;
            box-shadow: 0 10px 0px rgb(112, 8, 31);
            &:active{
                background-color: #fc2c2c; 
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                transform: translateY(5px); 
            }
        }
    }
}
</style>
