<script>
import { RouterLink } from 'vue-router'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetContentList.vue'
import axios from 'axios';
export default {
    data(){
        return{
            questionnaire : [],
            questionnaires : [],
            data1:[],
            time:[],
        }
    },
    created(){
        const savedData = sessionStorage.getItem('dataQuestionnaires')
        console.log(savedData)
        if (savedData) {
            this.questionnaire = JSON.parse(savedData);
        } else {
            console.error('資料未找到');
        }
        console.log(this.questionnaire)
        
        console.log(this.$route.params)
        console.log(this.$route.params.id)
        // console.log(id,JSON.parse(this.questionnaire))
    },
    mounted(){
        const id = this.$route.params.id;
        console.log(id)
        console.log(this.questionnaire)
        
        if (this.questionnaire) {
            // this.questionnaires = JSON.parse(this.questionnaire);
            this.questionnaires = this.questionnaire.find(q => q.id === parseInt(id));
            console.log(this.questionnaires)
        } else {
            console.error('問卷資料未找到');
        }
        axios.post('http://localhost:8080/quiz/feedback',  null, {
            params: { quizId: id }
        })
        .then(response => {
            console.log('success', response.data);
            this.data1 = response.data.feedbackList
            console.log(this.data1)
            console.log(response.data.feedbackList)
            sessionStorage.setItem('feedbackList',JSON.stringify(this.data1))
            const feedbackList = sessionStorage.getItem('feedbackList')
            this.time = sessionStorage.getItem('feedbackList')
            console.log("session"+ feedbackList)
            console.log(this.time)
            
        })
        .catch(error => {
            console.error('傳送問卷資料時出現錯誤:', error);
        });
        
    },
    computed: {
        emailNameMap() {
            const emailMap = new Map();
            this.data1.forEach(item => {
                if (!emailMap.has(item.email)) {
                    emailMap.set(item.email,{names: new Set(), times:[]});
                }
                emailMap.get(item.email).names.add(item.name);
                emailMap.get(item.email).times.push(item.fillinDateTime)
            });
            const result = {};
            emailMap.forEach((data, email) => {
                result[email] = {
                    names: Array.from(data.names),
                    times: data.times
                };
            });
            return result;
        }
    },
    methods:{
        goLook(email){
            this.$router.push({name:'FeedbackLook',params:{email}})
        },
        goStatistics(){
            const id = this.$route.params.id;
            this.$router.push(`/statistics/${id}`)
        }
    }
    // components: {
        //     RouterLink,
        //     // SetContent,
        //     breadCrum,
        //     Header,
        //     SetList
        // }
        
    }
</script>

<template>
<div class="main">
    <div class="mainBox">
        <div class="user">
            <p>填寫人</p>
        </div>
        <div class="containerBox">
        <div v-for="(data,email) in emailNameMap" :key="email" class="box">
            
            <!-- <h1>{{ name}}</h1> -->
            <!-- <h1>{{ email}}</h1> -->
            <!-- <h1>{{ item.email }}</h1>
            <h1>{{ item.id }}</h1> -->
            <div class="nameBox">
                <div v-for="(name,index) in data.names" :key="index" class="name">
                    <p>  {{ name }}</p>
                </div>
                <div v-for="(time,index) in data.times" :key="index" class="emailBox">
                    <p> {{ time }}</p>
                </div>
                <!-- <div v-for="name in time" class="time">
                    {{ name.id }}
                </div> -->
                <div class="buttonBox1">
                    <button class="retro-button redButton"  @click="goLook(email)">Go</button>
                </div>
            </div>
        </div>
        <div class="buttonDivsss5">
            <!-- <div class="buttonSet5">
                <button class="blue" @click="goStatistics()">STATISTICS</button>
                <button @click="submitResponses()">提交回應</button>
            </div> -->
            <button class="retro-button yellowButton" @click="goStatistics()"><img src="/public/pie-chart.png" alt="" width="24"></button>
        </div>
    </div>
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
.main{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    // display: flex;
    // flex-wrap: wrap;
    // background-color:var(--color-bg-page);
    background-color: #e3dede;
}
.mainBox{
    width: 80vw;
    height: 600px;
    margin: auto;
    margin-top: 20vh;
    border: 1px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;

}
.user{
    width: 70%;
    margin: 30px auto;
    border-bottom: 1px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    p{
        font-size: 48px;

    }
}
.containerBox{
    width: 60%;
    height: 500px;
    // text-align: center;
    margin: auto;
    // margin-top: 30vh;
}
// .box{
//     width: 40%;
//     // text-align: center;
//     margin: auto;
// }
.nameBox{
    display: flex;
    align-items: center;
}
.name{
    width: 30%;
}
.emailBox{
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    p{
        font: 36px;
    }
}


