<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import list from '../components/HomePageList.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import scroll from '../components/scroll.vue'
import { generate } from '@vue/compiler-core';
import { bisectRight, color } from 'd3';
import { h } from 'vue';
import axios from 'axios';
export default{
  data() {
    return {
      colors : ['red', 'green', 'blue', 'yellow'],
      buttonColors: [],
      questionnaires: [],
      maxBlocks: 10,
      blocks:[],
      formattedData: {
        quizName:"",
        startDate:"",
        endDate: ""
      },
      users: [
        { id: 1, name: '', age:  '',path:'前往'},
        { id: 2, name: '', age:  '',path:'前往'},
        { id: 3, name: '', age:  '',path:'前往'},
        { id: 4, name: '', age:  '',path:'前往'},
        { id: 5, name: '', age:  '',path:'前往'},
        { id: 6, name: '', age:  '',path:'前往'},
        { id: 7, name: '', age:  '',path:'前往'},
        { id: 8, name: '', age:  '',path:'前往'},
        { id: 9, name: '', age:  '',path:'前往'},
        { id: 10, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
      ],
      currentPage:1,
      tablePerPage:10,
      selectedStartDate: null, 
      selectedEndDate: null,   
      flatpickrOptions: {
        dateFormat: 'Y-m-d', // 設置日期格式
        minDate:'today'
      }
    }
  },
  created(){
    this.initButtonColors();
    axios.post('http://localhost:8080/quiz/search',this.formattedData) 
      .then(response => {
        console.log('Received data:', response.data);
        this.questionnaires = response.data.quizResList || [];
        sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.questionnaires));
      })
      .catch(error => {
        this.error = 'Error: ' + error.message;
      });
  
  },
  mounted(){
    this.initButtonColors();
    console.log("前")
    this.generateBlock()
    console.log("後")
    setInterval(() => this.generateBlock(), 100)
    axios.post('http://localhost:8080/quiz/search',this.formattedData) 
      .then(response => {
        console.log('Received data:', response.data);
        this.questionnaires = response.data.quizResList || [];
        sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.questionnaires));
      })
      .catch(error => {
        this.error = 'Error: ' + error.message;
      });

  },
    computed:{

      // currentPageData(){
      //   const start =(this.currentPage - 1) * this.tablePerPage
      //   const end = start + this.tablePerPage
      //   return this.questionnaires.slice(start,end)
      // },
      // totalPages(){
      //   return Math.ceil(this.questionnaires.length / this.tablePerPage)
      //   },
      // pagesArray() {
      //     return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      // },
      currentPageData() {
        const filteredQuestionnaires = this.questionnaires.filter(q => q.published);
        const start = (this.currentPage - 1) * this.tablePerPage;
        const end = start + this.tablePerPage;
        return filteredQuestionnaires.slice(start, end);
      },
      totalPages() {
        const filteredQuestionnaires = this.questionnaires.filter(q => q.published);
        return Math.ceil(filteredQuestionnaires.length / this.tablePerPage);
      },
      pagesArray() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
    },
    methods:{
      getRandomBlockType() {
        const types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
        return types[Math.floor(Math.random() * types.length)];
      },
      getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      // return `rgb(${r}, ${g}, ${b})`
      return `rgb(${r},${g},${b})`
      },
      getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const x = Math.random() * viewportWidth;
        const y = -100; // Start from above the viewport
        return { x, y };
      },
      generateBlock() {
        // if (this.blocks.length >= this.maxBlocks) {
        // this.blocks.shift();
        // }
        const blockType = this.getRandomBlockType()
        const blockWidth = 10
        const blockHeight = '10%'
        const color = this.getRandomColor()
        const { x, y } = this.getRandomPosition()
        const duration = Math.random() * 5 + 3
        const newBlock = {
          style: {
            position: 'absolute',
            width: `${blockWidth}px`,
            height: blockHeight,
            backgroundColor: color,
            left: `${x}px`,
            top: `${y}px`,
            animation: `slideIn ${duration}s ease-out forwards`
          },
          className: `tetris-${blockType}`,
        }
        this.blocks.push(newBlock);
        setTimeout(() => {
          this.blocks.shift();
        }, duration * 50000); 
      },
      pushPage(pageNumber){
        this.currentPage = pageNumber
      },
      create(){
        this.$router.push('/QuestionaireSet')
      },
      scroll(){
        window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // 平滑滾動
      })
    },
  
    getButtonClass(index) {
        const color = this.buttonColors[index];
        console.log(`retro-button ${this.buttonColors[index]}-button`)
        return `retro-button ${this.buttonColors[index]}-button`
    },
    initButtonColors() {
        if (this.totalPages > 0) {
          this.buttonColors = Array.from({ length: this.totalPages }, () => this.getRandomColor());
          }
      },
      getStatus(questionnaire) {
      if (!questionnaire.published) {
        return '未發布'
      }
        const now = new Date();
        const startDate = new Date(questionnaire.startTime);
        const endDate = new Date(questionnaire.endTime);

        if (now < startDate) {
          return '未開始'
        } else if (now >= startDate && now <= endDate) {
          return '進行中'
        } else if (now > endDate) {
            return '已結束';
        } else {
          return '/available.png'
        }
    },
    isClickable(questionnaire) {
      const now = new Date();
      const startTime = new Date(questionnaire.startTime);
      const endTime = new Date(questionnaire.endTime);

      return now >= startTime && now <= endTime;
    },
    search(){
      axios.post('http://localhost:8080/quiz/search',this.formattedData) 
      .then(response => {
        console.log('Received data:', response.data);
        this.questionnaires = response.data.quizResList || [];
        sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.questionnaires));
      })
      .catch(error => {
        this.error = 'Error: ' + error.message;
      });
      console.log(this.formattedData.endDate)
      this.formattedData= {
        quizName:"",
        startDate:"",
        endDate: ""
      }
    },
    },
  //methods End
    components:{
        // CreateQButton,
        Header,
        flatPickr,
        scroll
  }
}



