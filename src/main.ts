import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { SimpleTabsPlugin } from './SimpleTabsPlugin';
import 'simple-tabs-vue/styles.css';

const app = createApp(App);

app.use(SimpleTabsPlugin);
app.mount('#app');
