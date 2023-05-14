import { App } from 'vue';
import SimpleTabSwitch from './components/SimpleTabSwitch.vue';
import SimpleTab from './components/SimpleTab.vue';

const tabPluginVue = {
    install(app: App<Element>) {
        app.component('SimpleTabSwitch', SimpleTabSwitch);
        app.component('SimpleTab', SimpleTab);
    },
};

export default tabPluginVue;
