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
            settingShow: true,
            selectedDate: null,
            flatpickrOptions: {
                dateFormat: 'Y-m-d', 
                minDate:'today',
            }
        }
    },
    methods:{
        goNext(){
            this.$router.push('/SetContent')
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
        <form action="">
            <label for="">問卷名稱:</label>
            <input type="text">
        </form>
        <form action="">
            <label class="introLabel" for="intro">問卷說明:</label>
            <input class="intro" type="text"  id="intro">
            </form>
        <div class="timeBox">
            <label for=""><b>開始時間:</b></label>
            <flat-pickr class="timePicker" v-model="selectedStartDate" :config="flatpickrOptions"></flat-pickr>
        </div>
        <div class="timeBox">
            <label for=""><b>結束時間:</b></label>
            <flat-pickr  class="timePicker" v-model="selectedEndDate" :config="flatpickrOptions"></flat-pickr>
        </div>
        <button type="submit" @click="goNext()">下一步</button>
    </div>
    
    <!-- <div class="workSpace">
        <div class="Frame">
            <div class="dataWindow">
                <div class="inputContainer">
                    <label for=""><b>問卷名稱:</b></label>
                    <input type="text">
                    <label class="introLabel"for=""><b>問卷說明:</b></label>
                    <textarea name="" id=""></textarea>
                    
                    <div class="timeBox">
                        <label for=""><b>開始時間:</b></label>
                        <flat-pickr class="timePicker" v-model="selectedStartDate" :config="flatpickrOptions"></flat-pickr>

                    </div>
                    
                    <div class="timeBox">
                        <label for=""><b>結束時間:</b></label>
                        <flat-pickr  class="timePicker" v-model="selectedEndDate" :config="flatpickrOptions"></flat-pickr>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttonBox">
            <RouterLink class="routerButton"to="/SetContent">下一步</RouterLink>
            <i class="fa-solid fa-angles-right"></i>
        </div>

    </div> -->
        <!-- <div class="buttonBox">
            <button type="button"><b>>>下一步</b></button>
        </div>
    </div> -->
    
</div>


</template>

<style scoped lang="scss">
*{
    border:1px solid black;
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
    display: flex;
    flex-wrap: wrap;
    .formBox{
        width: 60vw;
        height: 70vh;
        margin: auto;
        position: relative;
        form{
            margin:20px;
            display: flex;
            align-items: center;
            label{
            font-size: 36px;
            }
            .introLabel{
                height: 300px;
            }
            input{
                width: 70%;
                font-size: 24px;
                // height: 100%;
                margin-left: 20px;
            }
            .intro{
                height: 300px;
            }
        }
        .timeBox{
            margin: 20px;
            width: 90%;
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