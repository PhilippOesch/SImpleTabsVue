import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import tabPluginVue from './TabPluginVue';

const app = createApp(App);

app.use(tabPluginVue);
app.mount('#app');
