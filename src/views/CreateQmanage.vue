<script>
import Header from '../components/Header.vue'

export default{
  components:{
    Header
  }
}
</script>

<template>
  <Header />
  <div class="container">

  
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

      </div>
      <div class="list">
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
.container{
  width: 100dvw;
  height: 100dvh;
  .topContainer{
    position: relative;
    width: 90dvw;
    height: 250px;
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
    height: 100px;
    width: 90%;
    margin: auto;
  }
  .list{
    
    width: 90dvw;
    height: 800px;
    margin:auto;
  }
}

</style>