.redButton{
    --color-bg:#E44E55;
    --color-bg-light:#E47479;
    --color-bg-dark:#D13239;
}
.yellowButton{
    --color-bg:#f7f43e;
    --color-bg-light:#fffb00;
    --color-bg-dark:#cac70b;
}
.greenButton{
    // color: white;
    --color-bg:#00A07D;
    --color-bg-light:#00AF8A;
    --color-bg-dark:#008F70;
}
    .retro-button{
    position:relative;
    appearance:none;
    box-sizing:border-box;
    font-size:calc( var(--button-height) / 3 );
    font-family: 'Open Sans', sans-serif;
    background: var(--color-bg);
    height:var(--button-height);
    min-width:50px;
    width: 50px;
    border-radius:calc( var(--button-height) / 2);
    border:0;
    font-weight:800;
    text-transform:uppercase;
    color:var(--color-text);
    text-shadow: 1px 1px var(--color-text-shadow);
    cursor:pointer;
    margin:6px 6px;
    letter-spacing:.1em;
    transition: all 200ms ease;
    box-shadow:
        -1px  -1px 1px var(--color-bg), 
        0 0 0 4px var(--color-overlay-medium), 
        1px  1px 1px var(--color-bg-dark), 
        inset .0 .0 .0 var(--color-overlay-dark),  
        inset .5rem .5rem .25rem var(--color-bg-light) 
}

.retro-button::-moz-focus-inner{
    outline:none;
    border:none;
}

.retro-button:focus{
    outline:none;
    box-shadow:
    -1px -1px 1px var(--color-bg-dark),
    0 0 0 4px var(--color-tab-focus), 
    1px  1px 1px var(--color-bg-dark),
    inset 0 0 0 var(--color-overlay-dark), 
    inset .5rem .5rem .25rem var(--color-bg-light), 
    ;
}

.retro-button:hover{
    box-shadow:
        -1px -1px 1px var(--color-bg-dark), 
        0 0 0 4px var(--color-overlay-dark), 
        1px  1px 1px var(--color-bg-dark), 
        inset 0 0 0 var(--color-overlay-dark), 
        inset .5rem .5rem .25rem var(--color-bg-light), 
        ;
    }

.retro-button:active{
    box-shadow:
        inset 1px 1px 1px var(--color-bg),  
        0 0 0 4px var(--color-overlay-dark), 
        inset -1px -1px 1px var(--color-bg-light),   
        inset .5rem .5rem .75rem var(--color-bg-dark), 
        inset .5rem .5rem .5rem var(--color-bg-light), 
}


.buttonDivsss5{
    /* // width: 100vw; */
    height: 100px;
    position:absolute;
    top: 0%;
    right: 1%;
    // background-color:var(--color-page-bg);
    background-color: #e3dede;
    display: flex;
    /* // justify-content: center; */
    align-items: center;
    .buttonSet5{
        /* // margin-top: 30px; */
        width: 300px;
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
            background-color: #ff0000;
             /* margin-right: 20px; */
            margin: 20px;
            width: 250px;
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
                background-color: #ff0000; 
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                transform: translateY(5px); 
            }
        }
    }
}
</style>