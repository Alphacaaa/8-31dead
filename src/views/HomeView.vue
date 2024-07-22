<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import list from '../components/HomePageList.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default{
  data() {
    return {
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
      selectedDate: null,
      flatpickrOptions: {
        dateFormat: 'Y-m-d', // 設置日期格式
        minDate:'today'
      }
    }
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
      pushPage(pageNumber){
        this.currentPage = pageNumber
      }
    },
    components:{
        CreateQButton,
        Header,
        flatPickr,
        list
  }
}
</script>

<template>
  <Header />
  
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

      <!-- <button type="button">搜尋</button> -->
    </div>
    <div class="iconContainer">
      <span><b>所有問卷</b></span>
      <div class="icon">
        <i class="fa-solid fa-trash-can"></i>
      <!-- <RouterLink to="/QuestionaireSet"><i class="fa-solid fa-plus"></i></RouterLink> -->
      </div>
      
    </div>
    <list />
    <!-- <div class="list">
        <table >
          <thead>
            <tr>
              <th class="checkBoxTop">&nbsp&nbsp&nbsp&nbsp</th>
              <th >編號</th>
              <th>名稱</th>
              <th>狀態</th>
              <th>開始時間</th>
              <th>結束時間</th>
              <th class="result"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in currentPageCal" :key=user.id>
              <td class="checkBox"><input type="checkbox"></td>
              <td class="idBox">{{ user.id }}</td>
              <td class="name">{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td></td>
              <td></td>
              <td class="pathBox">{{user.path}}</td> 
            </tr>
          </tbody>
        </table>
        <div class="pageChage">
          <button v-for="pageNumber in totalPages" @click="pageChange()"> 
            {{ pageNumber }}
          </button>
        </div>


    </div>  -->
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
  background-color: #FBF6F3;
  background-color: #ADEBF0;
  background-color: #E8ECED;
  background-color: #D6F7F8;
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
  .list{
    width: 100dvw;
    height: 67%;
    margin:  auto;
    table{
      margin: auto;
      width: 80%;
      height: 10%;
      
      th{
        // width: 1px;
        background-color: #5D6C89;
        // background-color: rgb(18, 80, 92);
        color: white;
        text-align: center;
        border-right: 2px solid white;
        // border-left: 2px solid white;
      }
      .checkBoxTop{
        // width: 1%;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .result{
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        // border-right: 2px solid rgb(18, 80, 92);
      }
      td{
        height:50px;
        font-size: 24px;
        border: 1px solid rgb(255, 255, 255);
        // background-color: #FEB06A;
        background-color: rgb(220, 241, 245);

        
      }
      .name{
        width: 50%;
      }
      .checkBox{
        width: 30px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        text-align: center;
        input{
          width: 50%;
          height: 40%;
          background-color:rgb(18, 80, 92);
        }
      }
      .idBox, .pathBox{
        text-align: center;
        width: 5%;
        &:hover{
          cursor: pointer;
      }

    }
  }
}
}
</style>
