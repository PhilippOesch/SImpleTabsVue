<template>
    <div :class="getClasses" v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSimpleTabsStore } from '@/composable/tabStore';

interface TabProps {
    /**
     * The tab group, this tab belongs to.
     */
    tabGroup: string;
    /**
     * The Tab Identifier/s.
     */
    tabName: string | string[];
    /**
     * Custom CSS classes.
     */
    customClasses?: string[];
}

const props = defineProps<TabProps>();

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

const getClasses = computed(() => {
    const array = ['simpleT-tab'];
    if (props.customClasses !== undefined) {
        array.push(...props.customClasses);
    }
    return array.join(' ');
});
</script>
