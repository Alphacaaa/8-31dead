<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
export default{
    components:{
        CreateQButton,
        Header
  }
}
</script>

<template>
  <Header />
  <div class="buttonContainer">
    <CreateQButton />
  </div>
  
</template>

<style>
*{
    border: 1px solid black;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.buttonContainer{
  width:100dvw ;
  height: 85dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
