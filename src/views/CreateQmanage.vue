<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import breadCrum from '../components/breadCrum.vue'
import ManageList from '../components/ManageList.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default{
  data() {
    return {
      users: [
        { id: 1, name: '', age:  '',path:'前往',icon:'../public/HomeIcon.svg'},
        { id: 2, name: '', age:  '',path:'前往',icon:'../public/HomeIcon.svg'},
        { id: 3, name: '', age:  '',path:'前往',icon:'../public/HomeIcon.svg'},
        { id: 4, name: '', age:  '',path:'前往',icon:'../public/HomeIcon.svg'},
        { id: 5, name: '', age:  '',path:'前往',icon:'../public/HomeIcon.svg'},
        // { id: 6, name: '', age:  '',path:'前往'},
        // { id: 7, name: '', age:  '',path:'前往'},
        // { id: 8, name: '', age:  '',path:'前往'},
        // { id: 9, name: '', age:  '',path:'前往'},
        // { id: 10, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
      ],
      selectedDate: null,
      flatpickrOptions: {
        dateFormat: 'Y-m-d', // 設置日期格式
        minDate:'today'
      }
    };
  },
  methods:{
    create(){
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
      <div class="buttonBox">
        <a @click="create()" href="javascript: void(0)" class="btn">
        建立問卷
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
      </div>
      
    </div>
    <div class="bigBox">
    <div class="iconContainer">
      <span><b>我的問卷</b></span>
      <div class="icon">
        <i class="fa-solid fa-trash-can"></i>
      <!-- <RouterLink to="/QuestionaireSet"><i class="fa-solid fa-plus"></i></RouterLink> -->
      </div>
      
    </div>
    <ManageList />
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
    width: 80%;
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
    .buttonBox{
      width: 100%;
      height: 6%;
      margin-top:600px;
      display: flex;
      justify-content: center;
    }
    .btn,
.btn:focus,
.btn:hover {
    position: relative;
    min-width: 100px;
    border: 1px solid #FFFFFF;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    padding: 10px 20px;
}
.btn span:nth-child(1),
.btn span:nth-child(2),
.btn span:nth-child(3),
.btn span:nth-child(4) {
    content: "";
    display: block;
    position: absolute;
    background-color: #FFFFFF;
}
.btn span:nth-child(1) {
    width: 1px;
    left: 0;
    bottom: 0;
}
.btn span:nth-child(2) {
    height: 1px;
    left: 0;
    top: 0;
}
.btn span:nth-child(3) {
    width: 1px;
    right: 0;
    top: 0;
}
.btn span:nth-child(4) {
    height: 1px;
    right: 0;
    bottom: 0;
}
.btn:hover {
    border: none;
}
.btn:hover span:nth-child(1) {
    animation: move1 1500ms infinite ease;
}
.btn:hover span:nth-child(2) {
    animation: move2 1500ms infinite ease;
}
.btn:hover span:nth-child(3) {
    animation: move3 1500ms infinite ease;
}
.btn:hover span:nth-child(4) {
    animation: move4 1500ms infinite ease;
}
@keyframes move1 {
    0% { height: 100%; bottom: 0; }
    54% { height: 0; bottom: 100%; }
    55% { height: 0; bottom: 0; }
    100% { height: 100%; bottom: 0; }
}
@keyframes move2 {
    0% { width: 0; left: 0; }
    50% { width: 100%; left: 0; }
    100% { width: 0; left: 100%; }
}
@keyframes move3 {
    0% { height: 100%; top: 0; }
    54% { height: 0; top: 100%; }
    55% { height: 0; top: 0; }
    100% { height: 100%; top: 0; }
}
@keyframes move4 {
    0% { width: 0; right: 0; }
    55% { width: 100%; right: 0; }
    100% { width: 0; right: 100%; }
}
  }
  
//     width: 84vw;
//     height: 67%;
//     // margin:  auto;
//     table{
//       margin: auto;
//       width: 90%;
//       height: 10%;
      
//       th{
//         // width: 1px;
//         background-color: rgb(18, 80, 92);
//         color: white;
//         text-align: center;
//         border-right: 2px solid white;
//         // border-left: 2px solid white;
//       }
//       .checkBoxTop{
//         // width: 1%;
//         border-top-left-radius: 10px;
//         border-bottom-left-radius: 10px;
//       }
//       .result{
//         border-top-right-radius: 10px;
//         border-bottom-right-radius: 10px;
//         // border-right: 2px solid rgb(18, 80, 92);
//       }
//       td{
//         height:50px;
//         font-size: 24px;
//         border: 1px solid rgb(255, 255, 255);
//         background-color: rgb(220, 241, 245);
        
//       }
//       .name{
//         width: 50%;
//       }
//       .checkBox{
//         width: 30px;
//         // display: flex;
//         // align-items: center;
//         // justify-content: center;
//         text-align: center;
//         input{
//           width: 50%;
//           height: 40%;
//           background-color:rgb(18, 80, 92);
//         }
//       }
//       .idBox, .pathBox{
//         text-align: center; 
//         width: 5%;
//         &:hover{
//           cursor: pointer;
//       }

// 

</style>
