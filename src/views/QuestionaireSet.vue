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
    <breadCrum />
    <div class="workSpace">
        <div class="Frame">
            <div class="dataWindow">
                <div class="inputContainer">
                    <label for=""><b>問卷名稱:</b></label>
                    <input type="text">
                    <label class="introLabel"for=""><b>問卷說明:</b></label>
                    <!-- <input type="text" class="intro"> -->
                    <textarea name="" id=""></textarea>
                    
                    <div class="timeBox">
                        <label for=""><b>開始時間:</b></label>
                        <flat-pickr class="timePicker" v-model="selectedStartDate" :config="flatpickrOptions"></flat-pickr>
                        <!-- <i class="fa-solid fa-calendar" style="color: #12505c;"></i> -->
                    </div>
                    
                    <div class="timeBox">
                        <label for=""><b>結束時間:</b></label>
                        <flat-pickr  class="timePicker" v-model="selectedEndDate" :config="flatpickrOptions"></flat-pickr>
                        <!-- <i class="fa-solid fa-calendar" style="color: #12505c;"></i> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="buttonBox">
            <RouterLink class="routerButton"to="/SetContent">下一步</RouterLink>
            <i class="fa-solid fa-angles-right"></i>
        </div>

    </div>
        <!-- <div class="buttonBox">
            <button type="button"><b>>>下一步</b></button>
        </div>
    </div> -->
    
</div>


</template>

<style scoped lang="scss">
*{
    // border:1px solid black;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // font-size: 24px;
    background-color: rgb(221, 249, 253);
    // background-color: #649ABC;
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;
    
    // justify-content: center;
    // align-items: center;
    .workSpace{
        width: 84vw;
        height: 90%;
        .Frame{
            // margin: auto;
            width: 100%;
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: #649ABC;
            // border:1px solid black;
            .dataWindow{
                display: flex;
                // flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                margin: auto;
                width: 90%;
                height: 100%;
                
                .inputContainer{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    
                    label{
                        height: 5%;
                        width: 10%;
                        font-size: 24px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        // display: block;
                    }
                    .introLabel{
                        height: 50%;
                        width: 10%;
                        align-items:start;
                        }
                    input{
                        width:90%;
                        height: 5%;
                        outline: none;
                        // border-right: none;
                        // border-left: none;
                        // border-top: none;

                        // border-bottom: 2px solid rgb(18, 80, 92);
                        border: 2px solid rgb(18, 80, 92);
                        // font-size: 24px;
                        }
                    textarea{
                        height: 50%;
                        width: 90%;
                        font-size: 24px;
                        padding: 2px;
                    }
                    .timeBox{
                        width: 100%;
                        .fa-calendar{
                            margin-right: 10px;
                            font-size: 18px;
                        }
                        input{
                            width: 10%;
                            background-color: rgb(168, 209, 218);
                            border: none;
                        }
                    }
                }
            }
        }
        .buttonBox{
            height: 10%;
            width:100%;
            // margin: auto;
            display: flex;
            justify-content: end;
            align-items: center;
            padding-right: 300px;
            .routerButton{
                color: rgb(255, 255, 255);
                background-color:#216792;
                // display: flex;  
                // width: 100px;
                // height: 60px;
                // text-align: center;
                text-decoration: none;
                border-radius: 10px;
                // border: none;
                font-size: 24px;
            }
            .fa-angles-right{
                font-size: 28px;
                color: rgb(18, 80, 92);
            }
        }
    }
}



</style>