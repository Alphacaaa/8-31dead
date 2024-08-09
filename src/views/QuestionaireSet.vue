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
                <input v-model="questionnaire.questionName" type="text" placeholder="設定問卷名稱">
            </div>
            <div class="questionIntro">
                <div class="introDiv">
                    <span class="introLabel" for="intro" ><b>問卷說明:</b></span>
                </div>
                
                <textarea v-model="questionnaire.questionIntro" class="intro"  id="intro" ></textarea>
            </div>
            <div class="timeBox">
                <label for=""><b>開始時間:</b></label>
                <flat-pickr class="timePicker" v-model="questionnaire.startTime" :config="flatpickrOptions"></flat-pickr>
            </div>
            <div class="timeBox">
                <label for=""><b>結束時間:</b></label>
                <flat-pickr  class="timePicker" v-model="questionnaire.endTime" :config="flatpickrOptions2"></flat-pickr>
            </div>
<!-- 
            <a href="javascript: void(0)" class="createQsetBtn" @click="goNextAndSave()">
            下一步
            </a> -->
            <div class="buttonContainer">
                <button type="button" class="pixelButton" @click="goNextAndSave()">NEXT</button>
            </div>
            
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
    background-color:var(--color-page-bg);
    display: flex;
    flex-wrap: wrap;
    .formBox{
        width: 60%;
        height: 100%;
        margin:  auto;
        position: relative;

        form{
            height: 100%;
            padding: 50px;
            margin: auto;
            label{
            font-size: 24px;
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
                width: 620px;
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
    }
}

</style>

