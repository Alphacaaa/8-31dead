<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    data(){
        return{
            breadCrumList:[],
            showButton:true,
            currentPage:null
        }
    },
    mounted(){
        this.update()
    },
    watch:{
        '$route'(){
            this.update()
        }
    },
    methods:{
        routeTo(index){
            if(this.breadCrumList[index].link){
                this.$router.push(this.breadCrumList[index].link)
            }
            this.currentPage = index
            console.log('Current page index:', this.currentPage)
        },
        update(){
            this.breadCrumList = this.$route.meta.breadCrum
        },
        currentPageOrNot(index){
            return this.currentPage === index
        }
    }
}
</script>

<template>
<div class="breadList">
    <!-- <ul>
        <li v-for="(breadCrum, index) in breadCrumList" :key="index" @click="routeTo(index)" :class="{'linked': !!breadCrum.link}">
            {{ breadCrum.name }}
            
        </li>
    </ul> -->
    <a href="javascript: void(0)" class="btn1"  
    v-for="(breadCrum, index) in breadCrumList" :key="index" 
    @click="routeTo(index)" 
    :class="{
        'linked': !!breadCrum.link , 
        'current': currentPageOrNot(index) && !!breadCrum.link}">
    <span>{{ breadCrum.name }}</span>
    <!-- <svg width="13px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
    </svg> -->
</a>
    
    <!-- <RouterLink to="/QuestionaireSet"><button class="buildButton" type="button" ><b>建立問卷</b></button></RouterLink> -->
    <!-- <button type="button">統計圖表</button> -->
</div>
</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    // border: 1px solid rgb(18, 80, 92);
    
    margin: 0;
    padding: 0;
}
.breadList{
    // height: 85dvh;
    width:15vw;
    height: 85vh;
    // background-color:#000000;
    border-bottom: 1px solid rgb(18, 80, 92);
    background-color: #333030;
    // border: 1px solid rgb(18, 80, 92);
    position: relative;
    // display: flex;
    align-items: center;
    .btn1 {
    position: relative;
    width: 90%;
    color: #ffffff;
    // color: #ffffff;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    // text-align: center;
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 12px 20px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // margin-left: 50px;
    margin-top: 50px;
    // border:2px solid white;
    // border-radius: 28px;
}
.current{
        animation: blink 1s infinite  !important;
        
    }
    
    @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}
.btn1:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 28px;
    background: #000000;
    width: 56px;
    height: 56px;
    transition: all 0.3s ease;
}

.btn1 span {
    position: relative;
    z-index: 1;
}
.btn1 svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #111111;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
}
.btn1:hover:before {
    width: 100%;
    background: #000000;
}
.btn1:hover svg {
    transform: translateX(0);
}
.btn1:hover,
.btn1:focus {
    color: #ffffff;
}
.btn1:active {
    color: #111111;
    transform: scale(0.96);
}
}

</style>