</script>

<template>
  <!-- <scroll /> -->
  <!-- <Header /> -->
  <!-- <fullPage /> -->
  <!-- <fullPage /> -->
  
  <div class="buttonBox" >  
    <div class="wrapper">
      <div class="header-wrap">
        <h1>Dynamic Questionnaire</h1>
      </div>
    </div>
      <div class="colorBlock" v-for="(block,index) in blocks"
      :key="index"
      :style="block.style"
      :class="block.className"></div>


      <div class="buttonDiv">
        <RouterLink  to="/CreateQmanage">
          <button class="goListRetro-button greenButton"><img src="/public/diary.png" width="25px" height="25px"></button>
        </RouterLink>
        <button class="retro-button" @click="scroll(2)">問卷列表</button>
        <button class="retro-button" @click="create()">建立問卷</button>
        
      </div>
    
  </div>
  <div class="FatherBox">
    <div class="topContainer">
      <div class="searchAndTimeBox">
        <div class="search">
          <input type="text" v-model="formattedData.quizName" class="searchInput"  placeholder="検索する．．．">
          <input type="date" class="date" v-model="formattedData.startDate">
          <input type="date" class="date" v-model="formattedData.endDate">
          <!-- <button class="searchButton"@click="search()">搜尋</button> -->
          <!-- <input v-model="" class="searchInput" type="text" placeholder="検索する．．．" > -->
        </div>
        
        <button type="button" @click="search()"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    <div class="iconContainer">
      <!-- <span><b>所有問卷</b></span> -->
      <div class="icon">
        <!-- <i class="fa-solid fa-trash-can"></i> -->
      </div>
      
    </div>
    <div class="tableContainer">
    <div class="list">
        <table >
            <thead>
                <tr>
                <!-- <th class="checkBoxTop">&nbsp&nbsp&nbsp&nbsp</th> -->
                <th >ID</th>
                <th>Name</th>
                <th class="status">Status</th>
                <th class="startTimeBox">Start</th>
                <th class="endTimeBox">End</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(questionnaire,index) in currentPageData" :key=questionnaire.id :class="{ 'disabled-button': !isClickable(questionnaire) }"> 
                <!-- <td class="checkBox"><input type="checkbox"></td> -->
                <td class="idBox">{{ (currentPage - 1) * tablePerPage + index + 1 }}</td>
                <!-- <td class="name"><router-link :to="{ name: 'questionnaireContent', params: { id: questionnaire.id }, state: { questionnaireData: questionnaire }}">{{ questionnaire.questionName }}</router-link></td> -->
                <td class="name">
                  <template v-if="isClickable(questionnaire)">
                    <router-link :to="{ name: 'questionnaireContent', params: { id: questionnaire.id }, state: { questionnaireData: questionnaire } }">
                      {{ questionnaire.questionName }}
                    </router-link>
                  </template>
                  <template v-else>
                    <span class="disabled-link">
                      {{ questionnaire.questionName }}
                    </span>
                  </template>
                </td>
                <td class="statusTd">{{ getStatus(questionnaire) }}</td>
                <td class="tdStartTime">{{ questionnaire.startTime }}</td>
                <td class="tdEndTime">{{ questionnaire.endTime }}</td>
                <td class="tdEndTime"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="buttonDiv1">
        <button v-for="(pageNumber,index) in totalPages" :key="pageNumber" @click="pushPage(pageNumber)" 
        class="retro-button blue-button"
        :class="getButtonClass(index)">
            {{ pageNumber   }}
        </button>
    </div>
