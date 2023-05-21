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
import { useTabStore, SwitchEvent } from '@/composable/tabStore';

const props = defineProps<{
    groupName: string;
    defaultTab?: string;
    onBeforeSwitch?: (switchEvent?: SwitchEvent) => boolean;
}>();

const tabStore = useTabStore();
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
        isOpen ? 'simpleT-tabOpened' : 'simpleT-tabClosed',
    ];
}

const openTab = computed(() => {
    return tabStore.getOpenTab(props.groupName);
});

const emits = defineEmits(['beforeSwitchTab', 'afterSwitchTab']);

function onSwitchTab(groupName: string, tabName: string) {
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
            state: 'After',
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
