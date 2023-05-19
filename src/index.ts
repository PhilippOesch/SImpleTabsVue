import { useTabStore, TabStoreState } from './composable/tabStore';
import SimpleTab from './components/SimpleTab.vue';
import SimpleTabSwitch from './components/SimpleTabSwitch.vue';

import type { App } from 'vue';

const SimpleTabsPlugin = {
    install(app: App) {
        app.component('SimpleTabSwitch', SimpleTabSwitch);
        app.component('SimpleTab', SimpleTab);
    },
};

export {
    SimpleTabsPlugin,
    SimpleTab,
    SimpleTabSwitch,
    useTabStore,
    TabStoreState,
};
