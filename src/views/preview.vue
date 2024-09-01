<script>
import axios from 'axios';
export default{
    data(){
        return{
            sessionQuestionnaire:[],
            // sessionQuestionnaire:{
            //     questionName:'',
            //     questionIntro:'',
            //     startTime:'',
            //     endTime:'',
            //     question:'',
            //     questionType:'single',
            //     questionContent:'',
            //     necessary:false,
            //     options:[],
            //     comfirmOptions:[],
            //     filteredOptions:[],
            // }
            draggingIndex:null
            }
            
    },
    mounted(){
        const savedQuestionnaire = sessionStorage.getItem('sessionQuestionnaire')
        if(savedQuestionnaire){
            this.sessionQuestionnaire = JSON.parse(savedQuestionnaire)
        }
        console.log(this.sessionQuestionnaire)
        // console.log(this.sessionQuestionnaire[0].questionName)
        // console.log(this.sessionQuestionnaire[0].comfirmOptions)
    },
    methods:{
        Back(){
            this.$router.push('/SetContent')
        },
        dragStart(index){
            this.draggingIndex = index
            this.$nextTick(() => {
                document.querySelectorAll('.contentTitle').forEach(el => el.classList.remove('highlight'));
            });
        },
        dragOver(event,index){
            event.preventDefault()
            if(this.draggingIndex !== null && this.draggingIndex !== index){
                this.$nextTick(()=>{
                    const targetElement = event.currentTarget
                    targetElement.classList.add('highlight')
                })
            }
        },
        drop(targetIndex){
            if(this.draggingIndex !== null && this.draggingIndex !== targetIndex){
                const items = [...this.sessionQuestionnaire]
                const [moveItem] = items.splice(this.draggingIndex,1)
                items.splice(targetIndex,0,moveItem)
                this.sessionQuestionnaire = items;
                this.$forceUpdate()
            }
            this.draggingIndex = null
            document.querySelectorAll('.contentTitle').forEach(el => el.classList.remove('highlight'));
            sessionStorage.setItem('sessionQuestionnaire', JSON.stringify(this.sessionQuestionnaire));

            // sessionStorage.setItem('sessionQuestionnaire',JSON.stringify(this.sessionQuestionnaire))
            // sessionQuestionnaire = sessionStorage.getItem('sessionQuestionnaire')
        },
        save(){
            const rawDataTitle = JSON.parse(sessionStorage.getItem('questionnaire'))
            const rawData = JSON.parse(sessionStorage.getItem('sessionQuestionnaire'))
            const formattedData = {
            questionName: rawDataTitle.questionName || '', 
            questionIntro: rawDataTitle.questionIntro || '',
            startTime: rawDataTitle.startTime || '',
            endTime: rawDataTitle.endTime || '',
            published: false,
            questionList: rawData.map((item,index) => ({
                id:index + 1,
                question: item.question,
                questionType: item.questionType,
                necessary: item.necessary,
                comfirmOptions: item.comfirmOptions.map(option => {

                    delete option.editAllow;
                    return option;
                })
                .map(comfirmOptions => comfirmOptions.value) 
                .join(';') 
            }))
            //     comfirmOptions: `"${JSON.stringify(item.comfirmOptions.map(option => {
            //             delete option.editAllow;
            //             return option.value;
            //         }))}"`
            // }))
            }
            console.log(JSON.stringify(formattedData, null, 2));
            console.log(JSON.stringify(formattedData));
            axios.post('http://localhost:8080/quiz/create', formattedData)
            .then(response => {
                console.log('success', response.data);
                // alert('')
            })
            .catch(error => {
                console.error('傳送問卷資料時出現錯誤:', error);
            });
            this.$router.push('/CreateQManage').then(() => {
                window.location.reload();
        })
        },
        saveAndPublish(){
            const rawDataTitle = JSON.parse(sessionStorage.getItem('questionnaire'))
            const rawData = JSON.parse(sessionStorage.getItem('sessionQuestionnaire'))
            const formattedData = {
            questionName: rawDataTitle.questionName || '', 
            questionIntro: rawDataTitle.questionIntro || '',
            startTime: rawDataTitle.startTime || '',
            endTime: rawDataTitle.endTime || '',
            published: true,
            questionList: rawData.map((item,index) => ({
                id:index + 1,
                question: item.question,
                questionType: item.questionType,
                necessary: item.necessary,
                comfirmOptions: item.comfirmOptions.map(option => {

                    delete option.editAllow;
                    return option;
                })
                .map(comfirmOptions => comfirmOptions.value) 
                .join(';') 
            }))
            //     comfirmOptions: `"${JSON.stringify(item.comfirmOptions.map(option => {
            //             delete option.editAllow;
            //             return option.value;
            //         }))}"`
            // }))
            }
            console.log(JSON.stringify(formattedData, null, 2));
            console.log(JSON.stringify(formattedData));
            axios.post('http://localhost:8080/quiz/create', formattedData)
            .then(response => {
                console.log('success', response.data);
            })
            .catch(error => {
                console.error('傳送問卷資料時出現錯誤:', error);
            });
            this.$router.push('/CreateQManage').then(() => {
                window.location.reload();
        })
    }
}
}   
</script>

