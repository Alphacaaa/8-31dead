<script>
import { RouterLink } from 'vue-router'
// import Vue from 'vue'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetContentList.vue'
import interact from 'interactjs'
import sortable from 'sortablejs'
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
        <a href="javascript: void(0)" class="SetContentBtn" @click="backToQset()">
            <<返回
        </a>
        <form action=""  @submit.prevent>
            <!-- <label for=""></label> -->
            <input type="text" v-model="questionnaire.question" :class="{'error' : showQuestionError}" placeholder="設定問題">
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
                        <button v-if="questionnaire.questionType !== '簡答題'" @click="addSelection()"><i class="fa-solid fa-plus"></i></button>
                        <p v-if="showSelectionError" class="errorMsg">選項不可為空</p>
                    </div>
                </div>
            <div class="optionAddAndView">
                <div class="comfirmList" v-if="questionnaire.comfirmOptions.length > 0 && questionnaire.questionType" >
                        <div v-for="(option,index) in questionnaire.comfirmOptions" :key="index" class="comfirmBox">
                            <span v-if="!(option.editAllow)">{{ option.value }}</span>
                            <input class="editInput" v-model="option.value" v-if="option.editAllow" @keyup.enter="saveEdited(index)" type="text" placeholder="編輯...">
                            <button class="editComfirm" v-if="option.editAllow" @click="saveEdited(index)" ><i class="fa-solid fa-check"></i></button>
                            <button class="edit" v-if="!(option.editAllow)" @click="editSelection(index)"><i class="fa-solid fa-pen"></i></button>
                            <button class="remove-minus"@click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button>
                        </div>
                </div>
                <transition-group v-if = "questionnaire.questionType === '單選題' || questionnaire.questionType === '多選題'" name="anime" tag="div" class="selectionAdd"  >
                    <label  v-for="(option,index) in questionnaire.options" :key="index">
                        <input v-if="optionsShow" type="text" v-model="questionnaire.options[index].value" placeholder="輸入選項">
                        <button class="comfirmss" @click="comfirm()"><i class="fa-solid fa-check-to-slot"></i></button>
                        <button class="remove" @click="cancelSelection(index)"><i class="fa-solid fa-xmark"></i></button>
                    </label>
                </transition-group>
                <!-- <transition-group name="anime" tag="div" class="comfirmList" v-if="comfirmOptions.length > 0 && questionType"> -->
                
                
                
            </div>
        <!-- <button type="submit" @click="submitForm()">加入</button> -->
        <div class="buttonDiv">
            
            <!-- <button type="button" @click="clear()">清空</button> -->
            <!-- <button type="button" @click="backToQset()">返回</button> -->
            <a href="javascript: void(0)" class="SetContentBtn" @click="submitForm()">
                加入>>
            </a>
        </div>
        <!-- <div class="buttonGroup">
            <button type="button" @click="preview()">預覽</button>
            <button type="button" @click="clear()">清空</button>
            <button type="button" @click="backToQset()">返回</button>
        </div> -->
        
        </form>
    </div>
    <div class="previewList">
        <div class="title">
            <p>{{ this.questionnaire.questionName}}</p>
            <!-- <p>{{ this.questionnaire.questionIntro}}</p> -->
            <p>{{ this.questionnaire.startTime}}</p>
            <p>{{ this.questionnaire.endTime}}</p>
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
                
                <button @click="editQuestion(index)" class="previewEdit"><i class="fa-solid fa-pen"></i></button>
                <button @click="removePreviewQuestion(index)" class="previewEditMinus"><i class="fa-solid fa-minus"></i></button>
            </p>
            <!-- <p v-if="placeholderIndex !== null" class="placeholder" :style="{ height: itemHeight + 'px' }"></p> -->
        </div>
        
        <!-- <button type="button" @click="preview()">預覽</button> -->
        <a href="javascript: void(0)" class="btn-68" @click="preview()">
            預覽
        </a>
    </div>
    <!-- <preview v-if="savedAndShow"/> -->
    
</div>


</template>

