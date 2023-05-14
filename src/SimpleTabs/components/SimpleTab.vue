<template>
    <div class="tabContainer" v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTabStore } from '../composable/tabStore';

const props = defineProps({
    tabGroup: {
        type: String,
        required: true,
    },
    tabName: {
        type: String,
        required: true,
    },
});

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
