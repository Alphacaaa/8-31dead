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
      getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
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
        const blockWidth = 10;
        const blockHeight = '30%';
        const color = this.getRandomColor();
        const { x, y } = this.getRandomPosition();
        const duration = Math.random() * 5 + 3;
        const newBlock = {
          style: {
            position: 'absolute',
            width: `${blockWidth}px`,
            height: blockHeight,
            backgroundColor: color,
            left: `${x}px`,
            top: `${y}px`,
            animation: `slideIn ${duration}s ease-out forwards`
          }
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
      <div  class="colorBlock" v-for="(block,index) in blocks"
      :key="index"
      :style="block.style"></div>


      <div class="buttonDiv">
        <a href="javascript: void(0)"  @click="scroll(2)" class="btn">
          <div>
              <span>問卷列表</span>
              <span>問卷列表</span>
          </div>
        </a>
        <a href="javascript: void(0)"  @click="create()" class="btn">
          <div>
              <span>建立問卷</span>
              <span>建立問卷</span>
          </div>
        </a>
      </div>
    
  </div>
  <div class="FatherBox">
    <div class="topContainer">
      <div class="searchAndTimeBox">
        <div class="search">
          <!-- <label for="">問卷名稱:</label> -->
          <input type="text" placeholder="搜尋問卷">
        </div>
        <div class="statTime">
          <!-- <label for="">統計時間:</label> -->
          <div class="timeBox">
            <flat-pickr class="timePicker" v-model="selectedStartDate" :config="flatpickrOptions"></flat-pickr>
          </div>
          <span>&nbsp~&nbsp</span>
          <div class="timeBox">
            <flat-pickr  class="timePicker" v-model="selectedEndDate" :config="flatpickrOptions"></flat-pickr>
          </div>
        </div>
        <button type="button"><i class="fa-solid fa-magnifying-glass"></i>&nbsp搜尋</button>
      </div>
    </div>
    <div class="iconContainer">
      <span><b>所有問卷</b></span>
      <div class="icon">
        <i class="fa-solid fa-trash-can"></i>
      <!-- <RouterLink to="/QuestionaireSet"><i class="fa-solid fa-plus"></i></RouterLink> -->
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
  background-color: #ebebeb;
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




  .btn {
    margin: 20px;
    position: relative;
    min-width: 200px;
    background: #ffffff;
    border: 2px solid #000000;
    transform: translate3d(0px, 0%, 0px);
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    transition-delay: 0.6s;
    overflow: hidden;
    padding: 10px 20px;
    // position: absolute;
    // top:20%;
    // left: 40%;
  }
  .btn:before,
  .btn:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all 0.6s ease;
  }
  .btn:before {
    background: #000000;
    border-radius: 50% 50% 0 0;
    transform: translateY(100%) scaleY(0.5);
  }
  .btn:after {
    background: #000000;
    border-radius: 0;
    transform: translateY(0) scaleY(1);
  }
  .btn div {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 32px;
    text-transform: uppercase;
    overflow: hidden;
  }
  .btn span {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: 1;
    text-align: center;
    transition: transform 0.5s ease;
}
  .btn span:first-child {
    color: #ffffff;
    transform: translateY(36px);
}
  .btn span:last-child {
    color: #fafafa;
    transform: translateY(0px);
}
  .btn:hover {
    // background: #e3dede;
    background: #ffffff;
    transition: background 0.2s linear;
    transition-delay: 0.6s;
    color: #FFFFFF;
}
  .btn:hover:after {
    border-radius: 0 0 50% 50%;
    transform: translateY(-100%) scaleY(0.5);
    transition-delay: 0;
}
  .btn:hover:before {
    border-radius: 0;
    transform: translateY(0) scaleY(1);
    transition-delay: 0;
}
  .btn:hover span:first-child {
    transform: translateY(0);
}
  .btn:hover span:last-child {
    transform: translateY(-32px);
}




.FatherBox{
  width: 100vw;
  height: 100vh;
  position:relative; 
  overflow: hidden;
  // background-color: #FBF6F3;
  // background-color: #ADEBF0;
  // background-color: #E8ECED;
  // background-color: #D6F7F8;
  // background-color: #F2D9B3;
  // background-color: #F2D9B3;
  background-color: #ebebeb;
  
  // background-color: rgb(212, 247, 253);
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
      margin: auto;
      display: flex;
      align-items: center;
      justify-content:start;
      width: 80%;
      height: 100%;
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
        // background-color: rgb(212, 247, 253);
        border: 4px solid #5D6C89;
        // border: 4px solid rgb(18, 80, 92);
        // border-bottom: 4px solid rgb(18, 80, 92);
        // border-top: none;
        // border-left: none;
        // border-right: none;
        outline: none;
      }
      ::placeholder{
          color: #5D6C89;
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
        width: 6%;
        height: 40%;
        font-size: 24px;
        border-radius: 10px;
        background-color: #5D6C89;
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


</style>
