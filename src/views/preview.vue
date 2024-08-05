<script>
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
            //     questionType:'單選題',
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
        }
    }
}   
</script>

<template>
    <button @click="Back()">返回</button>
    <div class="previewBox">

        <div class="questionBox">
            <div v-if="sessionQuestionnaire.length == 0" class="NotFound" >
                <p>你還沒有建立任何問題</p>
            </div>
            <div class="title" v-if="sessionQuestionnaire.length > 0">
                <p>{{ sessionQuestionnaire[0].questionName }}</p>
                <p class="intro">{{ sessionQuestionnaire[0].questionIntro }}</p>
            </div>
        </div>
        <div class="info">
            <div class="name">
                <label for="">姓名</label>
            <input type="text">
            </div>
            <div class="sex">
                <label for="">性別</label>
                <input type="radio" name="sex" class="sexual">男
                <input type="radio" name="sex" class="sexual">女
            </div>
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
                    <p>*</p>
                </div>
                <div class="textQuestion">
                    <textarea  class="typeLabel" v-if="question.questionType === '簡答題' " for="" readonly></textarea>
                </div>
                <div class="optionBox">
                    <div  v-for="(option,index) in question.comfirmOptions" class="option">
                        <label  v-if="question.questionType === '單選題'" for="redio">
                            <input  name="typeRadio" id="radio" type="radio">
                            <label for="radio">{{ option.value}} </label>
                        </label>
                        <label  v-if="question.questionType === '多選題'" for="checkbox">
                            <input  name="typeCheckbox" id="checkbox "type="checkbox">
                            <label for="checkbox">{{ option.value}}</label>
                        </label>
                    </div>
                </div>
            </p>
            
        </div>
    </div>

</template>

<style scoped lang="scss">
*{
    // border: 1px solid black;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.previewBox{
    width: 100vw;
    // height: 100vh;
    .questionBox{
        // margin: auto;
        // width: 80%;
        border-bottom: 1px solid black;
        text-align: center;
        p{
            font-size: 75px;
        }
        .intro{
            font-size: 30px;
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
</style>