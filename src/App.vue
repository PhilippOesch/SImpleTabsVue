<script setup lang="ts">
import {
    SimpleTabSwitch,
    SimpleTab,
    useTabStore,
    TabStoreState,
} from './SimpleTabsPlugin';
const tabStore: TabStoreState = useTabStore();

tabStore.switchTab('TabGroup1', 'Tab2');

tabStore.filterTabs('TabGroup1', 'Book', 'StartsWith');
</script>

<template>
    <SimpleTabSwitch group-name="TabGroup1"></SimpleTabSwitch>
    <SimpleTab tab-group="TabGroup1" tab-name="Tab1-1">
        Content Tab1-1
    </SimpleTab>
    <SimpleTab tab-group="TabGroup1" tab-name="Tab1-2">
        Content Tab1-2
    </SimpleTab>
    <SimpleTabSwitch
        group-name="TabGroup2"
        default-tab="Tab2-3"
    ></SimpleTabSwitch>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-1">
        Content Tab2-1
    </SimpleTab>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-2">
        Content Tab2-2
    </SimpleTab>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-3">
        Content Tab2-3
    </SimpleTab>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-4">
        Content Tab2-4
    </SimpleTab>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-5">
        Content Tab2-5
    </SimpleTab>
    <SimpleTab tab-group="TabGroup2" tab-name="Tab2-6">
        Content Tab2-6
    </SimpleTab>
</template>

<style></style>
