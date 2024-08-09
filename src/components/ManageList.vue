<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import { useColorStore } from '../stores/counter'

// const colorStore = useColorStore()
export default{
data() {
    return {
        colors : ['red', 'green', 'blue', 'yellow'],
        buttonColors: [],
        users: [
        { id: 1, name: '好きな食べ物の調査', age:  ''},
        { id: 2, name: '香菜は美味しいですか？', age:  ''},
        { id: 3, name: 'お風呂で優先する部位の調査', age:  ''},
        { id: 4, name: '日本で最も美しい観光地はどこですか', age:  ''},
        { id: 5, name: '', age:  ''},
        { id: 6, name: '', age:  ''},
        { id: 7, name: '', age:  ''},
        { id: 8, name: '', age:  ''},
        { id: 9, name: '', age:  ''},
        { id: 10, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
        { id: 11, name: '', age:  ''},
    ],
        currentPage:1,
        tablePerPage:10,
        selectedDate: null,
        flatpickrOptions: {
        dateFormat: 'Y-m-d', // 設置日期格式
        minDate:'today'
        }
    }
    },
    computed:{
        currentPageCal(){
        const start =(this.currentPage - 1) * this.tablePerPage
        const end = start + this.tablePerPage
        return this.users.slice(start,end)
        },
        totalPages(){
        return Math.ceil(this.users.length / this.tablePerPage)
        },
        pagesArray() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
    },
    created() {
        this.initButtonColors();
    },
    methods:{
        pushPage(pageNumber){
            this.currentPage = pageNumber
        },
        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length);
            console.log(this.colors[randomIndex])
            return this.colors[randomIndex]
        },
        getButtonClass(index) {
            const color = this.buttonColors[index];
            console.log(`retro-button ${this.buttonColors[index]}-button`)
            return `retro-button ${this.buttonColors[index]}-button`
        },
        initButtonColors() {
            if (this.totalPages > 0) {
                this.buttonColors = Array.from({ length: this.totalPages }, () => this.getRandomColor());
            }
        },
    },
    components:{
        CreateQButton,
        Header,
        flatPickr
    }
}
</script>

<template>
<div class="tableContainer">
    <div class="list">
        <table >
            <thead>
                <tr>
                <th class="checkBoxTop">&nbsp&nbsp&nbsp&nbsp</th>
                <th >ID</th>
                <th>Name</th>
                <th class="status">Status</th>
                <th class="startTimeBox">Start</th>
                <th class="endTimeBox">End</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user,index) in currentPageCal" :key=user.id>
                <td class="checkBox"><input type="checkbox"></td>
                <td class="idBox">{{ user.id }}</td>
                <td class="name">{{ user.name }}</td>
                <td class="statusTd">{{ user.age }}</td>
                <td></td>
                <td class="tdEndTime"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="buttonDiv">
        <button v-for="(pageNumber,index) in totalPages" :key="pageNumber" @click="pushPage(pageNumber)" 
        class="retro-button blue-button"
        :class="getButtonClass(index)">
            {{ pageNumber   }}
        </button>
    </div>
</div>


</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    // border: 1px solid black;
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

.tableContainer{
    position: relative;
    width: 100%;
    height: 70%;
    .buttonDiv{
        width: 100%;
        position: absolute;
        bottom:-25%;
        display: flex;
        justify-content:center;
        align-items: center;
        // left: 50%;
        .blue-button, .red-button, .yellow-button, .green-button{
            width: 20px;
            --color-bg:#0066B4;
            --color-bg-light:#3981CA;
            --color-bg-dark:#004EAD;
            }
        .red-button{
            --color-bg:#E44E55;
            --color-bg-light:#E47479;
            --color-bg-dark:#D13239;
        }
        .green-button{
            --color-bg:#00A07D;
            --color-bg-light:#00AF8A;
            --color-bg-dark:#008F70;
        }
        .yellow-button{
            --color-bg:#FFC054;
            --color-bg-light:#FFD996;
            --color-bg-dark:#F2AA30;
        }
    }
}
.iconContainer{
    width: 100%;
}
.list{
    font-family: 'Press Start 2P', cursive;
    width: 100%;
    height: 85vh;
    margin:  auto;
    position: relative;
    table{  
        margin: auto;
        width: 90%;
        // height: 20%;
        th{
            background-color:var(--color-bg);
            color: white;
            text-align: center;
            height: 75px;
            border-right: 2px solid rgb(248, 248, 248);
            font-size: 36px;
            // width: 20%;
        }
        .checkBoxTop{
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        .status{
            font-size: 24px;
            padding: 20px;
        }
        .startTimeBox{
            padding: 20px;
            // border-right: none;
            font-size: 24px;
        }
        .endTimeBox{
            border-top-right-radius: 10px;
            // border-bottom-right-radius: 10px;
            padding: 20px;
            border-right: none;
            font-size: 24px;
        }
        td{
            height:50px;
            font-size: 24px;
            text-align: center;
            // color:var(--color-page-bg);
            // border: 1px solid rgb(0, 0, 0);
            border-bottom: 1px solid rgb(0, 0, 0);
            background-color: var(--color-overlay-light);
        }
        .name{
            width: 50%;
        }
        .checkBox{
            width: 30px;
            text-align: center;
            border:none;
        input{
            width: 50%;
            height: 40%;
            background-color:rgb(18, 80, 92);
        }
        }
        .idBox{
        text-align: center;
        width: 10%;
        &:hover{
            cursor: pointer;
        }
    }
    }
}
.retro-button{
    position:relative;
    appearance:none;
    box-sizing:border-box;
    font-size:calc( var(--button-height) / 3 );
    font-family: 'Open Sans', sans-serif;
    background: var(--color-bg);
    height:var(--button-height);
    min-width:var(--button-height);
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