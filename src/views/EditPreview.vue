<script>
export default{
    data(){
        return{
            data: {} 
        }
    },
    mounted(){
        const data = sessionStorage.getItem('dataQuestionnaires')
        console.log(data)
        // console.log(data)
        this.data = JSON.parse(data)
        console.log(this.data)
        this.data.questionList.forEach(element => {
            element.comfirmOptions =  element.comfirmOptions.split(";")
        });
        console.log(this.data)
        console.log(data)
        // const id = this.data.id
        // console.log(id)
    },
    methods:{
        back(){
            this.$router.push(`/QuestionaireEdit/${this.data.id}`)
        }
    }
}
</script>

<template>
    <div class="buttonDivsss3">
        <div class="buttonSet3">
            <button class="blue" @click="back()">BACK</button>
            <!-- <button @click="submitResponses()">提交回應</button> -->
        </div>
    </div>
<div  v-if ="this.data" class="main">
    <div  class="title">
        <p>{{ this.data.questionName }}</p>
        <p>{{ this.data.questionIntro }}</p>
    </div>
    <div class="time">
        <p>{{data.startTime}}</p>
        <p>{{data.endTime}}</p>
    </div>
    <div  v-for="(questions,index) in data.questionList" class="content">
        <!-- <span>{{index + 1 }} 、 </span> -->
        <p>{{index + 1 }} 、{{ questions.question }}</p>
        <!-- <p>{{ questions.questionType }}</p> -->
        <!-- <p>{{ questions.comfirmOptions }}</p> -->
        <div v-for="option in questions.comfirmOptions" class="options">
            <div   v-if="questions.questionType === 'single'" class="optionTypeDiv">
                <input type="radio" disabled>{{ option }}
            </div>
            <div   v-if="questions.questionType === 'multi'" class="optionTypeDiv">
                <input  type="checkbox" disabled>{{ option }}
            </div>
            <div   v-if="questions.questionType === 'text'" class="optionTypeDiv">
                <textarea  disabled>{{ option }}</textarea>
            </div>
        </div>
    </div>
    
    <!-- <div v-for="(questions,index) in data.questionList" class="content">
        <p>{{ questions.question }}</p>
        <p>{{ questions.questionType }}</p>
        <p>{{ questions.comfirmOptions }}</p>
        <div v-for="option in questions.comfirmOptions" class="options">
            {{ option }}
        </div>
    </div> -->
    
</div>
</template>

<style scoped lang="scss">
.main{
    background-color:var(--color-page-bg);
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: relative;
}
.title{
    width: 60%;
    margin: auto;
    text-align: center;
}
.time{
    position: absolute;
    right: 5%;
    top: 0;
}
.content{
    width: 40%;
    margin: auto;
    margin-top: 50px;
}

.buttonDivsss3{
    // width: 100vw;
    height: 200px;
    background-color:var(--color-page-bg);
    display: flex;
    // justify-content: center;
    align-items: center;
    .buttonSet3{
        // margin-top: 30px;
        width: 225px;
        height: 75px;
        margin-left: 20px;
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
    }
}
</style>