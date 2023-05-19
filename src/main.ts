import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { SimpleTabsPlugin } from '.';
const app = createApp(App);

app.use(SimpleTabsPlugin);
app.mount('#app');
