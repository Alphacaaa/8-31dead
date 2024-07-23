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
            comfirmOptions:[]
        }
    },
    methods:{
        addSelection(){
            this.options.push('')
        },
        removeSelection(index){
            this.options.splice(index,1)
        },
        comfirm(){
            this.comfirmOptions = [...this.options]
            // this.comfirmOptions.push(options[index])
            console.log(comfirmOptions)
            // this.options =[]
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
        <form action="">
        <label for="">問題:</label>
        <input type="text" v-model="question">
    </form>
    <form class="selectCheck" action="">
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
        
    </form>


    <div class="optionAddAndView">
        <div class="comfirmList" v-if="comfirmOptions.length > 0 && questionType">
            <ul>
                <li v-for="(option,index) in comfirmOptions" :key="index">
                    {{ option }}
                </li>
            </ul>
        </div>
        <div class="selectionAdd" v-if="questionType === '單選題' || questionType === '複選題'">
            <label v-for="(option,index) in options" :key="index">
                <input type="text" v-model="options[index]" placeholder="輸入選項">
                <button @click="removeSelection(index)">移除</button>
                
            </label>
        </div>
        <div class="selection" >
            <label v-if="questionType === '單選題' || questionType === '複選題'">
                <button @click="addSelection()">新增選項</button>
                <button @click="comfirm()">確定</button>
            </label>
        </div>
    </div>
</div>
    <!-- <SetList /> -->
    <!-- <div class="workSpace">
        <div class="Frame">
            <div class="dataWindow">
                <div class="inputContainer">
                    <div class="question">
                        <label for=""><b>問題:</b></label>
                        <input type="text">
                    </div>

                    <div class="selectBox">
                        <label for=""></label>
                        <select name="" id="">
                            <option value="">單選題</option>
                            <option value="">多選題</option>
                            <option value="">簡選題</option>
                        </select>
                        <label class="checkLabel" for="check">必填</label>
                        <input class="checkBox" type="checkbox" id="check">
                    </div>
                    <div class="textBox">
                        <label class="introLabel"for=""><b>選項:</b></label>
                        <textarea name="" id=""></textarea>
                    </div>

                    
                </div>
            </div>
            <SetList />
        </div>

    </div> -->
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
        width: 60vw;
        height: 40vh;
        margin: auto;
        position: relative;
        form{
            margin:20px;
            display: flex;
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
                height: 200px;
            }
        }
        .selectionAdd{
            
            width: 100%;
            label{
                width: 100%;
            }
            input{
                width: 100%;
            }
        }
        .optionAddAndView{
            width: 60vw;
            // height: 60%;
        }
        ul{
            text-decoration: none;
        }
    }
}
</style>