<script>
import { RouterLink } from 'vue-router'
// import Vue from 'vue'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetContentList.vue'
import { useColorStore } from '@/stores/counter'
const colorStore = useColorStore()
const colors = colorStore.colors
// import preview from '../components/preview.vue'
// sessionStorage.setItem('key', JSON.stringify(questionnaire));
// const  data = JSON.parse(sessionStorage.getItem('key'));
export default {
    data(){
        return{
            // sessionQuestionnaire: JSON.parse(sessionStorage.getItem('sessionQuestionnaire')) || [],
            sessionQuestionnaire:[],
            questionnaire:{
                questionName:'',
                questionIntro:'',
                startTime:'',
                endTime:'',
                question:'',
                questionType:'單選題',
                necessary:false,
                questionContent:'',
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            },
            session:[],
            forPreview:[],
            optionsShow:true,
            buttonShow:true,
            editAllow:false,
            savedAndShow:false,
            editOrNot:null,
            showQuestionError:false,
            showSelectionError:false,
            draggingIndex: null,
            targetIndex: null,
            itemHeight: 50,
            placeholderIndex:null,
            changeColor:false,
            selectionShow:true,
            // formData{

            // },
        }
    },
    mounted(){
        // sortable.create(this.$refs.sortableContainer,{
        //     animation: 150,
        //     ghostClass: 'sortable-ghost',
        //     onEnd: (event) => {
        //         console.log('Item moved:', event.item);
        //     }
        // })
        // savedAndShow = false
        const savedQuestionnaire = sessionStorage.getItem('questionnaire')
        console.log(savedQuestionnaire)
        if (savedQuestionnaire){
            this.questionnaire = JSON.parse(savedQuestionnaire)
        }
        // 
        const sessionData = sessionStorage.getItem('sessionQuestionnaire')
        this.forPreview = sessionData ? JSON.parse(sessionData) : []
        this.sessionQuestionnaire = [...this.forPreview]

        console.log(this.questionnaire)
        console.log(this.forPreview)

        // if(sessionStorage.getItem('sessionQuestionnaire') !== null){
        //     const forPreview =  JSON.parse(sessionStorage.getItem('sessionQuestionnaire'))
        //     console.log("嗨")
            
        // }
    },
    methods:{
        addSelection(){
            this.questionnaire.options.push(
                {
                value :'', editAllow : false
                }
            )
            this.optionsShow = true
            this.buttonShow = false
            this.selectionShow = false
            console.log(this.optionsShow)
        },
        removeSelection(index){
            this.questionnaire.options.splice(index,1)
            this.questionnaire.comfirmOptions.splice(index,1)
            console.log(this.comfirmOptions)
            this.optionsShow = true
            this.buttonShow = true
            this.editAllow = false

        },
        cancelSelection(index){
            this.questionnaire.options.splice(index,1)
            // this.comfirmOptions.splice(index,1)
            console.log(this.comfirmOptions)
            this.optionsShow = true
            this.buttonShow = true
            this.editAllow = false

        },
        comfirm(){
            if(this.questionnaire.question.trim()===''){
                this.showQuestionError = true
                setTimeout(()=>{
                    this.showQuestionError = false
                },500)
                return
            }
            // this.comfirmOptions.push(...this.options)
            this.questionnaire.comfirmOptions.push(...this.questionnaire.options.filter(option => option.value.trim() !== ''))
            console.log(this.questionnaire.comfirmOptions)
            this.questionnaire.options =[]
            this.questionnaire.options.push(
                {
                value :'', editAllow : false
                }
            )
            // this.optionsShow = false
            // this.buttonShow = true
            console.log(this.optionsShow)
        },
        editSelection(index){
            // this.editAllow = true
            console.log(this.editAllow)
            this.questionnaire.comfirmOptions.forEach((option,editIndex)=>{
                if(index === editIndex) {
                    option.editAllow = true;
                    console.log(this.questionnaire.comfirmOptions)
                    console.log(this.questionnaire.comfirmOptions.editAllow)
                    console.log(option.editAllow)
                }else{
                    option.editAllow = false;
            }
            //     this.questionnaire.comfirmOptions[index].editAllow = (index === editIndex);
            // })
            console.log(this.editAllow)
        })
        },
        saveEdited(index){
            this.questionnaire.comfirmOptions[index].editAllow = false
        },
        submitForm(){
            if(this.questionnaire.question.trim()==='' ){
                this.showQuestionError = true
                setTimeout(()=>{
                    this.showQuestionError = false
                },500)
                return
            }else if((this.questionnaire.questionType ==='單選題' || this.questionnaire.questionType ==='多選題') && this.questionnaire.comfirmOptions.length == 0) {

                this.showSelectionError = true
                setTimeout(()=>{
                    this.showSelectionError = false
                },500)
                return
            }
            
            if(this.editOrNot !== null){
                this.forPreview[this.editOrNot] = {...this.questionnaire}
                this.sessionQuestionnaire[this.editOrNot] = {...this.questionnaire}
                // console.log(this.forPreview)
                // console.log(this.sessionQuestionnaire)
                // console.log(this.questionnaire)
                this.editOrNot = null
            }else{
                this.sessionQuestionnaire.push({...this.questionnaire})
                this.forPreview.push({...this.questionnaire})
            }
            
            console.log(this.sessionQuestionnaire)
            console.log("問題建立"+this.questionnaire)
            console.log("這是修改前資料庫"+sessionStorage.getItem('sessionQuestionnaire'))
            // if(sessionStorage.getItem('sessionQuestionnaire') === null){
            //     sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.sessionQuestionnaire));
            // }else{
            //     this.session = JSON.parse(sessionStorage.getItem('sessionQuestionnaire'))
            //     if(this.editOrNot !== null){
            //         this.session[this.editOrNot] = {...this.questionnaire}
            //     }else{
            //         this.session.push(this.questionnaire);
            //     }
            //     console.log("這是session"+this.session)
            //     console.log(this.questionnaire)
            sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.sessionQuestionnaire))
            console.log("修改後資料庫"+sessionStorage.getItem('sessionQuestionnaire'))
        // }
            // console.log(this.forPreview)
            this.questionnaire = {
                questionName: this.questionnaire.questionName,
                questionIntro: this.questionnaire.questionIntro,
                startTime:this.questionnaire.startTime,
                endTime:this.questionnaire.endTime,
                question:'',
                questionType:'單選題',
                necessary:false,
                questionContent:'',
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            }
            console.log(this.questionnaire)
            this.savedAndShow = true
            console.log(this.savedAndShow)
            
        },
        preview(){
            this.$router.push('/preview')
        },
        clear(){
            sessionStorage.clear();
            this.forPreview = []
            this.questionnaire = {
                questionName: '',
                questionIntro: '',
                startTime:'',
                endTime:'',
                question:'',
                questionType:'單選題',
                necessary:false,
                questionContent:'',
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            }
            console.log(sessionStorage.getItem('sessionQuestionnaire'))
        },
        backToQset(){
            sessionStorage.clear();
            this.forPreview = []
            this.questionnaire = {
                questionName: '',
                questionIntro: '',
                startTime:'',
                endTime:'',
                question:'',
                questionType:'單選題',
                necessary:false,
                questionContent:'',
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            }
            console.log(sessionStorage.getItem('sessionQuestionnaire'))
            this.$router.push('/QuestionaireSet')
        },
        editQuestion(index){
            this.questionnaire = {...this.forPreview[index]}
            this.editOrNot = index
        },
        removePreviewQuestion(index){
            this.forPreview.splice(index,1)
            this.sessionQuestionnaire.splice(index,1)
            sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.sessionQuestionnaire))
        },
    },
    components: {
        RouterLink,
        // SetContent,
        breadCrum,
        Header,
        SetList,
        // preview
    }
    
}
</script>

