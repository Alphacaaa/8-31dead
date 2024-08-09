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
                <button class="retro-button redButton"><img src="/public/home.png" width="25px" height="25px"></button>
            </RouterLink>
        </div>
        <div class="build">
            <RouterLink  to="/CreateQmanage">
                <button class="retro-button greenButton"><img src="/public/diary.png" width="25px" height="25px"></button>
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

:root{
    --button-height: 3rem;
    --color-text: rgba(0, 0, 0, 0.25);
    --color-text-shadow: rgb(29, 28, 28);
    --color-page-bg:#B9B5AA;
    --color-bg:#899095;
    --color-bg-light:#969DA3;
    --color-bg-dark: #7D878F;
    --color-overlay-light: rgba(255,255,255,.2);
    --color-overlay-medium: rgba(0,0,0,.1);
    --color-overlay-dark: rgba(0,0,0,.2);
    --color-tab-focus: rgba(255,255,255,.15);
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
            margin-left: 10%;
            // width: 20%;

        }
        
        .build{
            display: flex;
            // width:89% ;
            // margin-left: 60%;
            height: 100%;
            justify-content: end;
            align-items: center;
        }
    }
.redButton{
    --color-bg:#E44E55;
    --color-bg-light:#E47479;
    --color-bg-dark:#D13239;
}
.greenButton{
    // color: white;
    --color-bg:#00A07D;
    --color-bg-light:#00AF8A;
    --color-bg-dark:#008F70;
}
    .retro-button{
    position:relative;
    appearance:none;
    box-sizing:border-box;
    font-size:calc( var(--button-height) / 3 );
    font-family: 'Open Sans', sans-serif;
    background: var(--color-bg);
    height:var(--button-height);
    min-width:50px;
    width: 50px;
    border-radius:calc( var(--button-height) / 2);
    border:0;
    font-weight:800;
    text-transform:uppercase;
    color:var(--color-text);
    text-shadow: 1px 1px var(--color-text-shadow);
    cursor:pointer;
    margin:6px 6px;
    letter-spacing:.1em;
    transition: all 200ms ease;
    box-shadow:
        -1px  -1px 1px var(--color-bg), 
        0 0 0 4px var(--color-overlay-medium), 
        1px  1px 1px var(--color-bg-dark), 
        inset .0 .0 .0 var(--color-overlay-dark),  
        inset .5rem .5rem .25rem var(--color-bg-light) 
}

.retro-button::-moz-focus-inner{
    outline:none;
    border:none;
}

.retro-button:focus{
    outline:none;
    box-shadow:
    -1px -1px 1px var(--color-bg-dark),
    0 0 0 4px var(--color-tab-focus), 
    1px  1px 1px var(--color-bg-dark),
    inset 0 0 0 var(--color-overlay-dark), 
    inset .5rem .5rem .25rem var(--color-bg-light), 
    ;
}

.retro-button:hover{
    box-shadow:
        -1px -1px 1px var(--color-bg-dark), 
        0 0 0 4px var(--color-overlay-dark), 
        1px  1px 1px var(--color-bg-dark), 
        inset 0 0 0 var(--color-overlay-dark), 
        inset .5rem .5rem .25rem var(--color-bg-light), 
        ;
    }

.retro-button:active{
    box-shadow:
        inset 1px 1px 1px var(--color-bg),  
        0 0 0 4px var(--color-overlay-dark), 
        inset -1px -1px 1px var(--color-bg-light),   
        inset .5rem .5rem .75rem var(--color-bg-dark), 
        inset .5rem .5rem .5rem var(--color-bg-light), 
}
</style>