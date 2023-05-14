import type SimpleTab from './components/SimpleTab.vue';
import type SimpleTabSwitch from './components/SimpleTabSwitch.vue';
import type {
    SimpleTabStore,
    SwitchEvent,
    SwitchState,
    TabGroup,
} from './composable/tabStore';

export type { SimpleTabStore, SwitchEvent, SwitchState, TabGroup };

declare module 'vue' {
    interface GlobalComponents {
        SimpleTab: typeof SimpleTab;
        SimpleTabSwitch: typeof SimpleTabSwitch;
    }
}
