<script>
import Header from '../components/Header.vue'

export default{
    

    components:{
        Header
    }
}
</script>

<template>

<div class="Frame">
        <div class="dataWindow">
            <div class="inputContainer">
                <label for="">問卷名稱:</label>
                <input type="text">
                <label class="introLabel"for="">問卷說明:</label>
                <!-- <input type="text" class="intro"> -->
                <textarea name="" id=""></textarea>
                <label for="">開始時間:</label>
                <input type="text">
                <label for="">結束時間:</label>
                <input type="text">
            </div>
        </div>
        <div class="buttonBox">
            <RouterLink to="/SetContent"><button type="button" ><b>>>下一步</b></button></RouterLink>
        </div>

    </div>
</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
}
.Frame{
    width: 84vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dataWindow{
        display: flex;
        // flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 100%;
        .inputContainer{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 80%;
            height: 80%;
            label{
                height: 10%;
                width: 15%;
                font-size: 24px;
                text-align: center;
                // vertical-align: top;
                // display: block;
            }
            .introLabel{
                height: 50%;
            }
            input{
                width: 80%;
                height: 10%;
            }
            textarea{
                height: 50%;
                width: 80%;
                font-size: 16px;
                padding: 2px;
            }
            .intro{
                height: 50%;
                vertical-align: top;
            }
        }
        
    }

}
</style>