import {createApp} from 'vue';
import App from './App.vue';
import router from './router';  // 引入路由配置
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000/api', // 后端 API 的基本 URL
  timeout: 1000,
});


// Vuetify
import {createVuetify} from 'vuetify';
import 'vuetify/styles'; // 使用默认的 Vuetify 样式
import {aliases, mdi} from 'vuetify/iconsets/mdi'; // 使用 Material Design 图标
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// Vuetify 实例
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});
const app = createApp(App);
app.config.globalProperties.$http = http;
app.use(router);  // 使用路由
app.use(vuetify)  // 使用 Vuetify
app.mount('#app');