</div>
</div>
</template>

<style lang="scss">
*{
  // border: 1px solid black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // font-family: "LXGW WenKai Mono TC", monospace;
  // font-family: "Chocolate Classical Sans", sans-serif;
}

.buttonBox{
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background-color: #ebebeb;
  background-color:var(--color-page-bg);
  
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .buttonDiv{
    position: absolute;
    margin: auto;
    top: 40%;
    left: 34%;
    // width: 40%;
    // height: 40%;
    transform: translate(-50,-50%);

  }
}
.colorBlock{
  position: absolute;
  // width: 500px;
  // height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  animation: slideIn 5s ease-in-out forwards
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(2000%);
  }
}

.wrapper {
  position:absolute;
  width: 600px;
  top:20%;
  right: 36%;
  display: inline-block;
  translate: transform(-50%,-50%);
  margin: auto;
  z-index: 99;
  
}
.header-wrap {
  display: block;
  width: auto;
  height: auto;
  padding: 0;
  text-align: center;
  font-size: 25px;
  font-family: 'Press Start 2P', cursive;
  // transform: perspective(200px) rotateX(10deg);
  letter-spacing: .1em;
  user-select: none;
  color:#9ea7a5;
  text-shadow: 
  0 -1px 0 #fff, 
    0 1px 0 #004d40, 
    0 2px 0 #00483B, 
    0 3px 0 #004639, 
    0 4px 0 #004336, 
    0 5px 0 #004134, 
    0 6px 0 #003F32, 
    0 7px 0 #003D30, 
    0 8px 0 #003A2D, 
    0 9px 0 #00382B, 
    0 10px 0 #003528, 
    0 11px 0 #003225, 
    0 12px 0 #002F22, 
    0 13px 0 #002B1E, 
    0 14px 0 #00281C, 
    0 15px 0 #001F13, 
    0 22px 30px rgba(0,0,0, 0.9),
    0 22px 30px rgba(0, 0, 0, 0.9),
    0 22px 15px rgba(0, 0, 0, 0.9),
    0 11px 15px rgba(0, 0, 0, 0.9),
    0 15px 20px rgba(0, 0, 0, 0.9),
    0 15px 11px rgba(0, 0, 0, 0.9),
    0 16px 11px rgba(0, 0, 0, 0.9);

  transition: text-shadow .3s ease .3s, 
    transform .3s ease .3s,
    letter-spacing .3s ease .3s;

&:hover {
    transition: text-shadow .33s ease, 
      transform .3s ease,
      letter-spacing .3s ease;
    text-shadow: 0 0 0 #004134,
      0 1px 0 #9ea7a5,
      0 2px 0 #003528,
      0 3px 3px rgba(0, 0, 0, 0.9);
    // transform: translate(0px, 15px) 
    //   perspective(200px) 
    //   rotateX(10deg);
    letter-spacing: .125em;
  }
}

