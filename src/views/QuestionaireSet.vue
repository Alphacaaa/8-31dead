<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/QuestionaireSetFirst.vue'
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
        <div class="step">

        </div>
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
            <RouterLink class="routerButton"to="/SetContent"><button type="button" ><b>下一步</b></button></RouterLink>
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
    font-size: 24px;
    background-color: rgb(212, 247, 253);
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
        .step{
            width:100%;
            height: 20%;
        }
        .Frame{
            width: 84vw;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            .dataWindow{
                display: flex;
                // flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                width: 70%;
                height: 100%;
                .inputContainer{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    width: 80%;
                    height: 80%;
                    label{
                        height: 5%;
                        width: 15%;
                        font-size: 24px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        // display: block;
                    }
                    .introLabel{
                        height: 50%;
                        align-items:start;
                        }
                    input{
                        width: 85%;
                        height: 5%;
                        outline: none;
                        border-right: none;
                        border-left: none;
                        border-top: none;

                        border-bottom: 4px solid rgb(18, 80, 92);
                        // font-size: 24px;
                        }
                    textarea{
                        height: 50%;
                        width: 85%;
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
                            width: 15%;
                            background-color: rgb(168, 209, 218);
                            border-bottom: none;
                        }
                    }
                }
            }
        }
        .buttonBox{
            height: 10%;
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
            padding-right: 300px;
            button{
                color: rgb(18, 80, 92);
            }
            .fa-angles-right{
                font-size: 28px;
                color: rgb(18, 80, 92);
            }
        }
    }
}



</style>