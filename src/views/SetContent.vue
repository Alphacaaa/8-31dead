<script>
import { RouterLink } from 'vue-router'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetContentList.vue'
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
            
            optionsShow:true,
            buttonShow:true,
            editAllow:false,
            savedAndShow:false
            // formData{

            // },
        }
    },
    mounted(){
        // savedAndShow = false
        const savedQuestionnaire = sessionStorage.getItem('questionnaire')
        console.log(savedQuestionnaire)
        if (savedQuestionnaire){
            this.questionnaire = JSON.parse(savedQuestionnaire);
        }
        console.log(this.questionnaire)
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
            // this.comfirmOptions.push(...this.options)
            this.questionnaire.comfirmOptions.push(...this.questionnaire.options.filter(option => option.value.trim() !== ''))
            console.log(this.questionnaire.comfirmOptions)
            this.questionnaire.options =[]
            this.optionsShow = false
            this.buttonShow = true
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
            this.sessionQuestionnaire.push(this.questionnaire)
            console.log(this.sessionQuestionnaire)
            console.log("問題建立"+this.questionnaire)
            console.log("這是資料庫"+sessionStorage.getItem('sessionQuestionnaire'))
            if(sessionStorage.getItem('sessionQuestionnaire') === null){
                sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.sessionQuestionnaire));
                console.log("幹")

            }else{
                this.session = JSON.parse(sessionStorage.getItem('sessionQuestionnaire'))
                
                this.session.push(this.questionnaire)
                console.log("這是session"+this.session)
                console.log(this.questionnaire)
                sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.session));
                console.log("幹你")
                console.log(sessionStorage.getItem('sessionQuestionnaire'))
            }   

            
            
            this.questionnaire = {
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
            }
            console.log(this.questionnaire)
            // 將問卷數據保存到 sessionStorage 中
            // sessionStorage.setItem('sessionQuestionnaire', JSON.stringify(this.sessionQuestionnaire));
            console.log("問卷數據已保存到 sessionStorage 中");
            this.savedAndShow = true
            console.log(this.savedAndShow)
        },
        preview(){
            this.$router.push('/preview')
        },
        clear(){
            sessionStorage.clear();
            console.log(sessionStorage.getItem('sessionQuestionnaire'))
        },
        backToQset(){
            this.$router.push('/QuestionaireSet')
        }
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
    <!-- <breadCrum /> -->
    <div class="formBox">
        <form action=""  @submit.prevent>
            <label for="">問題:</label>
            <input type="text" v-model="questionnaire.question">
            <label for="">
                <input name="type" class="radio" type="radio" value="單選題" v-model="questionnaire.questionType">單選題
            </label>
            <label for="">
                <input name="type"  class="radio" type="radio" value="多選題" v-model="questionnaire.questionType">多選題
            </label>
            <label for="">
                <input name="type" class="radio" type="radio" value="簡答題" v-model="questionnaire.questionType">簡答題
            </label>
            <input v-model="questionnaire.necessary" class="checkBox"type="checkbox">
            <label class="checkBxoLabel" for="">必填</label>
        
            <div class="selection" >
            
                <label class="newSelection"v-if="questionnaire.questionType === '單選題' || questionnaire.questionType === '多選題'">
                    <span v-if="buttonShow == true">新增選項</span>
                    <button v-if="buttonShow == true" @click="addSelection()"><i class="fa-solid fa-plus"></i></button>
                    <!-- <button class="comfirmss" @click="comfirm()">新增</button> -->
                </label>
            </div>

            <div class="optionAddAndView">
            
                <transition-group name="anime" tag="div" class="selectionAdd">
                    <label  v-for="(option,index) in questionnaire.options" :key="index">
                        <input v-if="optionsShow" type="text" v-model="questionnaire.options[index].value" placeholder="輸入選項">
                        <button class="comfirmss" @click="comfirm()"><i class="fa-solid fa-check-to-slot"></i></button>
                        <button class="remove" @click="cancelSelection(index)"><i class="fa-solid fa-xmark"></i></button>
                    </label>
                </transition-group>
                <!-- <transition-group name="anime" tag="div" class="comfirmList" v-if="comfirmOptions.length > 0 && questionType"> -->
                <div class="comfirmList" v-if="questionnaire.comfirmOptions.length > 0 && questionnaire.questionType">
                    <ul>
                        <li v-for="(option,index) in questionnaire.comfirmOptions" :key="index">
                            <span v-if="!(option.editAllow)">{{ option.value }}</span>
                            <input class="editInput" v-model="option.value" v-if="option.editAllow" @keyup.enter="saveEdited(index)" type="text">
                            <button class="editComfirm" v-if="option.editAllow" @click="saveEdited(index)" ><i class="fa-solid fa-check"></i></button>
                            <button class="edit" v-if="!(option.editAllow)" @click="editSelection(index)"><i class="fa-solid fa-pen"></i></button>
                            <button class="remove-minus"@click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button>
                        </li>
                    </ul>
                </div>
                <!-- </transition-group> -->
                
            </div>
        <button type="submit" @click="submitForm()">加入</button>
        <button type="button" @click="preview()">預覽</button>
        <button type="button" @click="clear()">清空</button>
        <button type="button" @click="backToQset()">返回</button>
        </form>
    </div>
    <div class="rightnowSee">
        <p>問題:{{ questionnaire.question }}</p>
        <p>題型:{{ questionnaire.questionType }}</p>
        <p>{{ questionnaire.necessary ? '必填':'' }}</p>
        <p v-if="questionnaire.questionType === '單選題' || questionnaire.questionType === '多選題'">選項:</p>
        <ul>
            <li v-for="(option,index) in questionnaire.comfirmOptions">
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{index + 1}}﹑{{ option.value }}
            </li>
        </ul>
    </div>
    <!-- <preview v-if="savedAndShow"/> -->
    
