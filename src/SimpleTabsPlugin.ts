import { useTabStore, SwitchEvent } from './composable/tabStore';
import { FilterOption, IFilter } from './utils/Filters';
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
    type SwitchEvent,
    FilterOption,
    type IFilter,
};
