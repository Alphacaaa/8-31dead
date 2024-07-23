<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    data(){
        return{
            breadCrumList:[],
            showButton:true
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
        },
        update(){
            this.breadCrumList = this.$route.meta.breadCrum
        }
    }
}
</script>

<template>
<div class="breadList">
    <ul>
        <li v-for="(breadCrum, index) in breadCrumList" :key="index" @click="routeTo(index)" :class="{'linked': !!breadCrum.link}">
            {{ breadCrum.name }}
            
        </li>
    </ul>
    
    <RouterLink to="/QuestionaireSet"><button class="buildButton" type="button" ><b>建立問卷</b></button></RouterLink>
    <button type="button">統計圖表</button>
</div>
</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.breadList{
    height: 85dvh;
    width:15dvw;
    background-color:#053c5e;
    border: 1px solid rgb(18, 80, 92);
    position: relative;
    ul{
        list-style: none;
        width: 100%;
        background-color: #134e72;
        // background-color: #053c5e;
        li{
            // width: 100%;
            text-align: center;
            margin: 50px 0;
            background-color: #216792;
            font-size: 30px;
            // border-top: 3px solid #e8f3f8;
            // border-bottom: 3px solid #e8f3f8;
            color:white;
            &:hover{
                cursor: pointer;
            }
                
            
        }
    }
    a{
        text-decoration: none;
    }
    .buildButton{
        margin: 500px auto;
        display: block;
        background-color: #D6F7F8;;
        color: #5D6C89;
        width: 60%;
        height: 5%;
        border-radius: 10px;
        border: none;
        position: absolute;
        bottom: -50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 24px;
        // &:hover{
        //     scale: 1.2;
        // }

    
    }
}
</style>