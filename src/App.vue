<script setup lang="ts">
import {
    SimpleTabSwitch,
    SimpleTab,
    useSimpleTabsStore,
    SimpleTabStore,
    FilterOption,
} from './';
const tabStore: SimpleTabStore = useSimpleTabsStore();

tabStore.switchTab('TabGroup1', 'Tab2');

tabStore.filterTabs('TabGroup1', 'Book', FilterOption.StartsWith);
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
    <SimpleTab
        tab-group="TabGroup2"
        tab-name="Tab2-6"
        :tab-open-classes="['openTab']"
    >
        Content Tab2-6
    </SimpleTab>
    <SimpleTab
        :custom-classes="['Test']"
        tab-group="TabGroup2"
        :tab-name="['Tab2-4', 'Tab2-2']"
    >
        Open in Group 2 on Tab 4 and 2
    </SimpleTab>
</template>

<style>
.Test {
    background-color: aquamarine;
}

.openTab {
    border-width: 2px;
    border-style: dotted;
}
</style>
