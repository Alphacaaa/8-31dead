<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/HomePageList.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { useColorStore } from '@/stores/counter'
import axios from 'axios';
const colorStore = useColorStore()
const colors = colorStore.colors
export default {
    data(){
        return{
            // sessionQuestionnaire: JSON.parse(sessionStorage.getItem('sessionQuestionnaire')) || [],
            // questionnaire:{
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
            // },
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
            },
            questionOption:{
                question:'',
                questionType:'single',
                option:[],
                necessary:false,
            },
            eQuestionnaire:[],
            eOption:[],
            editQuestionnaire:[] || null,
            editQuestionnaires:[] || null,
            settingShow: true,
            selectedDate1: null,
            selectedDate2: null,
            showSaveMessage: false, 
            saveMessage: '', 
            data : [],
            flatpickrOptions: {
                dateFormat: 'Y-m-d', 
                // minDate:'today',
                defaultDate:this.calculateMinDateStart()
            },
            flatpickrOptions2: {
                dateFormat: 'Y-m-d', 
                defaultDate:this.calculateMinDateEnd()
            },
            editOrNot:false
        }
    },
    created(){
        this.clearSessionData()
        const savedData = sessionStorage.getItem('dataQuestionnaires')
        console.log(savedData)
        if (savedData) {
            this.editQuestionnaire = JSON.parse(savedData);
            
        } else {
            console.error('資料未找到');
        }
        console.log(this.editQuestionnaire)
        // this.editQuestionnaire = sessionStorage.getItem('dataQuestionnaires')
        const id = this.$route.params.id;
        // console.log(id,JSON.parse(this.editQuestionnaire))
        console.log(this.$route.params)

        if (Array.isArray(this.editQuestionnaire)) {
            // this.questionnaires = JSON.parse(this.editQuestionnaire);
            this.editQuestionnaire = this.editQuestionnaire.find(q => q.id === parseInt(id));
            console.log(this.editQuestionnaire)
            if (this.editQuestionnaire) {
            this.editQuestionnaire = JSON.parse(JSON.stringify(this.editQuestionnaire));
        }
        
        //     if (this.eQuestionnaire && Array.isArray(this.eQuestionnaire.questionList)) {
        //         this.eQuestionnaire.questionList.forEach(question => {
        //             if (question.comfirmOptions) {
        //                 question.comfirmOptions = question.comfirmOptions.split(';');
        //         }
        //     })
        // }
        console.log(this.editQuestionnaire)
        this.editQuestionnaires = this.editQuestionnaire;
        console.log(this.editQuestionnaires)

    }
},
    mounted(){
        this.flatpickrOptions.minDate = this.calculateMinDateStart()
    },
    methods:{
        calculateMinDateStart() {
            const now = new Date()
            now.setDate(now.getDate() + 2)
            return now.toISOString().split('T')[0]
            },
        calculateMinDateEnd() {
            const now = new Date()
            
            now.setDate(now.getDate() + 7)
            return now.toISOString().split('T')[0]
            },
        goNextAndSave(){
            if (this.questionnaire.questionName == "") {
                alert("請填寫問卷主題")
                this.$router.push('/QuestionaireSet')
                console.log("no")
            }else if(this.questionnaire !== undefined){
                console.log(this.questionnaire)
                sessionStorage.setItem('questionnaire',JSON.stringify(this.questionnaire));
                this.$router.push('/SetContent')
                console.log("sessionStorage saved");
            }
        },
        clearSessionData(){
            sessionStorage.removeItem('sessionQuestionnaire')
            sessionStorage.removeItem('questionnaire')
            console.log("清除session")
        },
        parseOptions(optionsString) {
        return optionsString ? optionsString.split(';').map(option => option.trim()) : [];
        },
        editQuestion(index) {
            this.editOrNot = true
            console.log(this.editQuestionnaire.questionList)
            this.questionOption = JSON.parse(JSON.stringify(this.editQuestionnaire.questionList[index]));
            console.log(this.editQuestionnaire.questionList[index])
            console.log(this.questionOption)
            // if (typeof this.questionOption.comfirmOptions === 'string') {
            //     this.questionOption.comfirmOptions = this.questionOption.comfirmOptions.split(';').map(option => option.trim());
            // }
            const optionsArray = this.questionOption.comfirmOptions.split(';').map(option => option.trim());


            this.questionOption.option = optionsArray.length > 0 && optionsArray.some(option => option !== '') ? optionsArray : [];
            console.log(this.questionOption);
        },
    
        preview(){
            sessionStorage.setItem('dataQuestion', JSON.stringify(this.editQuestionnaire))
            this.$router.push('/EditPreview')
            // console.log(this.editQuestionnaire)
            // axios.post('http://localhost:8080/quiz/update', this.editQuestionnaire)
            // .then(response => {
            //     console.log('success', response.data);
            // })
            // .catch(error => {
            //     console.error('傳送問卷資料時出現錯誤:', error);
            // });
        },
        removeOption(index){
            this.questionOption.option.splice(index, 1);
        },
        removePreviewQuestion(index){
            this.editQuestionnaire.questionList.splice(index, 1);
            this.editQuestionnaire.questionList.forEach((question, idx) => {
            question.id = idx + 1; 
            });
            console.log(this.editQuestionnaire)

        }
        ,
        addSelection(){

            this.questionOption.option.push('')
        },
        addQuestion(){
        //     const addId = this.$route.params.id
        //     const newQuestion = {
        //     quizId:parseInt(addId),
        //     id: this.editQuestionnaire.questionList.length + 1, 
        //     question: '新增問題',
        //     questionType: 'single', 
        //     comfirmOptions: ["選項1"], 
        //     necessary: false 
        // };
        if(this.editOrNot){
                return
            }
        const id = this.$route.params.id;
        const questionPush = {
            quizId:parseInt(id),
            id:this.editQuestionnaire.questionList.length + 1,
            question:this.questionOption.question,
            questionType:this.questionOption.questionType,
            comfirmOptions:this.questionOption.option.join(';'),
            necessary:this.questionOption.necessary,
        }
        console.log(questionPush)
        this.editQuestionnaire.questionList.push({...questionPush});

        this.questionOption = {
            question:'',
            questionType:'single',
            option:[],
            necessary:false,
        }
        console.log(this.questionOption)
        console.log( this.editQuestionnaire)
        // this.questionOption.push(newQuestion)
        },
        submitForm(){
            if (this.questionOption.questionType === 'text') {
            this.questionOption.comfirmOptions = [];
        }
            if (this.questionOption) {
                const index = this.editQuestionnaire.questionList.findIndex(q => q.id === this.questionOption.id);
                if (index !== -1) {
                    const updatedQuestionOption = { ...this.questionOption };

                    if (Array.isArray(updatedQuestionOption.option)) {
                        updatedQuestionOption.comfirmOptions = updatedQuestionOption.option.join(';');
                    }

                    this.editQuestionnaire.questionList[index] = updatedQuestionOption;
                }
                console.log(this.editQuestionnaire)
            // this.eOption = {...this.questionOption}
            // this.editQuestionnaire = { ...this.eQuestionnaire };
            // this.editQuestionnaire.questionList.forEach(question => {
            //     if (Array.isArray(this.eOption.comfirmOptions)) {
            //         eOption.comfirmOptions = eOption.comfirmOptions.join(';');
            //     }
            // })
            // console.log(this.questionOption)
            // console.log(this.eOption)
            sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.editQuestionnaire));
            this.data = sessionStorage.getItem('dataQuestion');
            console.log('Data from sessionStorage:', this.data);
            console.log('Data from sessionStorage:', this.editQuestionnaire);
            axios.post('http://localhost:8080/quiz/update', this.editQuestionnaire)
            .then(response => {
                console.log('success', response.data);
                this.saveMessage = '已保存'; 
                this.showSaveMessage = true; 
                setTimeout(() => this.showSaveMessage = false, 3000); 
            })
            .catch(error => {
                // console.error('傳送問卷資料時出現錯誤:', error);
                // console.log(error)
                this.saveMessage = '保存失敗'; 
                this.showSaveMessage = true; 
                setTimeout(() => this.showSaveMessage = false, 3000); 
                if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                // console.error('Error response headers:', error.response.headers);
                }

            });
        }
        // this.$router.push('/CreateQManage').then(() => {
        //         window.location.reload();
        // })
        },
        back(){
            this.$router.push('/CreateQManage').then(() => {
                window.location.reload();
        })
        },
        clear(){
            this.questionOption={
                question:'',
                questionType:'single',
                option:[],
                necessary:false,
            }
        }
    },
    components: {
        RouterLink,
        QuestionaireSetFirst,
        breadCrum,
        Header,
        flatPickr
    }
}