<style scoped lang="scss">
*{
    // border:1px solid rgb(0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 24px;
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
    background-color: #e3dede;
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
                margin-top:20px ;
                font-size: 24px;
            }
            .introLabel{
                height: 200px;
            }
            input{
                width: 90%;
                font-size: 24px;
                // height: 100%;
                margin-left: 20px;
                // margin-bottom: 20px;
                // line-height: 200px;
                
            }
            .radio{
                width: 10%;
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
                button{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        z-index: 99;
                        // background-color: rgb(167, 167, 167);
                        background-color: rgb(0, 0, 0);
                        border: none;
                        // position: fixed;
                        &:hover{
                            background-color: rgb(75, 74, 74);
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
                // display: flex;
                // height: 70%;
                .comfirmList{
                    width: 100%;
                    // height: 70%;
                    // margin-top: 20px;
                    // border-radius:10px;
                    // position: absolute;
                    top:100%;
                    .comfirmBox{
                        border: none;
                        border-bottom: 1px solid black;
                        margin-top: 20px;
                        width: 100%;
                        height: 50px;
                        position: relative;
                        .editInput{
                            width: 80%;
                            background-color: #e3dede;
                            outline: none;
                            border: none;
                            border-bottom: 1px solid black;
                        }
                        .editComfirm{
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            // background-color: rgb(167, 167, 167);
                            background-color: #e3dede;
                            border: none;
                            position: absolute;
                            right: 7%;
                            &:hover{
                                background-color: rgb(167, 167, 167);
                            }
                        }
                        // .fa-check
                        .remove-minus{
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            // background-color: rgb(167, 167, 167);
                            background-color: #e3dede;
                            border: none;
                            position: absolute;
                            right: -0%;
                            &:hover{
                                background-color: rgb(167, 167, 167);
                            }
                        }
                        }
                    }
                }
        }
            .selectionAdd{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                position: relative;
                align-items: center;
                label{
                    width: 100%;
                    display: flex;
                    align-items: center;
                }
                input{
                    width: 80%;
                    margin-left: 20px;
                    border-radius: 10px;
                    border:none;
                    // border-bottom: 1px solid black;
                    outline: none;
                    padding: 5px;
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
        border-radius: 50%;
        // background-color: rgb(167, 167, 167);
        background-color: #e3dede;
        border: none;
        position: absolute;
        right: 7%;
        &:hover{
            background-color: rgb(167, 167, 167);
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
        .buttonDiv{
            position: absolute;
            bottom: 30%;
            right: -18%;
            z-index: 99;
        }
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
            width: 80%;
            margin: auto;
            text-align: center;
            p{
                font-size: 48px;
            }
        }
        .content{
            // border:1px solid rgb(0, 0, 0);
            width: 80%;
            height: 70%;
            margin: 50px auto;
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
                background-color: white;
                border-radius: 10px;
                .necessary{
                    // width: 60px;
                    height: 30%;
                    // position: absolute;
                    right: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
                    }
                }
                .previewEdit{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    // background-color: rgb(167, 167, 167);
                    // background-color: #e3dede;
                    border: none;
                    position: absolute;
                    right: 0%;
                    margin-left: 10px;
                    // button{
                    //     width: 40px;
                    //     height: 40px;
                    //     border-radius: 50%;
                    //     background-color: rgb(167, 167, 167);
                    //     background-color: rgb(0, 0, 0);
                    //     border: none;
                    // }
                    &:hover{
                        background-color: rgb(167, 167, 167);
                    }
                }
                .previewEditMinus{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        // background-color: rgb(167, 167, 167);
                        // background-color: #e3dede;
                        border: none;
                        position: absolute;
                        margin-left: 10px;
                        right: 10%;
                        &:hover{
                        background-color: rgb(167, 167, 167);
                        }
                    }
                
            }
        }
        .btn-68{
            position: absolute;
            right: 0;
            bottom: 9%;
            border-radius: 20px;
            text-decoration: none;
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
.SetContentBtn,
.SetContentBtn,
.SetContentBtn:focus {
    position: relative;
    min-width: 100px;
    background-color: black;
    border-radius: 4em;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition-duration: 0.4s;
    padding: 10px 20px;
}

.SetContentBtn:hover {
    background-color: #3A3A3A;
    color: white;
    transition-duration: 0.1s;
}
.SetContentBtn:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px white;
    border-radius: 4em;
}
.SetContentBtn:active:after {
    opacity: 1;
    transition: 0s;
    box-shadow: 0 0 0 0 white;
}
.SetContentBtn:active {
    top: 1px;
}



.btn-68,
.btn-68 *,
.btn-68 :after,
.btn-68 :before,
.btn-68:after,
.btn-68:before {
  border: 0 solid;
  box-sizing: border-box;
}
.btn-68 {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0;
}
.btn-68:disabled {
  cursor: default;
}
.btn-68:-moz-focusring {
  outline: auto;
}
.btn-68 svg {
  display: block;
  vertical-align: middle;
}
.btn-68 [hidden] {
  display: none;
}
.btn-68 {
  box-shadow: inset 0 0 0 2px #fff;
  box-sizing: border-box;
  display: block;
  font-weight: 900;
  padding: 1.2rem 3rem;
  position: relative;
  text-transform: uppercase;
  transition: color 0.1s linear;
}
.btn-68:after,
.btn-68:before {
  content: "";
  height: 0;
  position: absolute;
  width: 0;
}
.btn-68:before {
  border-right: var(--border);
  border-top: var(--border);
  left: 0;
  top: 0;
}
.btn-68:hover:before {
  --border: 4px solid #000;
  -webkit-animation: border-top-and-right 1s forwards;
  animation: border-top-and-right 1s forwards;
}
.btn-68:after {
  border-bottom: var(--border);
  border-left: var(--border);
  bottom: 0;
  right: 0;
  z-index: -1;
}
.btn-68:hover:after {
  --border: 4px solid #000;
  -webkit-animation: border-bottom-and-left 1s forwards;
  animation: border-bottom-and-left 1s forwards;
}
@-webkit-keyframes border-top-and-right {
  0% {
    height: 0;
    width: 0;
  }
  50% {
    height: 0;
    width: 100%;
  }
  to {
    height: 100%;
    width: 100%;
  }
}
@keyframes border-top-and-right {
  0% {
    height: 0;
    width: 0;
  }
  50% {
    height: 0;
    width: 100%;
  }
  to {
    height: 100%;
    width: 100%;
  }
}
@-webkit-keyframes border-bottom-and-left {
  0% {
    height: 0;
    width: 0;
  }
  50% {
    height: 0;
    width: 100%;
  }
  to {
    height: 100%;
    width: 100%;
  }
}
@keyframes border-bottom-and-left {
  0% {
    height: 0;
    width: 0;
  }
  50% {
    height: 0;
    width: 100%;
  }
  to {
    height: 100%;
    width: 100%;
  }
}

</style>