</div>


</template>

<style scoped lang="scss">
*{
    border:1px solid rgb(0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 24px;
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 100vw;
    // height: 85vh;
    display: flex;
    flex-wrap: wrap;
    
    .formBox{
        width: 50vw;
        height: 80vh;
        // margin: auto;
        position: relative;
        scale:0.9;
        form{
            height: 90%;
            margin:20px;
            // display: flex;
            // flex-wrap: wrap;
            align-items: center;
            label{
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
                width: 100%;
                height: 50px;
                label{
                    // width: 50%;
                    display: flex;
                    align-items: center;
                }
                button{
                    margin-left: 10px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgb(167, 167, 167);
                    background-color: white;
                    border: none;
                }
                .fa-plus{
                    // background-color: rgb(209, 203, 203);
                    color: black;
                    
                }
                &:hover{
                    cursor: pointer;
                    label{
                        background-color: rgb(209, 203, 203);
                    }
                    button{
                        background-color: rgb(209, 203, 203);
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
                width: 100%;
                margin: 0;
                border:none;
                border-bottom: 1px solid black;
                outline: none;
            }
            .comfirmss{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: rgb(167, 167, 167);
                background-color: white;
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
                background-color: white;
                border: none;
                position: absolute;
                right: 1%;
                &:hover{
                    background-color: rgb(167, 167, 167);
                }
            }
        }
        .optionAddAndView{
            width: 100%;
            position: relative;
            // display: flex;
            height: 81%;
            .comfirmList{
                width: 100%;
                position: absolute;
                top:10%;
                
            }
        }
        .selection{
            display: flex;
            justify-content: end;
            align-items: center;
            width: 100%;
            height: 5%;
            button{  
                display: block;
                background-color: none;
                // margin-right: 50px;
            }
        }
        ul{
            list-style: none;
            position: relative;
            // width: 50%;
            li{
                border: none;
                border-bottom: 1px solid black;
                .editInput{
                    // outline: none;
                    border:2px;
                    width: 80%;
                    margin: 0;
            }
            }
            .edit{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                // background-color: rgb(167, 167, 167);
                background-color: white;
                border: none;
                position: absolute;
                right: 7%;
                &:hover{
                    background-color: rgb(167, 167, 167);
                }
            }
            .editComfirm{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                // background-color: rgb(167, 167, 167);
                background-color: white;
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
                background-color: white;
                border: none;
                position: absolute;
                right: 1%;
                &:hover{
                    background-color: rgb(167, 167, 167);
                }
            }
        }
        .submit{
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
    .rightnowSee{
        margin-left: 5vw;
        width:40vw;
        // height: 80vh;
        ul{
            list-style: none;
        }
    }
}

.anime-enter-active, .anime-leave-active {
    transition: opacity 0.5s;
}
.anime-enter, .anime-leave-to {
    opacity: 0;
}
</style>