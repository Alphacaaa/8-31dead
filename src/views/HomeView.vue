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
export default{
  data() {
    return {
      maxBlocks: 10,
      blocks:[],
      // users: [
      //   { id: 1, name: '', age:  '',path:'前往'},
      //   { id: 2, name: '', age:  '',path:'前往'},
      //   { id: 3, name: '', age:  '',path:'前往'},
      //   { id: 4, name: '', age:  '',path:'前往'},
      //   { id: 5, name: '', age:  '',path:'前往'},
      //   { id: 6, name: '', age:  '',path:'前往'},
      //   { id: 7, name: '', age:  '',path:'前往'},
      //   { id: 8, name: '', age:  '',path:'前往'},
      //   { id: 9, name: '', age:  '',path:'前往'},
      //   { id: 10, name: '', age:  '',path:'前往'},
      //   { id: 11, name: '', age:  '',path:'前往'},
      //   { id: 11, name: '', age:  '',path:'前往'},
      //   { id: 11, name: '', age:  '',path:'前往'},
      //   { id: 11, name: '', age:  '',path:'前往'},
      //   { id: 11, name: '', age:  '',path:'前往'},
      // ],
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
  mounted(){
    console.log("前")
    this.generateBlock()
    console.log("後")
    setInterval(() => this.generateBlock(), 100)
    

  },
    computed:{
      currentPageCal(){
        const start =(this.currentPage - 1) * this.tablePerPage
        const end = start + this.tablePerPage
        return this.users.slice(start,end)
      },
      totalPages(){
        return Math.ceil(this.users.length / this.tablePerPage)
      }
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
    }
    },
  //methods End
    components:{
        CreateQButton,
        Header,
        flatPickr,
        list,
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
        <button class="retro-button" @click="scroll(2)">問卷列表</button>
        <button class="retro-button" @click="create()">建立問卷</button>
      </div>
    
  </div>
  <div class="FatherBox">
    <div class="topContainer">
      <div class="searchAndTimeBox">
        <div class="search">
          <input class="searchInput" type="text" placeholder="検索する．．．">
        </div>
        <div class="statTime">
          <div class="timeBox">
            <flat-pickr class="timePicker" v-model="selectedStartDate" :config="flatpickrOptions"></flat-pickr>
          </div>
          <span>&nbsp~&nbsp</span>
          <div class="timeBox">
            <flat-pickr  class="timePicker" v-model="selectedEndDate" :config="flatpickrOptions"></flat-pickr>
          </div>
        </div>
        <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    <div class="iconContainer">
      <!-- <span><b>所有問卷</b></span> -->
      <div class="icon">
        <!-- <i class="fa-solid fa-trash-can"></i> -->
      </div>
      
    </div>
    <list />
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
    left: 37%;
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
  width: 200px;
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
    -1px -1px 1px var(--color-bg-dark), //top highlight
    0 0 0 4px var(--color-tab-focus), //outer shadow
    1px  1px 1px var(--color-bg-dark), //bottom lowlight
    inset 0 0 0 var(--color-overlay-dark), //inset shadow
    inset .5rem .5rem .25rem var(--color-bg-light), //button gloss
    ;
}

.retro-button:hover{
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
    inset 1px 1px 1px var(--color-bg), //top highlight   
    0 0 0 4px var(--color-overlay-dark), //outer shadow
    inset -1px -1px 1px var(--color-bg-light), //bottom lowlight    
    inset .5rem .5rem .75rem var(--color-bg-dark), //inset shadow
    inset .5rem .5rem .5rem var(--color-bg-light), //button gloss
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
        margin-left: -20px;
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

</style>