:root{
  --button-height: 3rem;
  --color-text: rgba(0, 0, 0, 0.25);
  --color-text-shadow: rgb(29, 28, 28);
  --color-page-bg:#B9B5AA;
  --color-bg:#899095;
  --color-bg-light:#969DA3;
  --color-bg-dark: #7D878F;
  --color-overlay-light: rgba(255,255,255,.2);
  --color-overlay-medium: rgba(0,0,0,.1);
  --color-overlay-dark: rgba(0,0,0,.2);
  --color-tab-focus: rgba(255,255,255,.15);
}
.buttonDiv1{
        width: 100%;
        position: absolute;
        bottom:0%;
        display: flex;
        justify-content:center;
        align-items: center;
        // left: 50%;
        .blue-button, .red-button, .yellow-button, .green-button{
            width: 20px;
            --color-bg:#0066B4;
            --color-bg-light:#3981CA;
            --color-bg-dark:#004EAD;
            }
        .red-button{
            --color-bg:#E44E55;
            --color-bg-light:#E47479;
            --color-bg-dark:#D13239;
        }
        .green-button{
            --color-bg:#00A07D;
            --color-bg-light:#00AF8A;
            --color-bg-dark:#008F70;
        }
        .yellow-button{
            --color-bg:#FFC054;
            --color-bg-light:#FFD996;
            --color-bg-dark:#F2AA30;
        }
    }
.greenButton{
    // color: white;
    --color-bg:#00A07D;
    --color-bg-light:#00AF8A;
    --color-bg-dark:#008F70;
}
.retro-button , .goListRetro-button{
  position:relative;
  appearance:none;
  box-sizing:border-box;
  font-size:calc( var(--button-height) / 3 );
  font-family: 'Open Sans', sans-serif;
  background: var(--color-bg);
  height:var(--button-height);
  min-width:var(--button-height);
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
  width: 200px;
  box-shadow:
    -1px  -1px 1px var(--color-bg), 
    0 0 0 4px var(--color-overlay-medium), 
    1px  1px 1px var(--color-bg-dark), 
    inset .0 .0 .0 var(--color-overlay-dark),   
    inset .5rem .5rem .25rem var(--color-bg-light) 
  
}
.goListRetro-button, .retro-button::-moz-focus-inner{
  outline:none;
  border:none;
}

.goListRetro-button, .retro-button:focus{
  outline:none;
  box-shadow:
    -1px -1px 1px var(--color-bg-dark), //top highlight
    0 0 0 4px var(--color-tab-focus), //outer shadow
    1px  1px 1px var(--color-bg-dark), //bottom lowlight
    inset 0 0 0 var(--color-overlay-dark), //inset shadow
    inset .5rem .5rem .25rem var(--color-bg-light), //button gloss
    ;
}

.goListRetro-button, .retro-button:hover{
  box-shadow:
    -1px -1px 1px var(--color-bg-dark), //top highlight
    0 0 0 4px var(--color-overlay-dark), //outer shadow
    1px  1px 1px var(--color-bg-dark), //bottom lowlight
    inset 0 0 0 var(--color-overlay-dark), //inset shadow
    inset .5rem .5rem .25rem var(--color-bg-light), //button gloss
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
.goListRetro-button{
  width: 30px;
}




.FatherBox{
  font-size: 'Press Start 2P';
  width: 100vw;
  height: 100vh;
  position:relative; 
  overflow: hidden;
  background-color:var(--color-page-bg);

  .topContainer{
    position: relative;
    width: 100dvw;
    height: 10%;
    margin: auto;
    display: flex;
    align-items: center;
    // justify-content: center;
    flex-wrap: wrap ;
    .searchAndTimeBox{
      margin: 30px auto;
      display: flex;
      align-items: center;
      justify-content:start;
      width: 80%;
      height: 100%;
      .search{
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .searchInput{
          width: 100%;
          height: 80%;
          font-size: 24px;
          
          border: none;
          border-bottom: 4px solid var(--color-bg-dark);
          background-color: var(--color-page-bg);
          outline: none;
          }
          ::placeholder{
            color: #5D6C89;
          }
        .date{
          margin-left: 100px;
        }
        .searchButton{
          display: block;

        }
    }
      .statTime{
      // margin: auto;
      width: 50%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      // justify-content: space-evenly ;
      span{
        margin: 30px;
        font-size: 20px;
      }
      .timeBox{
        margin-top:10px; 
        // margin-left: 50px;
        width: 30%;
      }
      .timePicker{
        font-size: 18px;
        border:none;
        outline: none;
        border-bottom: 4px solid var(--color-bg-dark);
        width: 100%;
        background-color: var(--color-page-bg);
        color:black;
        text-align: center;
      }
    }
      button{
        display: block;
        margin-left: 200px;
        width: 6%;
        height: 40%;
        font-size: 24px;
        border-radius: 10px;
        background-color: var(--color-bg);
        color: white;
        border: none;
        // &:hover{
        //   scale:1.1;
        // }
      }
    }
    

}
  .iconContainer{
    height: 5%;
    width: 80%;
    margin:1% auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 40px;
      color: #5D6C89;
      
    }
    .fa-plus, .fa-trash-can{
      font-size: 40px;
      margin: 20px;
      color: #5D6C89;
    }
  }
}



