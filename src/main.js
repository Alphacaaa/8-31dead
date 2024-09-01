import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "echarts";
// import ECharts from 'vue-echarts';
// // import { use } from 'echarts/core';
// // import { ECharts } from 'vue-echarts';


// import * as echarts from 'echarts/core';
// import { CanvasRenderer } from 'echarts/renderers';
// import { BarChart } from 'echarts/charts';
// import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';

// // import ECharts from 'vue-echarts';


// echarts.use([
//     CanvasRenderer,
//     BarChart,
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
//     GridComponent
// ]);

const app = createApp(App)

// app.component('v-chart', ECharts);

app.use(createPinia())
app.use(router)

app.mount('#app')
