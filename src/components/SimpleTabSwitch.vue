<template>
    <div
        class="simpleT-tabSwitcher"
        v-if="tabs.dataSet"
        :key="tabs.reactiveKey"
    >
        <template v-for="(item, index) in tabs.dataSet">
            <div
                :class="getClasses(item, index)"
                @click="() => onSwitchTab(groupName, item)"
            >
                {{ item }}
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    useSimpleTabsStore,
    SwitchEvent,
    SwitchState,
} from '@/composable/tabStore';

interface SimpleTabSwitchProps {
    /**
     * Group Name to register.
     */
    groupName: string;
    /**
     * Custom classes to add to a button when the tab is open.
     */
    customBtnOpenClasses?: string[];
    /**
     * custom classes to add to a switch button.
     */
    customBtnClasses?: string[];
    /**
     * name of the tab to open as default.
     */
    defaultTab?: string;
    /**
     * Callback before a switch happens.
     * @param switchEvent the switch event that took place.
     * @returns whether to continue the switch event.
     */
    onBeforeSwitch?: (switchEvent?: SwitchEvent) => boolean;
}

const props = defineProps<SimpleTabSwitchProps>();

const tabStore = useSimpleTabsStore();
tabStore.registerTabGroup(props.groupName);
const tabs = tabStore.getGroupTabs(props.groupName);

if (props.defaultTab) {
    tabStore.setDefaultOpenTab(props.groupName, props.defaultTab);
}

function getClasses(item: any, index: number): string[] {
    const isTabOpen = openTab.value?.some((val) => val === item);
    const isOpen = isTabOpen || (openTab.value?.length === 0 && index === 0);
    return [
        'simpleT-tabSwitchBtn',
        getCustomBtnClasses(),
        isOpen ? getBtnOpenClasses() : 'simpleT-tabClosed',
    ];
}

function getCustomBtnClasses(): string {
    if (props.customBtnClasses !== undefined) {
        return props.customBtnClasses.join(' ');
    }
    return '';
}

function getBtnOpenClasses(): string {
    if (props.customBtnOpenClasses) {
        return ['simpleT-tabOpened', ...props.customBtnOpenClasses].join(' ');
    }
    return 'simpleT-tabOpened';
}

const openTab = computed(() => {
    return tabStore.getOpenTab(props.groupName);
});

const emits = defineEmits(['beforeSwitchTab', 'afterSwitchTab']);

/**
 * Initiating a tab switch.
 * @param groupName The group name to switch the tab on.
 * @param tabName The tab to switch to
 */
function onSwitchTab(groupName: string, tabName: string): void {
    const prevSwitchEvent = tabStore.previewSwitch(groupName, tabName);

    if (prevSwitchEvent !== undefined) {
        emits('beforeSwitchTab', prevSwitchEvent);
        let shouldResume: boolean = true;
        if (props.onBeforeSwitch !== undefined) {
            shouldResume = <boolean>props.onBeforeSwitch(prevSwitchEvent);
        }

        let afterEvent: SwitchEvent = {
            prevTab: prevSwitchEvent.prevTab,
            newTab: prevSwitchEvent.newTab,
            state: SwitchState.After,
        };
        if (shouldResume) {
            tabStore.switchTab(groupName, tabName, false);
            afterEvent.isSuccessful = true;
            emits('afterSwitchTab', afterEvent);
        } else {
            afterEvent.isSuccessful = false;
            emits('afterSwitchTab', afterEvent);
        }
    }
}
</script>

<style>
.simpleT-tabOpened {
    color: blue;
}
.simpleT-tabClosed {
    color: gray;
}
.simpleT-tabSwitchBtn {
    cursor: pointer;
}
</style>
