<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/HomePageList.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { useColorStore } from '@/stores/counter'
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
            editQuestionnaire:[] || null,
            settingShow: true,
            selectedDate1: null,
            selectedDate2: null,
            flatpickrOptions: {
                dateFormat: 'Y-m-d', 
                minDate:'today',
                defaultDate:this.calculateMinDateStart()
            },
            flatpickrOptions2: {
                dateFormat: 'Y-m-d', 
                defaultDate:this.calculateMinDateEnd()
            }
        }
    },
    created(){
        this.clearSessionData()

        this.editQuestionnaire = sessionStorage.getItem('dataQuestionnaires')
        const id = this.$route.params.id;
        console.log(id,JSON.parse(this.editQuestionnaire))
        console.log(this.$route.params)

        if (this.editQuestionnaire) {
        this.questionnaires = JSON.parse(this.editQuestionnaire);
        this.editQuestionnaire = this.questionnaires.find(q => q.id === parseInt(id));
        console.log(this.editQuestionnaire)
        } else {
        console.error('問卷資料未找到');
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
                <flat-pickr class="timePicker" v-model="editQuestionnaire.startTime" :config="flatpickrOptions"></flat-pickr>
                <!-- <input type="date" class="timePicker" v-model="editQuestionnaire.startTime" :config="flatpickrOptions"> -->
            </div>
            <div class="timeBox">
                <label for=""><b>結束時間:</b></label>
                <flat-pickr  class="timePicker" v-model="editQuestionnaire.endTime" :config="flatpickrOptions2"></flat-pickr>
            </div>

            <div class="buttonContainer">
                <button type="button" class="pixelButton" @click="goNextAndSave()">NEXT</button>
            </div>
            
        </form>
        <!-- <button type="button" @click="backToQset()">返回</button> -->
        <!-- <a href="javascript: void(0)" class="SetContentBtn" @click="backToQset()">
            <<返回
        </a> -->
        <form class="form2" action=""  @submit.prevent>
            <!-- <label for=""></label> -->
            <input class="setQuestion" type="text" v-model="questionnaire.question" :class="{'error' : showQuestionError}" placeholder="設定問題">
            <p v-if="showQuestionError" class="errorMsg">請先建立問題名稱</p>
            <label for="single">
                <input name="type" class="radio" type="radio" value="single" id="single" v-model="questionnaire.questionType">單選題
            </label>
            <label for="dupl">
                <input name="type"  class="radio" type="radio" value="multi" id="dupl" v-model="questionnaire.questionType">多選題
            </label>
            <label for="ans">
                <input name="type" class="radio" type="radio" value="text"  id="ans" v-model="questionnaire.questionType">簡答題
            </label>
            <input v-model="questionnaire.necessary" class="checkBox"type="checkbox" id="checkbox">
            <label class="checkBxoLabel" for="checkbox">必填</label>
        
            
            <div class="selection" >
                    <div class="newSelection"  >
                    <!-- <label class="newSelection"  v-if="questionnaire.questionType === 'single' || questionnaire.questionType === 'multi'"> -->
                        <!-- <span >新增選項</span> -->
                        <!-- <span v-if="buttonShow == true">新增選項</span> -->
                        <button v-if="questionnaire.questionType !== 'text'" @click="addSelection()" class="retro-button blueButton"><i class="fa-solid fa-plus"></i></button>
                        <p v-if="showSelectionError" class="errorMsg">選項不可為空</p>
                    </div>
                </div>
            <div class="optionAddAndView">
                <!-- <div class="comfirmList" v-if="editQuestionnaire.questionList.length > 0 && editQuestionnaire.questionType" > -->
                <div class="comfirmList" >
                        <div v-for="(option,index) in editQuestionnaire.questionList" :key="index" class="comfirmBox">
                            <!-- <span v-if="!(option.editAllow)">{{ option.value }}</span> -->
                            <span>{{ option.question }}</span>
                            <input class="editInput" v-model="option.value" v-if="option.editAllow" @keyup.enter="saveEdited(index)" type="text" placeholder="編輯...">
                            <img src="/public/edit-button.png"  width="30px" height="30px" @click="editSelection(index)" class="edit" v-if="!(option.editAllow)" >
                            <img @click="saveEdited(index)" v-if="option.editAllow" class="editComfirm" src="/public/pixelated.png" width="30px" height="30px" alt="">
                            <img @click="removeSelection(index)" class="remove-minus" src="/public/close.png" width="30px" height="30px" alt="">

                            <!-- <button class="editComfirm" v-if="option.editAllow" @click="saveEdited(index)" ><i class="fa-solid fa-check"></i></button> -->
                            <!-- <button class="edit" v-if="!(option.editAllow)" @click="editSelection(index)"><i class="fa-solid fa-pen"></i></button> -->
                            <!-- <button class="remove-minus"@click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button> -->
                        </div>
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
        <!-- <button type="submit" @click="submitForm()">加入</button> -->
        <!-- <div class="buttonDiv">
            <button @click="backToQset()" class="backButton" type="button"> << BACK</button>
            <button @click="submitForm()" class="submitButton" type="button">SUBMIT</button>
            <button @click="preview()" class="previewButton" type="button">PREVIEW>> </button>
        </div> -->
        
        </form>
    
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
            <button @click="backToQset()" class="backButton" type="button"> << BACK</button>
            <button @click="submitForm()" class="submitButton" type="button">SUBMIT</button>
            <button @click="preview()" class="previewButton" type="button">PREVIEW>> </button>
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

</style>

