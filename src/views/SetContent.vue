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
            // formData{

            // },
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
            // this.options =[]
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
        <form action=""  @submit.prevent>
        <label for="">問題:</label>
        <input type="text" v-model="question">
    <!-- </form>
    <form class="selectCheck" action=""> -->
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
        <button class="comfirmss" @click="comfirm()">確定</button>
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
            <!-- <table>
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
            </table> -->
            <ul>
                <li v-for="(option,index) in comfirmOptions" :key="index">
                    {{ option }}
                    <button @click="removeSelection(index)"><i class="fa-solid fa-minus"></i></button>
                </li>
                <!-- <button @click="removeSelection(index)">移除</button> -->
            </ul>
        </div>
        </div>
        <!-- <button type="submit">送出</button> -->
    </form>

    <!-- <div class="selection" >
        <button class="comfirm"@click="comfirm()">確定</button>
            <label v-if="questionType === '單選題' || questionType === '複選題'">
                <button v-if="buttonShow == true" @click="addSelection()"><i class="fa-solid fa-plus"></i></button>
            </label>
        </div>

    <div class="optionAddAndView">
        
        <div class="selectionAdd" >
            <label  v-for="(option,index) in options" :key="index">
                <input v-if="optionsShow" type="text" v-model="options[index]" placeholder="輸入選項">
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
        </div>
    </div>

    <!-- <button type="submit"class="submit">送出</button> --> -->
</div>
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
        height: 80vh;
        margin: auto;
        position: relative;
        form{
            height: 100%;
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
            width: 100%;
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