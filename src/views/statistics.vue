<script>
// import axios from 'axios';
// import { ref, onMounted } from 'vue';
    // data() {
    //     return {
    //         questionnaires:[],
    //         questionnairesName: '',
    //         chartOptions: {
    //             title: {
    //             text: 'ECharts'
    //             },
    //             tooltip: {},
    //             legend: {
    //             data: ['销售量']
    //             },
    //             xAxis: {
    //             type: 'category',
    //             data: [4124]  // 图表的 x 轴数据
    //             },
    //             yAxis: {},
    //             series: [{
    //             name: '销售量',
    //             type: 'bar',
    //             data: [12421]  // 图表的数据
    //             }]
    //         }
            
    //     }
    // },
    // components:{
    //     Echarts
    // },
    // created(){
    //     const id = parseInt(this.$route.params.id, 10)
    //     console.log(id)
    //     console.log(typeof id)
    //     axios.post('http://localhost:8080/quiz/statistics', null, {
    //         params: {
    //             quizId: id
    //         }
    //     })
    //     .then(response => {
    //         console.log('Received data:', response.data);
    //         this.questionnaires = response.data.statisticsList || [];
    //         this.questionnairesName = response.data.quizName
    //         console.log(this.questionnaires);
    //         console.log(this.questionnairesNames);
    //         sessionStorage.setItem('dataQuestionnaires', JSON.stringify(this.questionnaires));
    //         const xAxisData = this.questionnaires.map(question => question.qu);
    //         const seriesData = this.questionnaires.map(question => {
    //             // 假设 optionCountMap 存在且是对象
    //             const optionCounts = Object.values(question.optionCountMap);
    //             return optionCounts.reduce((a, b) => a + b, 0);  // 累加所有选项的数量
    //         });

    //         this.chartOptions.xAxis.data = xAxisData;
    //         this.chartOptions.series[0].data = seriesData;
    //         console.log(this.chartOptions.series[0].data)
    //     })
        
    //     .catch(error => {
    //         this.error = 'Error: ' + error.message;
    //     });
    // }
    // }
import axios from 'axios';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
export default {
    data() {
        return {
        questionnaires: [],
        questionnairesName: '',
//         chartOptions: {
//         title: {
//             text: `題目 ${this.question.quId}`,
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center'
//         },
//         series: [
//             {
//                 name: `題目 ${question.quId}`,
//                 type: 'pie',
//                 radius: '50%',
//                 data: seriesData,
//             }
//         ]
//     }
    };
},
    mounted() {
        // console.log("xxxx"+this.questionnaires)
        this.$nextTick(() => {
            this.initCharts();
            });
    },
    methods: {
        initCharts() {
        this.questionnaires.forEach((question, index) => {
        const refName = 'chartContainer' + index;
        const chartContainer = this.$refs[refName];
        console.log("con"+this.chartContainer)
        if (chartContainer && chartContainer.length > 0) {
            const container = chartContainer[0];
            const chart = echarts.init(container);
            const seriesData = Object.entries(question.optionCountMap).map(([optionName, count]) => ({
            name: optionName,
            value: count,
            }));

            const chartOptions = {
            title: {
                text: ` ${question.qu}`,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 'bottom',
                left: 'center',
            },
            series: [
                {
                name: ` ${question.qu}`,
                type: 'pie',
                radius: '50%',
                data: seriesData,
                },
            ],
            };

            chart.setOption(chartOptions);
        } else {
            console.warn(`Chart container for index ${index} not found or is empty`);
        }
        });
    },
    back(){
        this.$router.push('/CreateQmanage')
    }
},
    created() {
        const id = parseInt(this.$route.params.id, 10);
        console.log(id)
        axios.post('http://localhost:8080/quiz/statistics', null, {
        params: { quizId: id }
        })
        .then(response => {
        this.questionnaires = response.data.statisticsList || [];
        this.questionnairesName = response.data.quizName;
        console.log(this.questionnaires);
        console.log(this.questionnairesName);
        // const xAxisData = this.questionnaires.map(question => question.qu);
        // const seriesData = [];
        // this.questionnaires.forEach(question => {
        //     Object.entries(question.optionCountMap).forEach(([optionName, count]) => {
        //     if (count > 0) {
        //         seriesData.push({
        //         name: optionName, 
        //         value: count  
        //         });
        //     }
        //     });
        // });

        console.log(this.questionnaires);
        // this.chartOptions.title.text = this.questionnairesName;
        // this.chartOptions.series[0].name = this.questionnairesName;
        // this.chartOptions.series[0].data = seriesData;
        // Re-initialize chart with updated options
        this.$nextTick(() => {
            this.initCharts();
        });
        })
        .catch(error => {
        console.error('Error:', error.message);
        });
    },
    
};
</script>