</script>

<template>
<Header />
<!-- <breadCrum /> -->

<div class="Main">
    <!-- <breadCrum /> -->
    <div class="formBox">
        <form action="" @submit.prevent>
            <div class="questionName">
                <label for=""><b>問卷名稱:</b></label>
                <input v-model="this.editQuestionnaire.questionName" type="text" placeholder="設定問卷名稱">
            </div>
            <div class="questionIntro">
                <div class="introDiv">
                    <span class="introLabel" for="intro" ><b>問卷說明:</b></span>
                </div>
                
                <textarea v-model="this.editQuestionnaire.questionIntro" class="intro"  id="intro" ></textarea>
            </div>
            <div class="timeBox">
                <label for=""><b>開始時間:</b></label>
                <!-- <flat-pickr class="timePicker" v-model="editQuestionnaire.startTime" :config="flatpickrOptions"></flat-pickr> -->
                <input  class="timePicker" type="date" v-model="editQuestionnaire.startTime" >
                <!-- <input type="date" class="timePicker" v-model="editQuestionnaire.startTime" :config="flatpickrOptions"> -->
            </div>
            <div class="timeBox">
                <label for=""><b>結束時間:</b></label>
                <!-- <flat-pickr  class="timePicker" v-model="editQuestionnaire.endTime" :config="flatpickrOptions2"></flat-pickr> -->
                <input  class="timePicker" type="date" v-model="editQuestionnaire.endTime" >
            </div>

            <!-- <div class="buttonContainer">
                <button type="button" class="pixelButton" @click="goNextAndSave()">NEXT</button>
            </div> -->
            
        </form>
        <!-- <button type="button" @click="backToQset()">返回</button> -->
        <!-- <a href="javascript: void(0)" class="SetContentBtn" @click="backToQset()">
            <<返回
        </a> -->
        <form class="form2" action=""  @submit.prevent>
            <!-- <label for=""></label> -->
            <!-- <input class="setQuestion" type="text" v-model="questionOption.question" :class="{'error' : showQuestionError}" placeholder="設定問題"> -->
            <input class="setQuestion" type="text" v-model="questionOption.question"  placeholder="設定問題">
            <!-- <p v-if="showQuestionError" class="errorMsg">請先建立問題名稱</p> -->
            <label for="single">
                <input name="type" class="radio" type="radio" value="single" id="single" v-model="questionOption.questionType">單選題
            </label>
            <label for="dupl">
                <input name="type"  class="radio" type="radio" value="multi" id="dupl" v-model="questionOption.questionType">多選題
            </label>
            <label for="ans">
                <input name="type" class="radio" type="radio" value="text"  id="ans" v-model="questionOption.questionType">簡答題
            </label>
            <input v-model="questionOption.necessary" class="checkBox"type="checkbox" id="checkbox">
            <label class="checkBxoLabel" for="checkbox">必填</label>
        <!-- <h1>{{ questionOption }}</h1> -->
            
            <div class="selection" >
                    <div class="newSelection"  >
                    <!-- <label class="newSelection"  v-if="questionnaire.questionType === 'single' || questionnaire.questionType === 'multi'"> -->
                        <!-- <span >新增選項</span> -->
                        <!-- <span v-if="buttonShow == true">新增選項</span> -->
                        <button v-if="questionnaire.questionType !== 'text'" @click="addSelection()" class="retro-button blueButton"><i class="fa-solid fa-plus"></i></button>
                        <!-- <p v-if="showSelectionError" class="errorMsg">選項不可為空</p> -->
                    </div>
                </div>
            <div class="optionAddAndView">
                <!-- <div class="comfirmList" v-if="editQuestionnaire.questionList.length > 0s && editQuestionnaire.questionType" > -->
                <div class="comfirmList" >
                        <!-- <div v-for="(option,index) in editQuestionnaire.questionList" :key="index" class="comfirmBox"> -->
                            <div v-for="(options,index) in questionOption.option"  :key="index">
                                <!-- <input type="text" v-model="questionOption.comfirmOptions"/> -->
                                <!-- <span type="text" v-model="questionOption.comfirmOptions">{{ questionOption.comfirmOptions  }}</span> -->
                                <!-- <div v-if="options[index].questionType === 'single' || options[index].questionType === 'multi'"> -->

                                    <input  v-model="questionOption.option[index]">
                                    <img src="/public/close.png" width="30px" height="30px" @click="removeOption(index)"  class="previewEditMinus">
                                <!-- </div> -->
                                <!-- <button class="remove-button">刪除</button> -->
                                <!-- <h1>{{ options }}</h1> -->
                                <!-- <input class="editInput" v-model="option.value" v-if="option.editAllow" @keyup.enter="saveEdited(index)" type="text" placeholder="編輯..."> -->
                                <!-- <img src="/public/edit-button.png"  width="30px" height="30px" @click="editSelection(index)" class="edit" v-if="!(option.editAllow)" > -->
                                <!-- <img src="/public/edit-button.png"  width="30px" height="30px" @click="editSelection(index)" class="edit"  > -->
                                <!-- <img @click="saveEdited(index)" class="editComfirm" src="/public/pixelated.png" width="30px" height="30px" alt=""> -->
                                <!-- <img @click="saveEdited(index)" v-if="option.editAllow" class="editComfirm" src="/public/pixelated.png" width="30px" height="30px" alt=""> -->
                                <!-- <img @click="removeSelection(index)" class="remove-minus" src="/public/close.png" width="30px" height="30px" alt=""> -->
                            </div>
                            <!-- <span v-if="!(option.editAllow)">{{ option.value }}</span> -->

                            <!-- <button class="editComfirm" v-if="option.editAllow" @click="saveEdited(index)" ><i class="fa-solid fa-check"></i></button> -->
                            <!-- <button class="edit" v-if="!(option.editAllow)" @click="editSelection(index)"><i class="fa-solid fa-pen"></i></button> -->
                            <!-- <button class="remove-minus"@click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button> -->
                        
                </div>
                <transition-group v-if = "questionnaire.questionType === 'single' || questionnaire.questionType === 'multi'" name="anime" tag="div" class="selectionAdd"  >
                    <div class="selectionAddInputDiv" v-for="(option,index) in questionnaire.options" :key="index">
                        <input v-if="optionsShow" type="text" v-model="questionnaire.options[index].value" placeholder="輸入選項">
                        <!-- <button class="comfirmss" @click="comfirm()"><i class="fa-solid fa-check-to-slot"></i></button> -->
                        <img @click="comfirm()" class="pixelComfirm" src="/public/pixelated.png" width="30px" height="30px" alt="">
                        <img @click="cancelSelection(index)" class="pixelRemove" src="/public/close.png" width="30px" height="30px" alt="">
                        <!-- <button class="remove" @click="cancelSelection(index)"><i class="fa-solid fa-xmark"></i></button> -->
                    </div>
                </transition-group>
                <!-- <transition-group name="anime" tag="div" class="comfirmList" v-if="comfirmOptions.length > 0 && questionType"> -->
                
                
                
            </div>
        </form>
        <!-- <button type="submit" @click="submitForm()">加入</button> -->
        <!-- <div class="buttonDiv">
            <button @click="backToQset()" class="backButton" type="button"> << BACK</button>
            <button @click="submitForm()" class="submitButton" type="button">SUBMIT</button>
            <button @click="preview()" class="previewButton" type="button">PREVIEW>> </button>
        </div> -->
        
    
    <div class="previewList">
        <div class="title">
            <!-- <p>{{ this.questionnaire.questionName}}</p> -->
            <!-- <p>{{ this.questionnaire.questionIntro}}</p> -->
            <div class="timeDiv">
                <p>{{ this.questionnaire.startTime}}</p>
                <p>{{ this.questionnaire.endTime}}</p>
            </div>
            
        </div>
        <div class="content" ref="sortableContainer" >

            <p class="questionName" v-for="(question,index) in editQuestionnaire.questionList" :key="index" >
                {{index +1 }}﹑
                {{ question.question }}
                <!-- <input type="checkbox" v-model="sessionQuestionnaire.necessary"> -->
                <div class="necessary">
                    <!-- <label for="necessary"  :class="{'changeColor' : question.necessary}">*</label>
                        <input type="checkbox" id="necessary" v-model="question.necessary"> -->
                    <p class="necessaryP" v-if="question.necessary == true">*</p>
                </div>
                <!-- <p class="type">{{ question.questionType }}</p> -->
                <img src="/public/edit-button.png" width="30px" height="30px" @click="editQuestion(index)" class="previewEdit">
                <!-- <button @click="editQuestion(index)" class="previewEdit"><i class="fa-solid fa-pen"></i></button> -->
                <img src="/public/close.png" width="30px" height="30px" @click="removePreviewQuestion(index)" class="previewEditMinus">
                <!-- <button @click="removePreviewQuestion(index)" class="previewEditMinus"><i class="fa-solid fa-minus"></i></button> -->
            </p>
            <!-- <p v-if="placeholderIndex !== null" class="placeholder" :style="{ height: itemHeight + 'px' }"></p> -->
        </div>
        <div class="buttonDiv">
            <button @click="back()" class="backButton1" type="button"> BACK</button>
            <button @click="addQuestion()" class="backButton" type="button"> ADD</button>
            <div v-if="showSaveMessage" class="saveMessage">{{ saveMessage }}</div>
            <button @click="submitForm()" class="submitButton" type="button">SAVE</button>
            <button @click="clear()">clear</button>
            <button @click="preview()">PREVIEW</button>
            <!-- <button @click="preview()" class="previewButton" type="button">PREVIEW>> </button> -->
        </div>
    </div>
    </div>

