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
    tabName: string;
}>();

const tabStore = useSimpleTabsStore();
tabStore.registerTab(props.tabGroup, props.tabName);

const isVisible = computed(() => {
    const selectedTab = tabStore.getOpenTab(props.tabGroup);
    if (selectedTab !== undefined) {
        const tabSelected = selectedTab.some((val) => val === props.tabName);
        return tabSelected;
    }
    return false;
});
</script>
