
<script>
import { RouterLink } from 'vue-router'
import Header from '../components/Header.vue'
export default{
  data(){
    return{
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
      ],
      itemsPerPage : 10,
      currentPage:1
    }
  },
  mounted(){
  },
  methods:{
    // pageChange(){
    //   this.currentPage = pageNumber
    //   console.log(user.id)

    // }
  },
  computed:{
    // totalPages:function(){
    //   return this.user.length / 10
    // }
  },
  components:{
    Header,
    RouterLink
  }
}
</script>

<template>
  
<Header />
<div class="FatherBox">
    <div class="topContainer">
      <div class="search">
          <label for="">問卷名稱:</label>
          <input type="text">
      </div>
      <div class="statTime">
          <label for="">統計時間:</label>
          <input class="startTime" type="text">
          <span>到</span>
          <input class="endTime" type="text">
      </div>
      <button type="button">搜尋</button>
    </div>
    <div class="iconContainer">
      <i class="fa-solid fa-trash-can"></i>
      <RouterLink to="/QuestionaireSet"><i class="fa-solid fa-plus"></i></RouterLink>
    </div>
    <div class="list">
        <table >
          <thead>
            <tr>
              <th class="checkBoxTop">&nbsp&nbsp&nbsp&nbsp</th>
              <th >編號</th>
              <th>名稱</th>
              <th>狀態</th>
              <th>開始時間</th>
              <th>結束時間</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users" :key=user.id>
              <td class="checkBox"><input type="checkbox"></td>
              <td class="idBox">{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td></td>
              <td></td>
              <td class="pathBox">{{user.path}}</td>
              <!-- <td>
                <button @click="edit()">編輯</button>
                <button @click="edit()">刪除</button>
              </td> -->
            </tr>
          </tbody>
        </table>
        <!-- <div class="pageChage">
          <button v-for="pageNumber in totalPages" @click="pageChange()"> 
            {{ pageNumber }}
          </button>
        </div> -->


    </div>
</div>
</template>

<style scoped lang="scss">
*{
  border: 1px solid black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.FatherBox{
  width: 100vw;
  height: 100vh;
  .topContainer{
    position: relative;
    width: 100dvw;
    height: 22%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap ;
    .search{
      margin: auto;
      width: 80%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      label{
        font-size: 24px;
        margin-right: 20px;
      }
      input{
        width: 80%;
        height: 70%;
      }
    }
    .statTime{
      // margin: auto;
      width: 80%;
      height: 20%;
      display: flex;
      align-items: center;
      // justify-content: space-evenly ;
      label{
        font-size: 24px;
        margin-right: 20px;
        margin-left: 75px;
      }
      input{
        width: 30%;
        height: 70%;
      }
      .startTime{
        margin-right:50px;

      }
      .endTime{
        margin-left:50px;

      }
    }
    button{
      position: absolute;
      bottom: 17%;
      right: 15%;
      display: block;
      height: 40px;
      width: 80px;
    }
}
  .iconContainer{
    height: 5%;
    width: 80%;
    margin:1% auto;
    display: flex;
    align-items: center;
    justify-content: end;
    .fa-plus, .fa-trash-can{
      font-size: 40px;
      margin: 20px;
      color: black;
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
        width: 10%;
        background-color: rgba(92, 88, 84, 1);
        color: white;
        text-align: center;
      }
      .checkBoxTop{
        width: 3%;
      }
      td{
        height:50px;
        font-size: 24px;
        
      }
      .checkBox{
        width: 3%;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        text-align: center;
      }
      .idBox, .pathBox{
        text-align: center;
        &:hover{
          cursor: pointer;
      }

    }
  }
}
}
</style>
