import SimpleTabSwitch from './components/SimpleTabSwitch.vue';
import SimpleTab from './components/SimpleTab.vue';

const tabPluginVue = {
    install(app: any) {
        app.component('SimpleTabSwitch', SimpleTabSwitch);
        app.component('SimpleTab', SimpleTab);
    },
};

export default tabPluginVue;
