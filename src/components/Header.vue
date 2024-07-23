<script>
import { RouterLink } from 'vue-router'
export default {
    data(){
        return{
            showButton:true
        }
    },
    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="header">
        <div class="birdIcon">
            <!-- <img src="/public/bird-1293815_640.png" alt=""> -->
        </div>
        <div class="router">
            <RouterLink to="/">所有問卷</RouterLink>
        </div>

        
        <div class="build">
            <RouterLink  to="/"><button type="button">問卷列表</button></RouterLink>
            <RouterLink  to="/CreateQmanage"><button type="button">我的問卷</button></RouterLink>
        </div>
    </div>
    

</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    // border: 1px solid rgb(18, 80, 92);
}

    .header{
        // background-color: rgb(212, 247, 253);
        // background-color: #2D4472;
        // background-color: #5A8100;
        width: 100vw;
        height: 15vh;
        display: flex;
        .router{
            width: 10%;
        }
        img{
            width: 150px;
            // margin: 20px;
            // height: 100px;
        }
        .build{
            display: flex;
            width:89% ;
            height: 100%;
            justify-content: end;
            align-items: center;
            a{
                text-decoration: none;
            }
            button{
                // display: block;
                background-color: #1F284C;
                background-color: #D9CCAC;
                color: #1F284C;
                border-radius:5px;
                margin-right: 50px;
                width: 90%;
                height: 30%;
                font-size: 18px;
                border: none;
                &:hover{
                    // background-color: #104769;
                }
                
            }
        }
    }
</style>