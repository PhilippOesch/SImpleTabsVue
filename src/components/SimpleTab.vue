<template>
    <div class="simpleT-tab" v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTabStore } from '../composable/tabStore';

const props = defineProps<{
    tabGroup: string;
    tabName: string;
}>();

const tabStore = useTabStore();
tabStore.registerTab(props.tabGroup, props.tabName);

const isVisible = computed(() => {
    const selectedTab = tabStore.getOpenTab(props.tabGroup);
    if (selectedTab !== undefined && selectedTab === props.tabName) {
        return true;
    }
    return false;
});
</script>

<style scoped></style>