<template>
<Header />
<!-- <breadCrum /> -->

<div class="Main">
    <!-- <button type="button" @click="backToQset()">返回</button> -->
    <breadCrum />
    <div class="formBox">
        <!-- <button type="button" @click="backToQset()">返回</button> -->
        <!-- <a href="javascript: void(0)" class="SetContentBtn" @click="backToQset()">
            <<返回
        </a> -->
        <form action=""  @submit.prevent>
            <!-- <label for=""></label> -->
            <input class="setQuestion" type="text" v-model="questionnaire.question" :class="{'error' : showQuestionError}" placeholder="設定問題">
            <p v-if="showQuestionError" class="errorMsg">請先建立問題名稱</p>
            <label for="single">
                <input name="type" class="radio" type="radio" value="單選題" id="single" v-model="questionnaire.questionType">單選題
            </label>
            <label for="dupl">
                <input name="type"  class="radio" type="radio" value="多選題" id="dupl" v-model="questionnaire.questionType">多選題
            </label>
            <label for="ans">
                <input name="type" class="radio" type="radio" value="簡答題"  id="ans" v-model="questionnaire.questionType">簡答題
            </label>
            <input v-model="questionnaire.necessary" class="checkBox"type="checkbox" id="checkbox">
            <label class="checkBxoLabel" for="checkbox">必填</label>
        
            
            <div class="selection" >
                    <div class="newSelection"  >
                    <!-- <label class="newSelection"  v-if="questionnaire.questionType === '單選題' || questionnaire.questionType === '多選題'"> -->
                        <!-- <span >新增選項</span> -->
                        <!-- <span v-if="buttonShow == true">新增選項</span> -->
                        <button v-if="questionnaire.questionType !== '簡答題'" @click="addSelection()" class="retro-button blueButton"><i class="fa-solid fa-plus"></i></button>
                        <p v-if="showSelectionError" class="errorMsg">選項不可為空</p>
                    </div>
                </div>
            <div class="optionAddAndView">
                <div class="comfirmList" v-if="questionnaire.comfirmOptions.length > 0 && questionnaire.questionType" >
                        <div v-for="(option,index) in questionnaire.comfirmOptions" :key="index" class="comfirmBox">
                            <span v-if="!(option.editAllow)">{{ option.value }}</span>
                            <input class="editInput" v-model="option.value" v-if="option.editAllow" @keyup.enter="saveEdited(index)" type="text" placeholder="編輯...">
                            <img src="/public/edit-button.png"  width="30px" height="30px" @click="editSelection(index)" class="edit" v-if="!(option.editAllow)" >
                            <img @click="saveEdited(index)" v-if="option.editAllow" class="editComfirm" src="/public/pixelated.png" width="30px" height="30px" alt="">
                            <img @click="removeSelection(index)" class="remove-minus" src="/public/close.png" width="30px" height="30px" alt="">

                            <!-- <button class="editComfirm" v-if="option.editAllow" @click="saveEdited(index)" ><i class="fa-solid fa-check"></i></button> -->
                            <!-- <button class="edit" v-if="!(option.editAllow)" @click="editSelection(index)"><i class="fa-solid fa-pen"></i></button> -->
                            <!-- <button class="remove-minus"@click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button> -->
                        </div>
                </div>
                <transition-group v-if = "questionnaire.questionType === '單選題' || questionnaire.questionType === '多選題'" name="anime" tag="div" class="selectionAdd"  >
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
    </div>
    <div class="previewList">
        <div class="title">
            <p>{{ this.questionnaire.questionName}}</p>
            <!-- <p>{{ this.questionnaire.questionIntro}}</p> -->
            <div class="timeDiv">
                <p>{{ this.questionnaire.startTime}}</p>
                <p>{{ this.questionnaire.endTime}}</p>
            </div>
            
        </div>
        <div class="content" ref="sortableContainer" >
            <p v-for="(question,index) in forPreview" :key="index" >
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


</template>

<style scoped lang="scss">
*{
    // border:1px solid rgb(0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 24px;
    // font-family: 'Noto Sans Mono', monospace;
    // display: flex;
    // flex-wrap: wrap;
}
body{
    display: flex;
}
.placeholder {
    background-color: #ddd;
    border: 1px dashed #aaa;
    margin: 2px 0;
    height: 50px; 
}
.Main{
    background-color:#B9B5AA;
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;  
    .formBox{
        width: 40vw;
        height: 100%;
        // margin: auto;
        position: relative;
        // overflow-y: auto;
        scale:0.9;
        form{
            height: 90%;
            margin:20px;
            // display: flex;
            // flex-wrap: wrap;
            align-items: center;
            position: relative;
            label{
                width: 100px;
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
        
        margin-left: 4vw;
        width:38vw;
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
            width: 80%;
            height: 70%;
            margin: 10px auto;
            overflow-wrap: break-word;
            overflow-y: auto;
            p{
                width: 90%;
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
        }
            .buttonDiv{
            position: absolute;
            right: -4%;
            margin-top: 10px;
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
            .backButton, .submitButton, .previewButton{
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