.tetris-block {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
}

.tetris-I {
  width: 10px;
  height: 10px;
}

.tetris-J {
  width: 10px;
  height: 10px;
  position: relative;
}

.tetris-J::before {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 10px;
  height: 10px;
  top: 0;
  left: 10px;
}
.tetris-J::after {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 10px;
  height: 10px;
  top: 0;
  right: 10px;
}

.tetris-L {
  width: 30px;
  height: 30px;
  position: relative;
}

.tetris-L::before {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 10px;
  height: 30px;
  top: 0;
  left: 0;
}

.tetris-O {
  width: 30px;
  height: 30px;
}

.tetris-S {
  width: 30px;
  height: 30px;
  position: relative;
}

.tetris-S::before {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 30px;
  height: 10px;
  top: 10px;
  left: 0;
}

.tetris-T {
  width: 30px;
  height: 30px;
  position: relative;
}

.tetris-T::before {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 10px;
  height: 30px;
  top: 0;
  left: 10px;
}

.tetris-Z {
  width: 30px;
  height: 30px;
  position: relative;
}

.tetris-Z::before {
  content: '';
  position: absolute;
  background-color: inherit;
  width: 30px;
  height: 10px;
  top: 10px;
  left: 0;
}




.tableContainer{
  height: 100vh;

.list{
    font-family: 'Press Start 2P', cursive;
    width: 100%;
    height: 80%;
    margin:  auto;
    position: relative;
    table{  
        margin: auto;
        width: 90%;
        // height: 20%;
        th{
            background-color:var(--color-bg);
            color: white;
            text-align: center;
            height: 75px;
            border-right: 2px solid rgb(248, 248, 248);
            font-size: 24px;
            // width: 20%;
        }
        .checkBoxTop{
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        .status{
            font-size: 24px;
            padding: 20px;
        }
        .startTimeBox{
            padding: 20px;
            // border-right: none;
            font-size: 24px;
        }
        .endTimeBox{
            border-top-right-radius: 10px;
            // border-bottom-right-radius: 10px;
            padding: 20px;
            border-right: none;
            font-size: 24px;
        }
        td{
            height:50px;
            font-size: 24px;
            text-align: center;
            // color:var(--color-page-bg);
            // border: 1px solid rgb(0, 0, 0);
            border-bottom: 1px solid rgb(0, 0, 0);
            background-color: var(--color-overlay-light);
        }
        .name{
            width: 50%;
        }
        .checkBox{
            width: 30px;
            text-align: center;
            border:none;
        input{
            width: 50%;
            height: 40%;
            background-color:rgb(18, 80, 92);
        }
        }
        .idBox{
        text-align: center;
        width: 10%;
        &:hover{
            cursor: pointer;
        }
      }
        .tdStartTime, .tdEndTime{
          font-size: 12px;
        }
    }
    .buttonDiv{
        width: 100%;
        // position: absolute;
        bottom:-10%;
        display: flex;
        justify-content:center;
        align-items: center;
        // left: 50%;
        .blue-button, .red-button, .yellow-button, .green-button{
            width: 20px;
            --color-bg:#0066B4;
            --color-bg-light:#3981CA;
            --color-bg-dark:#004EAD;
            }
        .red-button{
            --color-bg:#E44E55;
            --color-bg-light:#E47479;
            --color-bg-dark:#D13239;
        }
        .green-button{
            --color-bg:#00A07D;
            --color-bg-light:#00AF8A;
            --color-bg-dark:#008F70;
        }
        .yellow-button{
            --color-bg:#FFC054;
            --color-bg-light:#FFD996;
            --color-bg-dark:#F2AA30;
        }
    }
  }
}

.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
.disabled-button:focus {
  outline: none;
}
</style>
