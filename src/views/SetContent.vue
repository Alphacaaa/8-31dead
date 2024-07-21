<script>
import { RouterLink } from 'vue-router'
// import SetContent from '../components/SetContent.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
export default {
    data(){
        return{
        }
    },
    components: {
        RouterLink,
        // SetContent,
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
        
        <div class="Frame">
    <div class="dataWindow">
        <div class="inputContainer">
            <div class="question">
                    <label for="">問題:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
                    <input type="text" >
                    <select name="" id="">
                        <option value="">單選題</option>
                        <option value="">多選題</option>
                    </select>
            </div>
            <div class="selection">
                    <label class="introLabel"for="">選項:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
                    <!-- <input type="text" class="intro"> -->
                    <textarea name="" id=""></textarea>
            </div>
        </div>
        <div class="icon">
            <i class="fa-solid fa-trash-can"></i>
        </div>
        <div class="questionList">
            <table>
                <thead>
                    <tr>
                        <th class='checkBox'>&nbsp&nbsp&nbsp</th>
                        <th>編號</th>
                        <th class="content">內容</th>
                        <th class="class">問題種類</th>
                        <th>必填</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        </div>
        <div class="buttonBox">
            <button type="button"><b>>>下一步set</b></button>
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
.Frame{
    width: 84vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dataWindow{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        // align-items: center;
        width: 100%;
        height: 100%;
        .inputContainer{
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: center;
            // align-items: center;
            width: 80%;
            height: 45%;
            .question{
                margin: 50px auto;
                display: flex;
                width: 90%;
                input{
                    width: 60%;
                }
                select{
                    margin-left: 70px;
                    width: 10%;
                    font-size:24px;
                }
            }
            .selection{
                width: 90%;
                margin: auto;
                display: flex;
                align-items: center;
            }
        }
        .icon{
            width: 80%;
            height: 5%;
            .fa-trash-can{
                font-size: 30px;
                // margin-left: 30px;
                display:flex;
                justify-content: end;
            }
        }
        .questionList{
            height: 50%;
            width: 80%;
            table{
                width: 100%;
                th{
                    width: 10%;
                    text-align: center;
                    background-color: rgba(92, 88, 84, 1);
                    color: white;
                }
                .checkBox{
                    width: 5%;
                }
                .content{
                    width: 20%;
                }
                .class{
                    width: 10%;
                }
            }
        }

}
}



label{
    font-size: 36px;
    }
</style>