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
        <div class="Homediv">
            <RouterLink  to="/">
                <a href="javascript: void(0)" class="btn">
                    首頁
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </RouterLink>
        </div>
        <div class="build">
            <RouterLink  to="/CreateQmanage">
                <a href="javascript: void(0)" class="btn">
                    我的問卷
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </RouterLink>
        </div>
    </div>
    

</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // border: 1px solid rgb(18, 80, 92);
}

    .header{
        // background-color: rgb(212, 247, 253);
        // background-color: #2D4472;
        background-color: #a3a1a1;
        width: 100vw;
        height: 15vh;
        display: flex;
        .router{
            width: 10%;
            p{
                font-size: 36px;
            }
        }
        .Homediv{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20%;
        }
        .build{
            display: flex;
            // width:89% ;
            margin-left: 60%;
            height: 100%;
            justify-content: end;
            align-items: center;
        }
    }

    .btn,
        .btn:focus,
        .btn:hover {
                    position: relative;
                    min-width: 200px;
                    border: 1px solid #FFFFFF;
                    color: #FFFFFF;
                    font-size: 1rem;
                    font-weight: bold;
                    text-align: center;
                    text-decoration: none;
                    text-transform: uppercase;
                    -webkit-font-smoothing: antialiased;
                    padding: 10px 20px;
                }
        .btn span:nth-child(1),
        .btn span:nth-child(2),
        .btn span:nth-child(3),
        .btn span:nth-child(4) {
                    content: "";
                    display: block;
                    position: absolute;
                    background-color: #FFFFFF;
            }
        .btn span:nth-child(1) {
                    width: 1px;
                    left: 0;
                    bottom: 0;
        }
        .btn span:nth-child(2) {
                    height: 1px;
                    left: 0;
                    top: 0;
        }
        .btn span:nth-child(3) {
                    width: 1px;
                    right: 0;
                    top: 0;
        }
        .btn span:nth-child(4) {
                    height: 1px;
                    right: 0;
                    bottom: 0;
        }
        .btn:hover {
                    border: none;
        }
        .btn:hover span:nth-child(1) {
                    animation: move1 1500ms infinite ease;
        }
        .btn:hover span:nth-child(2) {
                    animation: move2 1500ms infinite ease;
        }
        .btn:hover span:nth-child(3) {
                    animation: move3 1500ms infinite ease;
        }
        .btn:hover span:nth-child(4) {
                    animation: move4 1500ms infinite ease;
        }
        @keyframes move1 {
                    0% { height: 100%; bottom: 0; }
                    54% { height: 0; bottom: 100%; }
                    55% { height: 0; bottom: 0; }
                    100% { height: 100%; bottom: 0; }
        }
        @keyframes move2 {
                    0% { width: 0; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0; left: 100%; }
        }
        @keyframes move3 {
                    0% { height: 100%; top: 0; }
                    54% { height: 0; top: 100%; }
                    55% { height: 0; top: 0; }
                    100% { height: 100%; top: 0; }
        }
        @keyframes move4 {
                    0% { width: 0; right: 0; }
                    55% { width: 100%; right: 0; }
                    100% { width: 0; right: 100%; }
        }
</style>