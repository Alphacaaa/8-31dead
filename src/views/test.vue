<template>
    <div class="quizTitle">
      <p>{{ questionnairesName }}</p>
    </div>
    <div class="quizQuestion">
      <div v-for="(question, index) in questionnaires" :key="index">
        <p>题号: {{ question.quId }}</p>
        <p>题目: {{ question.qu }}</p>
        <div class="option" v-for="(option, optionName) in question.optionCountMap" :key="optionName">
          <p>{{ optionName }}: 出现 {{ option }} 次</p>
        </div>
      </div>
      <div ref="chartContainer" style="height: 400px; width: 100%;"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    data() {
      return {
        questionnaires: [],
        questionnairesName: '',
        chartOptions: {
        title: {
          text: this.questionnairesName,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          left: 'center'
        },
        series: [
          {
            name: this.questionnairesName,
            type: 'pie',
            radius: '50%',
            data: [5] // 图表的数据
          }
        ]
      }
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chartContainer);
        chart.setOption(this.chartOptions);
      }
    },
    created() {
      const id = parseInt(this.$route.params.id, 10);
      axios.post('http://localhost:8080/quiz/statistics', null, {
        params: { quizId: 40 }
      })
      .then(response => {
        this.questionnaires = response.data.statisticsList || [];
        this.questionnairesName = response.data.quizName;
  
        const xAxisData = this.questionnaires.map(question => question.qu);
        const seriesData = this.questionnaires.map(question => {
          const optionCounts = Object.values(question.optionCountMap);
          return optionCounts.reduce((a, b) => a + b, 0);
        });
  
        this.chartOptions.xAxis.data = xAxisData;
        this.chartOptions.series[0].data = seriesData;
  
        // Re-initialize chart with updated options
        this.$nextTick(() => {
          this.initChart();
        });
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    }
  };
  </script>
  
  <style>
  .v-chart {
    height: 400px;
    width: 100%;
  }
  </style>
  