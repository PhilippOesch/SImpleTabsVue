import { useTabStore, TabStoreState } from './composable/tabStore';
import { FilterOption } from './utils/Filters';
import SimpleTab from './components/SimpleTab.vue';
import SimpleTabSwitch from './components/SimpleTabSwitch.vue';

import type { App } from 'vue';

const SimpleTabsPlugin = {
    install: (app: App): any => {
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
    FilterOption,
};
