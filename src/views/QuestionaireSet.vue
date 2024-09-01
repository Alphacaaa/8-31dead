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
                questionType:'single',
                questionContent:'',
                necessary:false,
                options:[],
                comfirmOptions:[],
                filteredOptions:[],
            },
            minDate:'',
            editQuestionnaire:[] || null,
            settingShow: true,
            selectedDate1: null,
            selectedDate2: null,
            flatpickrOptions: {
                dateFormat: 'Y-m-d', 
                // minDate:'today',
                // defaultDate:this.calculateMinDateStart()
            },
            flatpickrOptions2: {
                dateFormat: 'Y-m-d', 
                // defaultDate:this.calculateMinDateEnd()
            }
        }
    },
    created(){
        this.clearSessionData()
    //    // 从sessionStorage获取问卷数据
    //     this.editQuestionnaire = sessionStorage.getItem('dataQuestionnaires');
    //     console.log(this.$route.params)
        
    //     // 获取路由中的ID参数
    //     const id = this.$route.params.id;
    //     // const id = "ya";
    //     console.log("Received ID:", id);
    //     console.log("Session Storage Data:", JSON.parse(this.editQuestionnaire));


    //     if (this.editQuestionnaire) {
    //     this.questionnaires = JSON.parse(this.editQuestionnaire);
    //     this.editQuestionnaire = this.questionnaires.find(q => q.id === parseInt(id));
    //     console.log(this.editQuestionnaire)
    //     this.questionnaire.questionName = this.editQuestionnaire.questionName || this.questionnaire.questionName;
    //     this.questionnaire.questionIntro = this.editQuestionnaire.questionIntro || this.questionnaire.questionIntro;
    //     this.questionnaire.startTime = this.editQuestionnaire.startTime || this.questionnaire.startTime;
    //     this.questionnaire.endTime =this.editQuestionnaire.endTime || this.questionnaire.endTime;
    //     this.questionnaire.questionType = this.editQuestionnaire.questionType || this.questionnaire.questionType;
    //     this.questionnaire.questionContent = this.editQuestionnaire.questionContent || this.questionnaire.questionContent;
    //     this.questionnaire.necessary = this.editQuestionnaire.necessary !== undefined ? editQuestionnaire.necessary : this.questionnaire.necessary;
    //     console.log(this.questionnaire)

    //     } else {
    //     console.error('問卷資料未找到');
    //     }

    },
    mounted(){
        // this.flatpickrOptions.minDate = this.calculateMinDateStart()
        this.setMinDate();
    },
    methods:{
        // calculateMinDateStart() {
        //     const now = new Date()
        //     now.setDate(now.getDate() + 2)
        //     return now.toISOString().split('T')[0]
        //     },
        // calculateMinDateEnd() {
        //     const now = new Date()
            
        //     now.setDate(now.getDate() + 7)
        //     return now.toISOString().split('T')[0]
        //     },
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
        setMinDate() {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // 月份從0開始，因此加1
            let dd = today.getDate();

            // 格式化月份和日期為兩位數
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            // 組合成 YYYY-MM-DD 格式
            this.minDate = `${yyyy}-${mm}-${dd}`;
            },
        updateMinEndDate() {
            // 當開始日期改變時，更新結束日期的最小值
            // 如果結束日期早於開始日期，則自動設置為開始日期
            if (this.endDate && this.endDate < this.startDate) {
                this.endDate = this.startDate;
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
                <input v-model="this.questionnaire.questionName" type="text" placeholder="設定問卷名稱">
            </div>
            <div class="questionIntro">
                <div class="introDiv">
                    <span class="introLabel" for="intro" ><b>問卷說明:</b></span>
                </div>
                
                <textarea v-model="questionnaire.questionIntro" class="intro"  id="intro" ></textarea>
            </div>
            <div class="timeBox">
                <label for=""><b>開始時間:</b></label>
                <!-- <flat-pickr class="timePicker" v-model="questionnaire.startTime" :config="flatpickrOptions"></flat-pickr> -->
                <input type="date" v-model="questionnaire.startTime" :min="minDate" @change="updateMinEndDate">
            </div>
            <div class="timeBox">
                <label for=""><b>結束時間:</b></label>
                <!-- <flat-pickr  class="timePicker" v-model="questionnaire.endTime" :config="flatpickrOptions2"></flat-pickr> -->
                <input type="date" v-model="questionnaire.endTime" :min="questionnaire.startTime">
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

