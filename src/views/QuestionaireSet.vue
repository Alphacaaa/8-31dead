<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/QuestionaireSetFirst.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
export default {
    data(){
        return{
            settingShow: true
        }
    },
    components: {
        RouterLink,
        QuestionaireSetFirst,
        breadCrum,
        Header
    }
    
}
</script>

<template>
<Header />
<!-- <breadCrum /> -->

<div class="Main">
    <breadCrum />
    <div class="workSpace">
        <QuestionaireSetFirst v-if="settingShow"/>
        <div class="buttonBox">
            <button type="button"><b>>>下一步</b></button>
        </div>
    </div>
    
</div>


</template>

<style scoped lang="scss">
*{
    border:1px solid black;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    // align-items: center;
    .workSpace{
        width: 84vw;
        height: 90%;
        .buttonBox{
            display: flex;
            justify-content: end;

            height: 10%;
            button{
                display: block;
                margin-right: 200px;
                width: 200px;
                height: 80%;
                font-size: 24px;
            }
        }
    }
}
</style>