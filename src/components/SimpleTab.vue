<template>
    <div class="simpleT-tab" v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSimpleTabsStore } from '@/composable/tabStore';

const props = defineProps<{
    tabGroup: string;
    tabName: string | string[];
}>();

const tabStore = useSimpleTabsStore();

let tabs: Array<string>;

console.log('is entry');
if (props.tabName instanceof Array) {
    console.log('is array');
    tabStore.registerTab(props.tabGroup, props.tabName);
    tabs = props.tabName;
} else if (typeof props.tabName === 'string') {
    console.log('is string');
    tabStore.registerTab(props.tabGroup, [<string>props.tabName]);
    tabs = [<string>props.tabName];
}

const isVisible = computed(() => {
    const selectedTab = tabStore.getOpenTab(props.tabGroup);
    if (selectedTab !== undefined) {
        const tabSelected = selectedTab.some((val) => {
            return tabs.find((tab) => tab === val);
        });
        return tabSelected;
    }
    return false;
});
</script>
