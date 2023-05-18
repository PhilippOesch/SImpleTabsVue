import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// import { SimpleTabsPlugin } from './SimpleTabsPlugin';
import 'simple-tabs-vue/style.css';
import { SimpleTabsPlugin } from 'simple-tabs-vue';
const app = createApp(App);

app.use(SimpleTabsPlugin);
app.mount('#app');
