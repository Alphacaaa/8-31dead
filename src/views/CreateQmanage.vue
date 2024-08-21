<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import breadCrum from '../components/breadCrum.vue'
import ManageList from '../components/ManageList.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
export default{
  data() {
    return {
      questionnaires: [],

      formattedData: {
        quizName:"",
        startDate:"",
        endDate: ""
      },
      selectedDate: null,
      flatpickrOptions: {
        dateFormat: 'Y-m-d', // 設置日期格式
        minDate:'today'
      },
      questionList:[],
      currentPage:1,
      tablePerPage:10,
      colors : ['red', 'green', 'blue', 'yellow'],
      buttonColors: [],
    }
  },
  mounted(){
    // const sessionData = sessionStorage.getItem('sessionQuestionnaire')
    // console.log(sessionData)
    // this.users.push(JSON.parse(sessionData))
    // // this.users = sessionData ? JSON.parse(sessionData) : []
    // console.log(this.users)
    // axios.post('http://localhost:8080/quiz/search', this.formattedData)
    //   .then(response => {
    //     console.log('問卷資料已成功傳送:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('傳送問卷資料時出現錯誤:', error);
    //   });

  },
  created() {
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
  
  computed:{
        currentPageData(){
        const start =(this.currentPage - 1) * this.tablePerPage
        const end = start + this.tablePerPage
        return this.questionnaires.slice(start,end)
        },
        totalPages(){
        return Math.ceil(this.questionnaires.length / this.tablePerPage)
        },
        pagesArray() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
    },
  
  methods:{
    create(){
      this.$router.push('/QuestionaireSet')
    },
    pushPage(pageNumber){
        this.currentPage = pageNumber
        },
    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        console.log(this.colors[randomIndex])
        return this.colors[randomIndex]
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
    goContent(){
      this.$router.push('/questionnaireContent')
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
    },
    edit(){
      this.$router.push('/QuestionaireSet')
    }
    
  },
  components:{
      CreateQButton,
      Header,
      flatPickr,
      breadCrum,
      ManageList
  }
}
</script>

<template>
  <Header  />
  
  
  <div class="FatherBox">
    <!-- <breadCrum /> -->
    <div class="sideBox">
      <div class="sideButtonBox">
        <button class="retro-button yellowButton" @click="create()"><img src="/public/hammer.png" width="50px" height="50px"></button>
      </div>
      
    </div>
    <div class="bigBox">
      <div class="search">
        <input type="text" v-model="formattedData.quizName">
        <input type="date" v-model="formattedData.startDate">
        <input type="date" v-model="formattedData.endDate">
        <button @click="search()">搜尋</button>
      </div>
      <div class="iconContainer">
        <span><b>我的問卷</b></span>
          <div class="icon">
            <i class="fa-solid fa-trash-can"></i>
          <!-- <RouterLink to="/QuestionaireSet"><i class="fa-solid fa-plus"></i></RouterLink> -->
          </div>
        
      </div>
      <div class="tableContainer">
        <div class="list">
            <table >
                <thead>
                    <tr>
                    <th class="checkBoxTop">&nbsp&nbsp&nbsp&nbsp</th>
                    <th >ID</th>
                    <th>Name</th>
                    <th class="status">Status</th>
                    <th class="startTimeBox">Start</th>
                    <th class="endTimeBox">End</th>
                    <th class="endTimeBox">Edit</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(questionnaire,index) in currentPageData" :key=questionnaire.id>
                    <td class="checkBox"><input type="checkbox"></td>
                    <!-- <td class="idBox">{{ index + 1 }}</td> -->
                    <td class="idBox">{{ (currentPage - 1) * tablePerPage + index + 1 }}</td>
                    <!-- <td class="name"><p @click="goContent()">{{ questionnaire.questionName }}</p></td> -->
                    <td class="name"><router-link :to="{ name: 'questionnaireContent', params: { id: questionnaire.id }, state: { questionnaireData: questionnaire }}">{{ questionnaire.questionName }}</router-link></td>
                    <td class="statusTd">{{ questionnaire.status }}</td>
                    <td class="tdStartTime">{{ questionnaire.startTime }}</td>
                    <td class="tdEndTime">{{ questionnaire.endTime }}</td>
                    <td  class="tdEndTime"><router-link :to="{ name: 'QuestionaireEdit', params: { id: questionnaire.id }, state: { questionnaireData: questionnaire }}">編輯</router-link></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="buttonDiv">
            <button v-for="pageNumber in pagesArray" :key="pageNumber" @click="pushPage(pageNumber)" 
              class="retro-button blue-button"
              :class="getButtonClass(pageNumber - 1)">
              {{ pageNumber }}
            </button>
</div>
    </div>

    </div>

</div>
  <!-- <div class="buttonContainer">
    <CreateQButton />
  </div> -->
  
</template>

<style scoped lang="scss">
*{
  // border: 1px solid black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // font-family: "LXGW WenKai Mono TC", monospace;
  // font-family: "Chocolate Classical Sans", sans-serif;
}
.FatherBox{
  width: 100vw;
  height: 85vh;
  // background-color: rgb(212, 247, 253);
  display: flex;
  flex-wrap: wrap;
  background-color: #e3dede;
  .bigBox{
    width: 85vw;
    height: 85vh;
    margin: auto;
    .topContainer{
      position: relative;
      width: 84vw;
      height: 22%;
      // margin: auto;
      display: flex;
      align-items: center;
      // justify-content: center;
      flex-wrap: wrap ;
    .searchAndTimeBox{
      margin: auto;
      display: flex;
      align-items: center;
      justify-content:start;
      width: 80%;
      height: 50%;
      .search{
      // margin: auto;
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      // label{
      //   font-size: 24px;
      //   margin-right: 20px;
      // }
      input{
        width: 100%;
        height: 80%;
        font-size: 24px;
        background-color: rgb(212, 247, 253);
        border: 4px solid rgb(18, 80, 92);
        // border-bottom: 4px solid rgb(18, 80, 92);
        // border-top: none;
        // border-left: none;
        // border-right: none;
        outline: none;
      }
      ::placeholder{
          color: rgb(18, 80, 92);
        }
    }
      .statTime{
      // margin: auto;
      width: 30%;
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
        width: 25%;
      }
      .timePicker{
        width: 100%;
      }
    }
      button{
        display: block;
        margin-left: -20px;
        width: 10%;
        height: 40%;
        font-size: 24px;
        border-radius: 10px;
        background-color: rgb(18, 80, 92);
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
    width: 90%;
    margin:1% auto;
    display: flex;  
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 40px;
      color: #333030 ;
      
    }
    .fa-plus, .fa-trash-can{
      font-size: 40px;
      margin: 20px;
      color: #333030 ;
    }
  }
}
  }

  .sideBox{
    height: 85vh;
    width: 15vw;
    border: 1px solid black;
    background-color: #333030 ;
    display: flex;
    justify-content: center;
    .sideButtonBox{
      // width: 100%;

      margin-top:600px;
      display: flex;
      justify-content: center;
    }
  }
  .yellowButton{

    --color-bg:#FFC054;
    --color-bg-light:#FFD996;
    --color-bg-dark:#F2AA30;
  }

    .retro-button{
    position:relative;
    appearance:none;
    box-sizing:border-box;
    font-size:calc( var(--button-height) / 3 );
    font-family: 'Open Sans', sans-serif;
    background: var(--color-bg);
    height:var(--button-height);
    min-width:100px;
    // width: 50px;
    width: 100px;
    height: 100px;
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




//////////////////////

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

.tableContainer{
    position: relative;
    width: 100%;
    height: 70%;
    .buttonDiv{
        width: 100%;
        position: absolute;
        bottom:-25%;
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
.iconContainer{
    width: 100%;
}
.list{
    font-family: 'Press Start 2P', cursive;
    width: 100%;
    height: 85vh;
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
            font-size: 36px;
            // width: 20px;
        }
        .checkBoxTop{
            width:1%;
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
            // width: 1%;

        }
        .name{
            width: 40%;
        }
        .checkBox{
            width: 1px;
            // height: 100px;
            text-align: center;
            border:none;
        input{
            // width: 100%;
            // height: 40%;
            // background-color:rgb(18, 80, 92);
        }
        }
        .idBox{
        text-align: center;
        width: 10%;
        &:hover{
            cursor: pointer;
        }
    }
        .tdEndTime, .tdStartTime{
          font-size: 12px;
          // width: 50px;
        }
    }
}
.retro-button{
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
</style>