<template>
<div class="main">

        
    <div v-if="this.questionnairesName" class="quizTitle">
        <p>{{ this.questionnairesName }}</p>
    </div>
    <div class="buttonContainer">
        <button @click="back()" class="pixelButton">HOME</button>
    </div>
    <div v-if="this.questionnaires" class="quizQuestion">
        <div class="canvasDiv" v-for="(question,index) in this.questionnaires" :key="question.quId">
            <div class="questionDiv">
                <p>{{question.quId}}、{{question.qu}}</p>
                <!-- <p>題目:{{question.qu}}</p> -->
                <!-- <p>{{ question.optionCountMap }}</p> -->
                <div class="option" v-for="(option,question) in question.optionCountMap" :key="key">
                    <div class="optionName">
                        <span>{{ question }}:</span>
                    </div>
                    <div class="optionCount">
                        <span>{{ option }}次</span>
                    </div>
                </div>
            </div>
            <div :ref="'chartContainer' + index" style="height: 400px; width: 500px;"></div>
        </div>
        <!-- <v-chart :options="chartOptions" style="height: 400px; width: 100%;">122131231231233</v-chart> -->
    </div>
</div>
</template>

<style scoped lang="scss">
.v-chart {
  height: 400px;
  width:50%;
}

div{
    background-color:var(--color-page-bg);
}
body{
    min-height: 100vh;
    overflow: auto;
}
.main{
    min-height: 100vh;
    overflow: auto;
    position: relative;
}
.quizTitle{
    margin: auto;
    margin-bottom: 100px;
    width: 30vw;
    text-align: center;
    p{
        font-size: 36px;
    }

}
.quizQuestion{
    margin: auto;
    width: 40vw;
}
.canvasDiv{
    display:flex ;
    width: 80vw;
    margin: 100px auto;
    .questionDiv{
        width: 40vw;
        .option{
            display:flex ;
            .optionName{
                width: 60%;
            }
        }
        span{
            width: 80%;
            font-size: 24px;
        }
    }
    /* .canvas{
        width: 20vw;
    } */
}
.buttonContainer {
            position: absolute;
            /* right: 10%; */
            top:1%;
            left: 1%;
            width: 225px;
            height: 70px;
            display: inline-block;
            font-family: 'Press Start 2P', cursive; 
            display: flex;
            justify-content: center;
            background-color: #969DA3;
            border-radius: 5px;
            box-shadow: 0 10px 0px #666668;
            align-items: center;
            padding-bottom: 5px;
            .pixelButton{
                background-color: #FF8800;
                width: 200px;
                height: 50px;
                border-radius: 5px;
                border: none;
                box-shadow: 0 10px 0px rgb(151, 83, 9);
                transition: all 0.3s ease; 
                color: white;
                &:hover{
                    box-shadow:  0 5px 0px rgba(0, 0, 0, 0.4); 
                    transform: translateY(4px); 
                }
                &:active{
                    background-color: #e67e22; 
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4); 
                    transform: translateY(5px); 
                }
            }

            }
</style>