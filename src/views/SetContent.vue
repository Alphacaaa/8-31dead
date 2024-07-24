<script>
import { RouterLink } from 'vue-router'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetContentList.vue'
export default {
    data(){
        return{
            question:'',
            questionType:'單選題',
            questionContent:'',
            options:[],
            comfirmOptions:[],
            filteredOptions:[],
            optionsShow:true,
            buttonShow:true,
            editAllow:false
            // formData{

            // },
        }
    },
    methods:{
        addSelection(){
            this.options.push(
                {
                value :'', editAllow : false
                }
            )
            this.optionsShow = true
            this.buttonShow = false
            console.log(this.optionsShow)
        },
        removeSelection(index){
            this.options.splice(index,1)
            this.comfirmOptions.splice(index,1)
            console.log(this.comfirmOptions)
            this.optionsShow = true
            this.buttonShow = true
            this.editAllow = false

        },
        cancelSelection(index){
            this.options.splice(index,1)
            // this.comfirmOptions.splice(index,1)
            console.log(this.comfirmOptions)
            this.optionsShow = true
            this.buttonShow = true
            this.editAllow = false

        },
        comfirm(){
            // this.comfirmOptions.push(...this.options)
            this.comfirmOptions.push(...this.options.filter(option => option.value.trim() !== ''))
            console.log(this.comfirmOptions)
            this.options =[]
            this.optionsShow = false
            this.buttonShow = true
            console.log(this.optionsShow)
        },
        editSelection(index){
            // this.editAllow = true
            console.log(this.editAllow)
            this.comfirmOptions.forEach((option,editIndex)=>{
                option.editAllow = (index === editIndex);
            })
            console.log(this.editAllow)
        },
        saveEdited(index){
            this.comfirmOptions[index].editAllow = false
        }
    },
    components: {
        RouterLink,
        // SetContent,
        breadCrum,
        Header,
        SetList
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
            <input type="text" v-model="question">
            <label for="">
                <input name="type" class="radio" type="radio" value="單選題" v-model="questionType">單選題
            </label>
            <label for="">
                <input name="type"  class="radio" type="radio" value="複選題" v-model="questionType">多選題
            </label>
            <label for="">
                <input name="type" class="radio" type="radio" value="簡答題" v-model="questionType">簡答題
            </label>
            <input class="checkBox"type="checkbox">
            <label class="checkBxoLabel" for="">必填</label>
        
            <div class="selection" >
            
                <label class="newSelection"v-if="questionType === '單選題' || questionType === '複選題'">
                    <span v-if="buttonShow == true">新增選項</span>
                    <button v-if="buttonShow == true" @click="addSelection()"><i class="fa-solid fa-plus"></i></button>
                    <!-- <button class="comfirmss" @click="comfirm()">新增</button> -->
                </label>
            </div>

            <div class="optionAddAndView">
            
                <transition-group name="anime" tag="div" class="selectionAdd">
                    <label  v-for="(option,index) in options" :key="index">
                        <input v-if="optionsShow" type="text" v-model="options[index].value" placeholder="輸入選項">
                        <button class="comfirmss" @click="comfirm()"><i class="fa-solid fa-check-to-slot"></i></button>
                        <button class="remove" @click="cancelSelection(index)"><i class="fa-solid fa-xmark"></i></button>
                    </label>
                </transition-group>
                <!-- <transition-group name="anime" tag="div" class="comfirmList" v-if="comfirmOptions.length > 0 && questionType"> -->
                <div class="comfirmList" v-if="comfirmOptions.length > 0 && questionType">
                    <ul>
                        <li v-for="(option,index) in comfirmOptions" :key="index">
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
        <!-- <button type="submit">送出</button> -->
        </form>
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
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 100vw;
    // height: 85vh;
    display: flex;
    flex-wrap: wrap;
    
    .formBox{
        width: 60vw;
        height: 80vh;
        margin: auto;
        position: relative;
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
}

.anime-enter-active, .anime-leave-active {
    transition: opacity 0.5s;
}
.anime-enter, .anime-leave-to {
    opacity: 0;
}
</style>