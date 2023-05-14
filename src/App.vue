<script setup lang="ts">
import TabSwitch from './SimpleTabs/components/SimpleTabSwitch.vue';
import Tab from './SimpleTabs/components/SimpleTab.vue';
</script>

<template>
    <TabSwitch group-name="TabGroup1"></TabSwitch>
    <Tab tab-group="TabGroup1" tab-name="Tab1-1"> Content Tab1-1 </Tab>
    <Tab tab-group="TabGroup1" tab-name="Tab1-2"> Content Tab1-2 </Tab>
    <TabSwitch group-name="TabGroup2" default-tab="Tab2-3"></TabSwitch>
    <Tab tab-group="TabGroup2" tab-name="Tab2-1"> Content Tab2-1 </Tab>
    <Tab tab-group="TabGroup2" tab-name="Tab2-2"> Content Tab2-2 </Tab>
    <Tab tab-group="TabGroup2" tab-name="Tab2-3"> Content Tab2-3 </Tab>
    <Tab tab-group="TabGroup2" tab-name="Tab2-4"> Content Tab2-4 </Tab>
    <Tab tab-group="TabGroup2" tab-name="Tab2-5"> Content Tab2-5 </Tab>
    <Tab tab-group="TabGroup2" tab-name="Tab2-6"> Content Tab2-6 </Tab>
</template>

<style></style>
