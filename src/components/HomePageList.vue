<script>
import CreateQButton from '../components/CreateQButton.vue'
import Header from '../components/Header.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default{
data() {
    return {
        users: [
        { id: 1, name: '', age:  '',path:'前往'},
        { id: 2, name: '', age:  '',path:'前往'},
        { id: 3, name: '', age:  '',path:'前往'},
        { id: 4, name: '', age:  '',path:'前往'},
        { id: 5, name: '', age:  '',path:'前往'},
        { id: 6, name: '', age:  '',path:'前往'},
        { id: 7, name: '', age:  '',path:'前往'},
        { id: 8, name: '', age:  '',path:'前往'},
        { id: 9, name: '', age:  '',path:'前往'},
        { id: 10, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 11, name: '', age:  '',path:'前往'},
        // { id: 13, name: '', age:  '',path:'前往'},
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
        }
    },
    methods:{
        pushPage(pageNumber){
        this.currentPage = pageNumber
        }
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
                <th >編號</th>
                <th>名稱</th>
                <th>狀態</th>
                <th>開始時間</th>
                <th>結束時間</th>
                <th class="result"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user,index) in currentPageCal" :key=user.id>
                <td class="checkBox"><input type="checkbox"></td>
                <td class="idBox">{{ user.id }}</td>
                <td class="name">{{ user.name }}</td>
                <td>{{ user.age }}</td>
                <td></td>
                <td></td>
                <td class="pathBox">{{user.path}}</td>
                <!-- <td>
                <button @click="edit()">編輯</button>
                <button @click="edit()">刪除</button>
                </td> -->
            </tr>
            </tbody>
        </table>


        <!-- <div class="pageChage">
            <button v-for="pageNumber in totalPages" @click="pageChange()"> 
            {{ pageNumber }}
            </button>
        </div> -->


    </div>
    <div class="buttonDiv">
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="pushPage(pageNumber)">
            {{ pageNumber }}
        </button>
    </div>
</div>


</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    // border: 1px solid black;
}
.tableContainer{
    position: relative;
    width: 100%;
    height: 70%;
    .buttonDiv{
        width: 100%;
        position: absolute;
        bottom:-10%;
        display: flex;
        justify-content:center;
        align-items: center;
        // left: 50%;
        button{
            display: block;
            margin: 5px;
            background-color: #5D6C89;
            color: white;
            border: none;
            border-radius: 5px;
        }
    }
}
.list{
    width: 100%;
    height: 100%;
    margin:  auto;
    position: relative;
    table{  
        margin: auto;
        width: 80%;
        height: 10%;
        th{
        // width: 1px;
        background-color: #5D6C89;
        // background-color: rgb(18, 80, 92);
        color: white;
        text-align: center;
        border-right: 2px solid white;
        // border-left: 2px solid white;
        }
        .checkBoxTop{
        // width: 1%;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        }
        .result{
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        // border-right: 2px solid rgb(18, 80, 92);
        }
        td{
        height:50px;
        font-size: 24px;
        border: 1px solid rgb(255, 255, 255);
        // background-color: #FEB06A;
        background-color: rgb(220, 241, 245);

        
        }
        .name{
        width: 50%;
        }
        .checkBox{
        width: 30px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        text-align: center;
        input{
            width: 50%;
            height: 40%;
            background-color:rgb(18, 80, 92);
        }
        }
        .idBox, .pathBox{
        text-align: center;
        width: 5%;
        &:hover{
            cursor: pointer;
        }
    }
    }

}

</style>