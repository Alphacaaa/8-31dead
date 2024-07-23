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
            buttonShow:true
        }
    },
    methods:{
        addSelection(){
            this.options.push('')

            this.buttonShow = false
            console.log(this.optionsShow)
        },
        removeSelection(index){
            this.options.splice(index,1)
            this.comfirmOptions.splice(index,1)
            console.log(this.comfirmOptions)

        },
        comfirm(){

            // this.comfirmOptions.push(...this.options)
            this.comfirmOptions.push(...this.options.filter(option => option.trim() !== ''))
            console.log(this.comfirmOptions)
            this.options =[]
            this.optionsShow = true
            this.buttonShow = true
            console.log(this.optionsShow)

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
    <div class="selection" >
        <button class="comfirm"@click="comfirm()">確定</button>
            <label v-if="questionType === '單選題' || questionType === '複選題'">
                <button v-if="buttonShow == true" @click="addSelection()"><i class="fa-solid fa-plus"></i></button>
            </label>
        </div>

    <div class="optionAddAndView">
        
        <div class="selectionAdd" >
            <label  v-for="(option,index) in options" :key="index">
                <input v-if="optionsShow" type="text" v-model="options[index]" placeholder="輸入選項">
                <!-- <button @click="comfirm()">確定</button> -->
            </label>
        </div>
        <div class="comfirmList" v-if="comfirmOptions.length > 0 && questionType">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkBox">&nbsp&nbsp</th>
                        <th>題號</th>
                        <th>題目名稱</th>
                        <th>種類</th>
                        <th>必填</th>
                        <th>12345</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(option,index) in comfirmOptions" :key="index">
                        <td>{{ option }}</td>
                    </tr>
                </tbody>
            </table>
                <li v-for="(option,index) in comfirmOptions" :key="index">
                    {{ option }}
                    <button @click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button>
                </li>
                <!-- <button @click="removeSelection(index)">移除</button> -->
        </div>
    </div>
    <!-- <SetList /> -->
    <button type="submit"class="submit">送出</button>
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
        height: 60vh;
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
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            label{
                width: 100%;
            }
            input{
                width: 90%;
            }
        }
        .optionAddAndView{
            width: 60vw;
            // display: flex;
            // height: 60%;
            .comfirmList{
                width: 100%;  
            }
        }
        .selection{
            display: flex;
            justify-content: end;
            align-items: center;
            width: 100%;
            height: 10%;
            button{  
                display: block;
                background-color: none;
                // margin-right: 50px;
            }
        }
        ul{
            list-style: none;
            position: relative;

            button{
                position: absolute;
                right: 0;
            }
        }
        .submit{
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
}
</style>