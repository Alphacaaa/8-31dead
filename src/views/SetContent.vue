<script>
import { RouterLink } from 'vue-router'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
import SetList from '../components/SetList.vue'
export default {
    data(){
        return{
        }
    },
    components: {
        RouterLink,
        // SetContent,
        breadCrum,
        Header,
        SetList
    }
    
}
</script>

<template>
<Header />
<!-- <breadCrum /> -->

<div class="Main">
    <breadCrum />
    <div class="workSpace">
        <div class="Frame">
            <div class="dataWindow">
                <div class="inputContainer">
                    <div class="question">
                        <label for=""><b>問題:</b></label>
                        <input type="text">
                    </div>

                    <div class="selectBox">
                        <label for=""></label>
                        <select name="" id="">
                            <option value="">單選題</option>
                            <option value="">多選題</option>
                            <option value="">簡選題</option>
                        </select>
                        <label class="checkLabel" for="check">必填</label>
                        <input class="checkBox" type="checkbox" id="check">
                    </div>
                    <div class="textBox">
                        <label class="introLabel"for=""><b>選項:</b></label>
                        <textarea name="" id=""></textarea>
                    </div>

                    
                </div>
            </div>
            <SetList />
        </div>

    </div>
</div>


</template>

<style scoped lang="scss">
*{
    // border:1px solid rgb(0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 24px;
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(221, 249, 253);;
    // justify-content: center;
    // align-items: center;
    .workSpace{
        width: 84vw;
        height: 100%;
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
        .Frame{
            // margin: auto;
    width: 85vw;
    height: 85vh;
    // display: flex;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    // background-color: #649ABC;
    // border:1px solid black;
    .dataWindow{
        display: flex;
        margin: auto;
        // flex-wrap: wrap;
        justify-content: center;
        // align-items: center;
        width: 85%;
        height: 30%;
        .inputContainer{
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: center;
            // align-items: center;
            width: 90%;
            height: 30%;
            // margin: auto;
            .question{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                margin-top: 20px;
                input{
                    width: 60%;
                    height: 50%;
                }
                label{
                    height: 5%;
                    width: 8%;
                    font-size: 24px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                }
            }
                .selectBox{
                    width: 84%;
                    height: 10%;
                    margin: 30px auto;
                    display: flex;
                    align-items: center;
                    .checkLabel{
                        width: 5%;
                    }
                    select{
                        width: 10%;
                        margin-right: 50px;
                    }
                    .checkBox{
                        height:20px;
                        width: 40px;
                    }
                    }
                .textBox{
                    display: flex;
                    height: 40%;
                    label{
                        width: 8%;
                    }
                    textArea{
                        width: 60%;
                    }
                }
            }
        }

    }
    }
}

</style>