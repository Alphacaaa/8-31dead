<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/HomePageList.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    data(){
        return{
            // sessionQuestionnaire: JSON.parse(sessionStorage.getItem('sessionQuestionnaire')) || [],
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
            settingShow: true,
            selectedDate: null,
            flatpickrOptions: {
                dateFormat: 'Y-m-d', 
                minDate:'today',
            }
        }
    },
    methods:{
        goNextAndSave(){
            if (this.questionnaire.questionName == "") {
                alert("請填寫問卷主題")
                this.$router.push('/QuestionaireSet')
                console.log("no")
            }else if(this.questionnaire !== undefined){
                sessionStorage.setItem('questionnaire',JSON.stringify(this.questionnaire));
                this.$router.push('/SetContent')
                console.log(" sessionStorage saved");
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
<breadCrum />

<div class="Main">
    <div class="formBox">
        <form action="" @submit.prevent>
            <div class="questionName">
                <label for="">問卷名稱:</label>
                <input v-model="questionnaire.questionName" type="text">
            </div>
            <div class="questionIntro">
                <label class="introLabel" for="intro" >問卷說明:</label>
                <input v-model="questionnaire.questionIntro" class="intro" type="text"  id="intro">
            </div>
            <div class="timeBox">
                <label for=""><b>開始時間:</b></label>
                <flat-pickr class="timePicker" v-model="questionnaire.startTime" :config="flatpickrOptions"></flat-pickr>
            </div>
            <div class="timeBox">
                <label for=""><b>結束時間:</b></label>
                <flat-pickr  class="timePicker" v-model="questionnaire.endTime" :config="flatpickrOptions"></flat-pickr>
            </div>
            <button class="btn" type="submit" @click="goNextAndSave()">
                下一步
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </form>
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
    background-color: #e3dede;
    // display: flex;
    // flex-wrap: wrap;
    .formBox{
        width: 60vw;
        height: 70vh;
        margin: auto;
        position: relative;
        // background-image: url('../public/paper-texture.jpg');
        // box-shadow:4px 4px ;
        form{
            margin:20px;
            // display: flex;
            // align-items: center;
            label{
            font-size: 24px;
            }
            .introLabel{
                height: 300px;
                line-height: 300px;
                vertical-align: top;
            }
            input{
                width: 70%;
                font-size: 24px;
                // height: 300px;
                margin-left: 20px;
            }
            .intro{
                height: 300px;
                margin-left: 20px;
                margin-top: 50px;
            }
        }
        .timeBox{
            margin: 0px;
            width: 30%;
            height: 10%;
            label{
                font-size: 24px;
            }
            .timePicker{
                margin-left:20px;
                background-color: #8b8687;
            }
        }
        button{
            position: absolute;
            right: 5%;
            bottom: 5%;
        }
    }
}

.btn,
.btn:focus,
.btn:hover {
    position: relative;
    min-width: 200px;
    border: 1px solid #000000;
    color: #000000;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    padding: 10px 20px;
}
.btn span:nth-child(1),
.btn span:nth-child(2),
.btn span:nth-child(3),
.btn span:nth-child(4) {
                    content: "";
                    display: block;
                    position: absolute;
                    background-color: #000000;
}
.btn span:nth-child(1) {
                    width: 1px;
                    left: 0;
                    bottom: 0;
}
.btn span:nth-child(2) {
                    height: 1px;
                    left: 0;
                    top: 0;
}
.btn span:nth-child(3) {
                    width: 1px;
                    right: 0;
                    top: 0;
}
.btn span:nth-child(4) {
                    height: 1px;
                    right: 0;
                    bottom: 0;
}
.btn:hover {
                    border: none;
}
.btn:hover span:nth-child(1) {
    animation: move1 1500ms infinite ease;
}
.btn:hover span:nth-child(2) {
                    animation: move2 1500ms infinite ease;
}
.btn:hover span:nth-child(3) {
                    animation: move3 1500ms infinite ease;
}
.btn:hover span:nth-child(4) {
                    animation: move4 1500ms infinite ease;
}
@keyframes move1 {
                    0% { height: 100%; bottom: 0; }
                    54% { height: 0; bottom: 100%; }
                    55% { height: 0; bottom: 0; }
                    100% { height: 100%; bottom: 0; }
}
@keyframes move2 {
                    0% { width: 0; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0; left: 100%; }
}
@keyframes move3 {
                    0% { height: 100%; top: 0; }
                    54% { height: 0; top: 100%; }
                    55% { height: 0; top: 0; }
                    100% { height: 100%; top: 0; }
}
@keyframes move4 {
                    0% { width: 0; right: 0; }
                    55% { width: 100%; right: 0; }
                    100% { width: 0; right: 100%; }
}
</style>