<template>
    <div class="previewBox">
        <button @click="Back()">返回</button>

        <div class="questionBox">
            <div v-if="sessionQuestionnaire.length == 0" class="NotFound" >
                <p>你還沒有建立任何問題</p>
            </div>
            <div class="title" v-if="sessionQuestionnaire.length > 0">
                <p>{{ sessionQuestionnaire[0].questionName }}</p>
                <p class="intro">{{ sessionQuestionnaire[0].questionIntro }}</p>
                <!-- <div></div> -->
                <div class="catDiv">
                    <span class="cat">必填 : </span><img src="/snorlax-pixel.gif" width="50" alt="">
                </div>
            </div>
        </div>
        <div class="info">
            <div class="name">
                <label for="">姓名</label>
            <input type="text">
            </div>
            <!-- <div class="sex">
                <label for="">性別</label>
                <input type="radio" name="sex" class="sexual">男
                <input type="radio" name="sex" class="sexual">女
            </div> -->
            <div class="email">
                <label for="">Email</label>
                <input type="text">
            </div>
            <div class="phoneNum">
                <label for="">手機號碼</label>
            <input type="Number">
            </div>
            <div class="age">
                <label for="">年齡</label>
                <input type="Number">
            </div>
            
        </div>
        <div class="contentBox">
            <p class="contentTitle" v-for="(question,index) in sessionQuestionnaire"
            :key="index" 
            :class="{'dragging':draggingIndex === index}"
            draggable="true"
            @dragstart="dragStart(index)"
            @dragover="dragOver($event,index)"
            @drop="drop(index)">
                {{index + 1}}﹑{{ question.question }}
                <div v-if="question.necessary == true" class="necessary">
                    <!-- <p>*</p> -->
                    <img src="/snorlax-pixel.gif" width="50" alt="">
                </div>
                <div class="textQuestion">
                    <textarea  class="typeLabel" v-if="question.questionType === 'text' " for="" readonly></textarea>
                </div>
                <div class="optionBox">
                    <div  v-for="(option,index) in question.comfirmOptions" class="option">
                        <label  v-if="question.questionType === 'single'" for="redio" >
                            <input  name="typeRadio" id="radio" type="radio" disabled>
                            <label for="radio">{{ option.value}} </label>
                        </label>
                        <label  v-if="question.questionType === 'multi'" for="checkbox">
                            <input  name="typeCheckbox" id="checkbox "type="checkbox" disabled>
                            <label for="checkbox">{{ option.value}}</label>
                        </label>
                    </div>
                </div>
            </p>
            
        </div>
    </div>
    <div class="buttonDivsss1">
        <div class="buttonSet">
            <button @click="save()">SAVE</button>
            <button class="blue" @click="saveAndPublish()">PUBLISH</button>
        </div>
    </div>

</template>

<style scoped lang="scss">
*{
    // border: 1px solid black;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // background-color:var(--color-page-bg);
}
.previewBox{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color:var(--color-page-bg);  
    // height: 100vh;
    .questionBox{
        // margin: auto;
        // width: 80%;
        border-bottom: 1px solid black;
        text-align: center;
        background-color:var(--color-page-bg);
        position: relative;
        p{
            font-size: 75px;
        }
        .intro{
            font-size: 30px;
        }
        .catDiv{
            position: absolute;
            bottom: 0;
            left: 5%;
        }
    }
    .info{
        width: 50%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        .name, .sex, .email, .phoneNum, .age{
            width: 100%;
            height: 20%;
            label{
                width: 20%;
            }
            input{
                width: 80%;
                background-color:var(--color-page);
                margin-top: 20px;

            }
            .sexual{
                width: 5%;
            }
        }
    }
    .contentBox{
        width: 80%;
        // height: 200vh;
        margin: auto;
        background-color:var(--color-page-bg);  
        .contentTitle{
            // cursor: move;
            padding: 10px;
            border: 1px solid #ccc;
            transition: background-color 0.2s ease, margin 0.2s ease;
        }
        .contentTitle.dragging{
            background-color: #e0e0e0;
        }
        .contentTitle.highlight{
            background: #f0f8ff;
            margin-bottom: 20px;
            margin-top:20px;
        }
        .necessary{
            p{
                color:red;
            }
        }
        .optionBox, .textQuestion{
            width: 95%;
            margin: auto;
            margin-top: 20px;
            // background-color:var(--color-page-bg);  
            .typeBox, .typeLabel{
                width: 70%;
                height: 150px;
            }
            // .typeBox{
            //     padding-bottom: 125px;
            // }
        }
        .option{
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }

}
.buttonDivsss1{
    width: 100vw;
    height: 100px;
    background-color:var(--color-page-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    .buttonSet{
        // margin-top: 30px;
        width: 600px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #969DA3;
        border-radius: 5px;
        box-shadow: 0 10px 0px #666668;
        z-index: 99;
        font-family: 'Press Start 2P';
        button{
            display: block;
            background-color: #FF8800;
            // margin-right: 20px;
            margin: 20px;
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
        .blue{
            background-color: #2332ff;
            box-shadow: 0 10px 0px rgb(8, 2, 88);
        }
    }
}
</style>