</div>


</template>

<style scoped lang="scss">
*{
    // border:1px solid black;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
    // font-size: 24px;
    // background-color: #ECE2C6;
    // background-color: #649ABC;
    // display: flex;
    // flex-wrap: wrap;
}

.Main{
    width: 100vw;
    height: 85vh;
    // overflow: auto;
    background-color:var(--color-page-bg);
    display: flex;
    flex-wrap: wrap;
    .formBox{
        width: 100vw;
        height: 100%;
        margin:  auto;
        position: relative;
        display: flex;
        form{
            height: 100%;
            width: 80%;
            // padding: 50px;
            // margin-right: 10px;
            label{
            font-size: 24px;
            margin-left: 20px;
            font-family: 'Noto Sans Mono', monospace;
            }
            .questionIntro{
                margin-top: 40px;
                height: 200px;
                display: flex;
            }
            input{
                font-family: 'Noto Sans Mono', monospace;
                box-shadow: 0 0 0 2px var(--color-page-bg) inset;
                text-shadow: 1px 1px 0 #000;
                width: 620px;
                font-size: 24px;
                margin-left: 20px;
                border-radius: 5px;
                padding-left: 10px;
                background-color: rgba(255, 255, 255, .2);

            }
            span{
                // margin-top: 10px;
                font-size: 24px;
            }
            .intro{
                font-family: 'Noto Sans Mono', monospace;
                height: 150px;
                width: 485px;
                font-size: 18px;
                padding-left: 10px;
                padding-top: 5px;
                margin-left: 30px;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, .2);
                // margin-top: 50px;
            }
        
        .timeBox{
            margin-top: 20px;
            width: 35%;
            height: 20%;
            label{
                font-size: 24px;
                margin-bottom: 10px;
            }
            .timePicker{
                margin-left:20px;
                width: 200px;
                background-color: rgba(255, 255, 255, .2);
            }
        }
        // button{
        //     position: absolute;
        //     right: 5%;
        //     bottom: 5%;
        // }
        .buttonContainer {
            position: absolute;
            right: 10%;
            width: 225px;
            height: 70px;
            // display: inline-block;
            font-family: 'Press Start 2P', cursive; 
            display: flex;
            justify-content: center;
            background-color: #969DA3;
            border-radius: 5px;
            box-shadow: 0 10px 0px #666668;
            align-items: center;
            padding-bottom: 5px;
            .pixelButton{
                background-color: #FF8800;
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
        .form2{
            height: 100%;
            width: 100%;
            margin:20px;
            // display: flex;
            // flex-wrap: wrap;
            align-items: center;
            position: relative;
            label{
                width: 150px;
                margin-top:20px ;
                font-size: 24px;
            }
            .introLabel{
                height: 200px;
            }
            .setQuestion{
                // width: 90%;
                // font-size: 24px;
                // margin-left: 20px;
                
                box-shadow: 0 0 0 2px var(--color-page-bg) inset;
                text-shadow: 1px 1px 0 #000;
                width: 90%;
                font-size: 36px;
                // margin-left: 20px;
                border-radius: 5px;
                padding-left: 10px;
                background-color: rgba(255, 255, 255, .2);
            }
            .radio{
                width: 20%;
                height: 20px;
            }
            
            
            .checkBox{
                width: 20px;
                margin-left: 10px;
            }
            .checkBxoLabel{
                font-size: 24px;
                // margin-left: 20px;
            }
            .selection{
                // width:;
                // height: 100%;
                height: 50px;
                // background-color: black;
                // position: fixed;
                .newSelection{
                    // width: 40%;
                    // height:100%;
                    display: flex;
                    align-items: center;
                    // background-color: black;
                    font-size: 12px;
                    color:white;
                    // border-radius: 20px;
                    text-align: center;
                }
                span{
                    margin-left: 20px;
                    font-size: 24px;
                }
                .blueButton{
                    width: 10px;
                    --color-bg:#0066B4;
                    --color-bg-light:#3981CA;
                    --color-bg-dark:#004EAD;
                }
                }
                    }
                .fa-plus{
                    // background-color: rgb(209, 203, 203);
                    color: rgb(255, 255, 255);
                    
                }
            .optionAddAndView{
                width: 100%;
                height: 80%;
                position: relative;
                overflow-y: auto;
                // display: flex;
                // height: 70%;
                .comfirmList{
                    width: 90%;
                    background-color: '#7D878F';
                    // height: 70%;
                    // margin-top: 20px;
                    // border-radius:10px;
                    // position: absolute;
                    top:100%;
                    input{
                        width: 80%;
                    }
                    .comfirmBox{
                        border: none;
                        // border-bottom: 1px solid black;
                        display: flex;
                        // justify-content: center;
                        align-items: center;
                        background-color: #7D878F;
                        margin-top: 20px;
                        width: 100%;
                        height: 40px;
                        position: relative;
                        border-radius: 5px;
                        .editInput{

                            background-color: #7D878F;
                            outline: none;
                            // border: none;
                            // border-bottom: 1px solid black;
                            box-shadow: 0 0 0 2px var(--color-page-bg) inset;
                            text-shadow: 1px 1px 0 #000;
                            width: 79%;
                            font-size: 24px;
                            // margin-left: 20px;
                            border-radius: 5px;
                            padding-left: 10px;
                            background-color: rgba(255, 255, 255, .2);
                        }
                        
                        .editComfirm{
                            width: 30px;
                            height: 30px;
                            border: none;
                            margin-left: 33px;
                            // position: absolute;
                            // right: 15%;
                            &:hover{
                                cursor: pointer;
                                scale: 1.1;
                            }
                        }
                        .remove-minus{
                            width: 30px;
                            height: 30px;
                            margin-left: 20px;
                            border: none;
                            position: absolute;
                            right: 3.2%;
                            &:hover{
                                cursor: pointer;
                                scale: 1.1;
                            }
                        }
                        }
                    }
                }
        }
            .selectionAdd{
                // display: flex;
                flex-wrap: wrap;
                // width: 500px;
                position: relative;
                align-items: center;
                .selectionAddInputDiv{
                    margin-top: 20px;
                    width: 90%;
                    display: flex;
                    align-items: center;
                    background-color: #7D878F;
                    border-radius: 5px;
                    .pixelComfirm{
                        margin-left: 40px;
                        margin-right: 20px;
                        &:hover{
                            // background-color: gray;
                            cursor: pointer;
                            scale: 1.1;
                        }
                    }
                    .pixelRemove{
                        margin-right: 20px;
                        &:hover{
                            // background-color: rgb(168, 166, 166);
                            cursor: pointer;
                            scale: 1.1;
                        }
                    }
                }
                input{
                    box-shadow: 0 0 0 2px var(--color-page-bg) inset;
                    text-shadow: 1px 1px 0 #000;
                    width: 90%;
                    font-size: 24px;
                    // margin-left: 20px;
                    border-radius: 5px;
                    padding-left: 10px;
                    background-color: rgba(255, 255, 255, .2);
                }
                .comfirmss{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: rgb(167, 167, 167);
                    background-color: white;
                    background-color: #e3dede;
                    border: none;
                    position: absolute;
                    right: 7%;
                    &:hover{
                        background-color: rgb(167, 167, 167);
                    }
                }
                .remove{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: rgb(167, 167, 167);
                    background-color: #e3dede;
                    border: none;
                    position: absolute;
                    right: 1%;
                    &:hover{
                        background-color: rgb(167, 167, 167);
                    }
                }
            }

    .edit{
        width: 35px;
        height: 35px;
        // border-radius: 50%;
        // background-color: rgb(167, 167, 167);
        // background-color: #e3dede;
        border: none;
        position: absolute;
        right: 11%;
        &:hover{
            scale:1.1;
            cursor: pointer;
            }
        }
        span{
            margin-left: 20px;
        }

        .submit{
            position: absolute;
            bottom: 0;
            right: 0;
        }
        
    }

    .previewList{
        // border:1px solid rgb(0, 0, 0);
        
        // margin-left: 4vw;
        margin-right: 2vw;
        width:55vw;
        height: 85vh;
        position: relative;
        // z-index: -1;
        .title{
            // border:1px solid rgb(0, 0, 0);
            font-family: 'Press Start 2P', cursive;
            width: 80%;
            margin: auto;
            text-align: center;

            .timeDiv{
                position: absolute;
                right: 8%;
                top: 4%;
                p{
                    font-size: 12px;
                    color: white;
                }
            }
            p{
                font-size: 48px;
            }
        }
        .content{
            // border:5px solid #7D878F;
            width:100%;
            height: 70%;
            margin: 10px auto;
            overflow-wrap: break-word;
            overflow-y: auto;
            p{
                width: 95%;
                height: 100px;
                padding: 10px;
                display: flex;
                align-items: center;
                margin: 10px auto;
                position: relative;
                background-color: #7D878F;
                color: white;
                border: 5px solid #6e6e6e;
                // border-radius: 10px;
                // transition: transform .3s ease .3s;
                .necessary{
                    // width: 60px;
                    height: 30%;
                    // position: absolute;
                    right: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // border: none;
                    .changeColor{
                        color: red;
                    }
                    input{
                        display: none;
                    }
                    .necessaryP{
                        width: 100%;
                        height: 100%;
                        color: red;
                        border: none;
                    }
                }
                .previewEdit{
                    width: 35px;
                    height: 35px;
                    // border-radius: 50%;
                    // background-color: rgb(167, 167, 167);
                    // background-color: #e3dede;
                    border: none;
                    position: absolute;
                    right: 0%;
                    margin-left: 10px;
                    &:hover{
                        scale: 1.1;
                        cursor: pointer;
                        // background-color: rgb(167, 167, 167);
                    }
                }
                .previewEditMinus{
                        width: 30px;
                        height: 30px;
                        // border-radius: 50%;
                        border: none;
                        position: absolute;
                        margin-left: 10px;
                        right: 10%;
                        &:hover{
                            scale: 1.1;
                            cursor: pointer;
                        }
                    }
                
            }
            // .questionName{
            //     width: 80;
            //     overflow-x: auto;
            // }
        }
    }
    .previewEditMinus{
        width: 30px;
        height: 30px;
        // border-radius: 50%;
        border: none;
        position: absolute;
        margin-left: 10px;
        right: 10%;
        &:hover{
            scale: 1.1;
            cursor: pointer;
            }
        }

    .buttonDiv{
            position: absolute;
            right: 11%;
            margin-top: 80px;
            // margin-right:500px;
            // border: 1px solid black;
            width: 800px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #969DA3;
            border-radius: 5px;
            box-shadow: 0 10px 0px #666668;
            z-index: 99;
            font-family: 'Press Start 2P';
            .backButton, .submitButton, .previewButton, .backButton1{
                background-color: #FF8800;
                color: white;
                margin: 10px;
                width: 200px;
                height: 50px;
                border-radius: 5px;
                border: none;
                box-shadow: 0 10px 0px rgb(151, 83, 9);
                transition: all 0.3s ease; 
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
            .submitButton{
                background-color :#0066B4;
                box-shadow: 0 10px 0px #033257;
                &:hover{
                    box-shadow:  0 5px 0px rgba(0, 0, 0, 0.4); 
                    transform: translateY(4px); 
                }
                &:active{
                    background-color: #0066B4; 
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                    transform: translateY(5px); 
                }
            }
            .previewButton{
                width: 240px;
                background-color :#2dc234;
                box-shadow: 0 10px 0px #115314;
                &:hover{
                    box-shadow:  0 5px 0px #115314; 
                    transform: translateY(4px); 
                }
                &:active{
                    background-color: #2dc234; 
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                    transform: translateY(5px); 
                }
            }
            .backButton1{
                // width: 240px;
                background-color :#ff0202;
                box-shadow: 0 10px 0px #8f0a0a;
                &:hover{
                    box-shadow:  0 5px 0px #df0404; 
                    transform: translateY(4px); 
                }
                &:active{
                    background-color: #ff0202;
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                    transform: translateY(5px); 
                }
            }
        }
    

.errorMsg{
    color: red;
    font-size: 16px;
    margin-top: 5px;
}
.error {
    border: 2px solid red;
    animation: shake 0.5s;
}

@keyframes shake {
    0% { transform: translateX(-5px); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
}
.anime-enter-active, .anime-leave-active {
    transition: opacity 0.5s;
}
.anime-enter, .anime-leave-to {
    opacity: 0;
}




.retro-button{
    position:relative;
    appearance:none;
    box-sizing:border-box;
    font-size:calc( var(--button-height) / 3 );
    font-family: 'Open Sans', sans-serif;
    background: var(--color-bg);
    height:var(--button-height);
    // min-width:20px;
    width: 20px;
    border-radius:calc( var(--button-height) / 2);
    border:0;
    font-weight:800;
    text-transform:uppercase;
    color:var(--color-text);
    text-shadow: 1px 1px var(--color-text-shadow);
    cursor:pointer;
    margin:6px 6px;
    letter-spacing:.1em;
    transition: all 200ms ease;
    box-shadow:
        -1px  -1px 1px var(--color-bg), 
        0 0 0 4px var(--color-overlay-medium), 
        1px  1px 1px var(--color-bg-dark), 
        inset .0 .0 .0 var(--color-overlay-dark),  
        inset .5rem .5rem .25rem var(--color-bg-light) 
}

.retro-button::-moz-focus-inner{
    outline:none;
    border:none;
}

.retro-button:focus{
    outline:none;
    box-shadow:
    -1px -1px 1px var(--color-bg-dark),
    0 0 0 4px var(--color-tab-focus), 
    1px  1px 1px var(--color-bg-dark),
    inset 0 0 0 var(--color-overlay-dark), 
    inset .5rem .5rem .25rem var(--color-bg-light), 
    ;
}

.retro-button:hover{
    box-shadow:
        -1px -1px 1px var(--color-bg-dark), 
        0 0 0 4px var(--color-overlay-dark), 
        1px  1px 1px var(--color-bg-dark), 
        inset 0 0 0 var(--color-overlay-dark), 
        inset .5rem .5rem .25rem var(--color-bg-light), 
        ;
    }

.retro-button:active{
    box-shadow:
        inset 1px 1px 1px var(--color-bg),  
        0 0 0 4px var(--color-overlay-dark), 
        inset -1px -1px 1px var(--color-bg-light),   
        inset .5rem .5rem .75rem var(--color-bg-dark), 
        inset .5rem .5rem .5rem var(--color-bg-light), 
}

</style>

