<script>
import { json } from 'd3';

export default{
    data(){
        return{

        }
    },
    created(){
        const test = sessionStorage.getItem('previewData')
        const question = sessionStorage.getItem('question')
        this.test = JSON.parse(test)
        this.question = JSON.parse(question)
        console.log(this.test)
        console.log(this.question)
    },
    methods:{
        back(){
            const id = this.question.id
            this.$router.push(`/questionnaireContent/${id}`)
        }
    }
}
</script>

<template>
<div class="main">
    <div class="buttonDivsss6">
        <div class="buttonSet6">
            <button class="blue" @click="back()">BACK</button>
            <!-- <button @click="submitResponses()">提交回應</button> -->
        </div>
    </div>
    
<div class="title">
    <p>{{ question.questionName }}</p>
    <p>{{ question.questionIntro }}</p>
</div>
<div class="infoBox">
            <div class="nameBox">
                <div class="name">
                    <p>姓名:</p>
                </div>
                <div class="userName">
                    <p>{{ test.feedbackList[0].name }}</p>
                </div>
            </div>
            <div class="emailBox">
                <div class="email">
                    <p>email:</p>
                </div>
                <div class="userEmail">
                    <p>{{ test.feedbackList[0].email }}</p>
                </div>
            </div>
            <div class="phoneBox">
                <div class="phone">
                    <p>電話:</p>
                </div>
                <div class="userPhone">
                    <p>{{ test.feedbackList[0].phone }}</p>
                </div>
            </div>
            <div class="ageBox">
                <div class="age">
                    <p>年齡:</p>
                </div>
                <div class="ageBox">
                    <p>{{ test.feedbackList[0].age }}</p>
                </div>
            </div>
        </div>
<div class="content" v-for="item in question.questionList">
    <p>{{ item.id }} 、 {{item.question}}</p>
    <div class="ans" v-for="ans in test.feedbackList">
        answer: {{ans.ans}}
    </div>
</div>

</div>
</template>

<style scoped lang="scss">

.main{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color:var(--color-page-bg);
}
.title{
    width: 40%;
    margin: auto;
    text-align: center;
}
.content{
    width: 40%;
    margin: auto;
}
.infoBox{
    width: 40%;
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    /* text-align: center; */
    margin: 50px auto;
    /* text-align: center; */
    /* margin: auto; */
    .nameBox, .emailBox, .phoneBox, .ageBox{
        width: 100%;
        display: flex;
    }
    .name, .email, .phone, .age{
        width: 8%;
    }
    .userName{
        width: 80%;
    }
}
.buttonDivsss6{
    /* // width: 100vw; */
    height: 200px;
    position:absolute;
    top: -3%;
    left: 1%;
    // background-color:var(--color-page-bg);
    background-color:var(--color-page-bg);
    display: flex;
    /* // justify-content: center; */
    align-items: center;
    .buttonSet6{
        /* // margin-top: 30px; */
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
             /* margin-right: 20px; */
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