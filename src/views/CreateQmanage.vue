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
      <div class="sideButtonBox">
        <button class="retro-button yellowButton" @click="create()"><img src="/public/hammer.png" width="50px" height="50px"></button>
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
    min-width:50px;
    // width: 50px;
    width: 80px;
    height: 80px;
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
