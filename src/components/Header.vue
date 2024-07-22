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
        background-color: #0D659D;
        width: 100vw;
        height: 15vh;
        display: flex;
        .router{
            width: 10%;
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
                background-color: #053c5e;
                color: white;
                border-radius:5px;
                margin-right: 50px;
                width: 90%;
                height: 30%;
                font-size: 18px;
                border: none;
                &:hover{
                    background-color: #104769;
                }
                
            }
        }
    }
</style>