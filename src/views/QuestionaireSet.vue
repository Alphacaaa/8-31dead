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
<!-- <breadCrum /> -->

<div class="Main">
    <!-- <breadCrum /> -->
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
            <button type="submit" @click="goNextAndSave()">下一步</button>
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
            font-size: 36px;
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
            }
        }
        .timeBox{
            margin: 0px;
            width: 30%;
            height: 10%;
            label{
                font-size: 36px;
            }
            .timePicker{
                margin-left:20px;
            }
        }
        button{
            position: absolute;
            right: 5%;
            bottom: 5%;
        }
    }
}


</style>

